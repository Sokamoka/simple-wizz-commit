import process from 'node:process'
import * as ezSpawn from '@jsdevtools/ez-spawn'
import { consola } from 'consola'
import { ExitCode } from './cli/exit-code'

export async function getBranchName() {
  const { stdout: branchName } = await ezSpawn.async(
    `git rev-parse --abbrev-ref HEAD`,
  )
  return branchName.trim()
}

export async function gitCommit(message: string) {
  await ezSpawn.async('git', ['commit', '-m', message])
}

export async function gitPush(branchName: string) {
  let args: string[] = []

  const isUpstreamLinked = await checkUpstream()
  if (!isUpstreamLinked)
    args = args.concat(['-u', 'origin', branchName])

  await ezSpawn.async('git', ['push', ...args])
}

export async function checkUpstream(): Promise<boolean> {
  try {
    await ezSpawn.async('git rev-parse --abbrev-ref --symbolic-full-name @{u}')
    return true
  }
  catch (error) {
    if (error?.message.includes('no upstream'))
      return false
    return errorHandler(error)
  }
}

function errorHandler(error: Error): never {
  consola.error(error.message)
  return process.exit(ExitCode.FatalError)
}
