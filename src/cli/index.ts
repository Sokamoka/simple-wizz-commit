import { consola } from "consola";
import { parseArgs } from "./parse-args";
import { ExitCode } from "./exit-code";
import { version as packageVersion } from "../../package.json";
import { wizzCommit } from "../wizz-commit";
/**
 * The main entry point of the CLI
 */
export async function main(): Promise<void> {
  try {
    // Setup global error handlers
    process.on("uncaughtException", errorHandler);
    process.on("unhandledRejection", errorHandler);

    const { help, version, clear, options } = await parseArgs();
    if (help) {
      process.exit(ExitCode.Success);
    } else if (version) {
      // Show the version number and exit
      consola.info(packageVersion);
      process.exit(ExitCode.Success);
    } else if (clear) {
      consola.success("Clear stored data Success");
      process.exit(ExitCode.Success);
    } else {
      await wizzCommit(options);
    }
  } catch (error) {
    errorHandler(error as Error);
  }
}

function errorHandler(error: Error): void {
  let message = error.message || String(error);

  if (process.env.DEBUG || process.env.NODE_ENV === "development")
    message = error.stack || message;

  consola.error(message);
  process.exit(ExitCode.FatalError);
}
