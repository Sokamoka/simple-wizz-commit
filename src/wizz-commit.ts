import prompts from "prompts";
import * as ezSpawn from "@jsdevtools/ez-spawn";
import { consola } from "consola";
import type { WCommitOptions } from "./types/w-commit-options";
import { getInputs } from "./inputs";

export async function wizzCommit(arg: WCommitOptions | string = {}) {
  console.log({ arg });

  let { stdout: branchName } = await ezSpawn.async(
    `git rev-parse --abbrev-ref HEAD`
  );
  consola.info(`Current branch: ${branchName}`);
  
  const inputs = getInputs();
  const response = await prompts(inputs);
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
}
