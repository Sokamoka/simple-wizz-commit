import prompts from "prompts";
import * as ezSpawn from "@jsdevtools/ez-spawn";
import { consola } from "consola";
import { parseArgs } from "./parse-args";
import { ExitCode } from "./exit-code";
import { version as packageVersion } from "../../package.json";
/**
 * The main entry point of the CLI
 */
export async function main(): Promise<void> {
  try {
    // Setup global error handlers
    process.on("uncaughtException", errorHandler);
    process.on("unhandledRejection", errorHandler);

    const { help, version } = await parseArgs();
    if (help) {
      process.exit(ExitCode.Success);
    } else if (version) {
      // Show the version number and exit
      consola.info(packageVersion);
      process.exit(ExitCode.Success);
    }

    const q = [
      {
        type: "number",
        name: "taskId",
        message: "Task Id",
      },
      {
        type: "select",
        name: "type",
        message: "Feature or Fix",
        choices: [
          {
            title: "feat",
            description: "This option has a description",
            value: "feat",
          },
          { title: "fix", value: "fix" },
        ],
        initial: 0,
      },
      {
        type: "text",
        name: "message",
        message: "Commit message",
      },
    ];

    let { stdout: branchName } = await ezSpawn.async(
      `git rev-parse --abbrev-ref HEAD`
    );
    consola.info(`Current branch: ${branchName}`);

    const response = await prompts(q);
    console.log(response);
    consola.box(
      `git commit -m "#${response.taskId} ${response.type}(${branchName}): ${response.message}"`
    );
    const final = await prompts({
      type: "toggle",
      name: "value",
      message: "Can you confirm?",
      initial: true,
      active: "yes",
      inactive: "no",
    });
    console.log(final);
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
