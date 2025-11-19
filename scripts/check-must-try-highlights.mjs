import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'

const restaurantsDir = new URL('../src/content/restaurants/', import.meta.url)
const threshold = 3

const stopWords = new Set([
  'with',
  'and',
  'or',
  'the',
  'a',
  'an',
  'plus',
  'amp',
  'of',
  'for',
  'on',
  'in',
  'served',
  'sauce',
  'sauces',
  'sided',
  'combo'
])

const normalizeText = (value = '') =>
  value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const getDishKey = (dish = '') => {
  const withoutParentheses = dish.replace(/\(.*?\)/g, ' ')
  return normalizeText(withoutParentheses)
}

const getMeaningfulTokens = (dishKey) => {
  const tokens = dishKey.split(' ').filter(Boolean)
  let filtered = tokens.filter((token) => {
    if (stopWords.has(token)) return false
    if (/\d/.test(token)) return true
    return token.length > 3
  })

  if (!filtered.length) {
    filtered = tokens
  }

  return filtered
}

const normalizeBlock = (block = '') =>
  block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .join(' ')

const getBlocks = (markdown) => {
  const segments = markdown.replace(/\r\n/g, '\n').split(/\n\s*\n/)
  const blocks = []

  for (const segment of segments) {
    const trimmed = segment.trim()
    if (!trimmed) continue

    const lines = trimmed.split('\n').map((line) => line.trim()).filter(Boolean)
    if (!lines.length) continue

    const bulletLines = lines.filter((line) => line.startsWith('- '))

    if (bulletLines.length === lines.length) {
      bulletLines.forEach((line) => {
        blocks.push(normalizeBlock(line.replace(/^-\s+/, '')))
      })
    } else {
      blocks.push(normalizeBlock(trimmed))
    }
  }

  return blocks
}

const matchesDish = (dish, block) => {
  if (!dish || !block) return false

  const dishKey = getDishKey(dish)
  const meaningfulTokens = getMeaningfulTokens(dishKey)
  const normalizedBlock = normalizeText(block)

  const hasFullMatch = dishKey && normalizedBlock.includes(dishKey)
  if (hasFullMatch) return true

  if (!meaningfulTokens.length) return false

  const requiredTokens =
    meaningfulTokens.length <= 1
      ? meaningfulTokens.length
      : Math.min(meaningfulTokens.length, Math.max(2, Math.ceil(meaningfulTokens.length / 2)))

  const matchedTokens = meaningfulTokens.filter((token) => normalizedBlock.includes(token)).length
  return matchedTokens >= requiredTokens
}

const files = await readdir(restaurantsDir, { withFileTypes: true })
const markdownFiles = files.filter((entry) => entry.isFile() && entry.name.endsWith('.md'))

const warnings = []

for (const file of markdownFiles) {
  const fileUrl = new URL(file.name, restaurantsDir)
  const fullPath = fileURLToPath(fileUrl)
  const raw = await readFile(fullPath, 'utf8')
  const { data, content } = matter(raw)

  const dishes = Array.isArray(data.mustTry) ? data.mustTry : []
  if (!dishes.length) continue

  const blocks = getBlocks(content)
  if (!blocks.length) continue

  for (const dish of dishes) {
    const matches = blocks.filter((block) => matchesDish(dish, block))
    if (matches.length > threshold) {
      warnings.push({
        file: file.name,
        dish,
        count: matches.length
      })
    }
  }
}

if (warnings.length) {
  console.warn('\n[warn] Must-try highlight density\n')
  for (const warning of warnings) {
    console.warn(
      ` - ${warning.file}: "${warning.dish}" would highlight ${warning.count} blocks (limit ${threshold}).`
    )
  }
  console.warn('\nConsider refining dish names or stop-words if these feel noisy.\n')
}

process.exit(0)
