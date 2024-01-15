import process from 'node:process'
import cac from 'cac'
import { consola } from 'consola'
import { version } from '../../package.json'
import type { WCommitOptions } from '../types/w-commit-options'
import { ExitCode } from './exit-code'

/**
 * The parsed command-line arguments
 */
export interface ParsedArgs {
  help?: boolean
  version?: boolean
  clear?: boolean
  options: WCommitOptions
}

/**
 * Parses the command-line arguments
 */
export async function parseArgs(): Promise<ParsedArgs> {
  try {
    const cli = cac('wcommit')

    cli
      .version(version)
      .option('-c, --clear', `Clear all stored params`)
      .option('-s, --store', `Store commit message params (default: true)`)
      .option('--no-store', `No store params`)
      .help()

    const result = cli.parse()
    const args = result.options

    const parsedArgs: ParsedArgs = {
      help: args.help as boolean,
      version: args.version as boolean,
      clear: args.clear as boolean,
      options: {
        store: !args.noStore && args.store,
      },
    }

    return parsedArgs
  }
  catch (error) {
    return errorHandler(error as Error)
  }
}

function errorHandler(error: Error): never {
  consola.error(error.message)
  return process.exit(ExitCode.InvalidArgument)
}
