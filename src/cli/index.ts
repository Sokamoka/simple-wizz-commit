import process from 'node:process'
import { consola } from 'consola'
import prompts from 'prompts'
import { version as packageVersion } from '../../package.json'
import { clearStoredData } from '../store'
import { wizzCommit } from '../wizz-commit'
import { ExitCode } from './exit-code'
import { parseArgs } from './parse-args'

/**
 * The main entry point of the CLI
 */
export async function main(): Promise<void> {
  try {
    // Setup global error handlers
    process.on('uncaughtException', errorHandler)
    process.on('unhandledRejection', errorHandler)

    const { help, version, clearAll, options } = await parseArgs()
    if (help) {
      process.exit(ExitCode.Success)
    }
    else if (version) {
      // Show the version number and exit
      consola.info(packageVersion)
      process.exit(ExitCode.Success)
    }
    else if (clearAll) {
      if (!await prompts({
        name: 'yes',
        type: 'confirm',
        message: 'Are you sure?',
        initial: true,
      }).then(r => r.yes)) {
        process.exit(1)
      }

      clearStoredData()

      consola.success('All stored commit parameters for all branches have been successfully deleted')
      process.exit(ExitCode.Success)
    }
    else {
      await wizzCommit(options)
    }
  }
  catch (error) {
    errorHandler(error as Error)
  }
}

function errorHandler(error: Error): void {
  let message = error.message || String(error)

  if (process.env.DEBUG || process.env.NODE_ENV === 'development')
    message = error.stack || message

  consola.error(message)
  process.exit(ExitCode.FatalError)
}
