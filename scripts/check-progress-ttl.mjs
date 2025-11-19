import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const recipesDir = join(rootDir, 'src/content/recipes')
const DEFAULT_TTL_HOURS = 24
const DURATION_REGEX = /(\d+(?:\.\d+)?)\s*(hours?|hour|hrs?|hr|h|minutes?|minute|mins?|min|m)\b/gi

const normalizeUnit = (unit) => {
  const trimmed = unit.trim().toLowerCase()
  if (trimmed.startsWith('h')) return 'h'
  return 'm'
}

const parseDurationHours = (value) => {
  if (!value || typeof value !== 'string') return null
  let minutes = 0
  for (const match of value.matchAll(DURATION_REGEX)) {
    const amount = Number(match[1])
    if (!Number.isFinite(amount)) continue
    const unit = normalizeUnit(match[2])
    const multiplier = unit === 'h' ? 60 : 1
    minutes += amount * multiplier
  }

  if (minutes === 0) return null
  return minutes / 60
}

const getRecipeFiles = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getRecipeFiles(fullPath))
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }
  return files
}

const deriveDurationHours = (data) => {
  const total = parseDurationHours(data.total)
  if (total) return total
  const prep = parseDurationHours(data.prep)
  const cook = parseDurationHours(data.cook)
  const combined = (prep ?? 0) + (cook ?? 0)
  return combined > 0 ? combined : null
}

const recipeFiles = await getRecipeFiles(recipesDir)
const warnings = []

for (const file of recipeFiles) {
  try {
    const source = await readFile(file, 'utf8')
    const { data } = matter(source)
    const ttlHoursRaw = Number(data.progressTtlHours ?? DEFAULT_TTL_HOURS)
    const ttlHours = Number.isFinite(ttlHoursRaw) && ttlHoursRaw > 0 ? ttlHoursRaw : DEFAULT_TTL_HOURS
    const recipeDurationHours = deriveDurationHours(data)

    if (recipeDurationHours && ttlHours < recipeDurationHours) {
      warnings.push({
        file: relative(rootDir, file),
        title: data.title ?? '(untitled recipe)',
        ttlHours,
        recipeDurationHours
      })
    }
  } catch (error) {
    console.warn(`[progress-ttl] Unable to evaluate ${file}: ${error.message}`)
  }
}

if (warnings.length > 0) {
  console.warn('\n[progress-ttl] The following recipes reset progress sooner than their displayed total time:')
  for (const warning of warnings) {
    const ttl = warning.ttlHours.toFixed(2).replace(/\.00$/, '')
    const duration = warning.recipeDurationHours.toFixed(2).replace(/\.00$/, '')
    console.warn(`  • ${warning.title} (${warning.file}): TTL ${ttl}h vs total ${duration}h`)
  }
  console.warn('[progress-ttl] Consider increasing `progressTtlHours` if this is unintended.\n')
}
