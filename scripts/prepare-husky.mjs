import { open, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const gitDir = join(process.cwd(), '.git')
const lockPath = join(gitDir, 'config.lock')
const huskyBin = fileURLToPath(new URL('../node_modules/husky/bin.js', import.meta.url))

const skipableErrorCodes = new Set(['EACCES', 'EPERM', 'EROFS', 'EEXIST', 'ENOTDIR', 'ENOENT'])

async function canLockGitConfig () {
  try {
    const handle = await open(lockPath, 'wx')
    await handle.close()
    await unlink(lockPath)
    return true
  } catch (error) {
    if (error?.code && skipableErrorCodes.has(error.code)) {
      let reason = '.git/config is not writable'

      if (error.code === 'EEXIST') {
        reason = 'a stale config.lock file is present'
      } else if (error.code === 'ENOENT') {
        reason = 'the .git directory is missing'
      } else if (error.code === 'ENOTDIR') {
        reason = 'the .git path is not a directory'
      }

      console.warn(`[husky] Skipping hook install because ${reason} (${error.code}).`)
      return false
    }

    throw error
  }
}

const shouldInstall = await canLockGitConfig()

if (!shouldInstall) {
  process.exit(0)
}

const child = spawn(process.execPath, [huskyBin], { stdio: 'inherit' })

child.on('close', (code) => {
  process.exit(code ?? 0)
})

child.on('error', (error) => {
  console.error('[husky] Failed to run install script:', error)
  process.exit(1)
})
