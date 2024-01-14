import cac from "cac";
import { consola } from "consola";
import { version } from "../../package.json";
import { ExitCode } from "./exit-code";
import type { WCommitOptions } from "../types/w-commit-options";

/**
 * The parsed command-line arguments
 */
export interface ParsedArgs {
  help?: boolean;
  version?: boolean;
  clear?: boolean;
  options: WCommitOptions;
}

/**
 * Parses the command-line arguments
 */
export async function parseArgs(): Promise<ParsedArgs> {
  try {
    const cli = cac("wcommit");

    cli
      .version(version)
      .option("-c, --clear", `Clear all stored data`)
      .option("--no-store", `No store data`)
      .help();

    const result = cli.parse();
    const args = result.options;

    const parsedArgs: ParsedArgs = {
      help: args.help as boolean,
      version: args.version as boolean,
      clear: args.clear as boolean,
      options: {
        store: !args.noStore && args.store,
      },
    };

    return parsedArgs;
  } catch (error) {
    return errorHandler(error as Error);
  }
}

function errorHandler(error: Error): never {
  consola.error(error.message);
  return process.exit(ExitCode.InvalidArgument);
}
