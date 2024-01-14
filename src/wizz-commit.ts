import prompts from "prompts";
// import * as ezSpawn from "@jsdevtools/ez-spawn";
import { consola } from "consola";
import type { WCommitOptions } from "./types/w-commit-options";
import { getInputs } from "./inputs";
import { getBranchName, gitCommit } from "./git";

export async function wizzCommit(arg: WCommitOptions) {
  console.log({ arg });
  const branchName = await getBranchName();
  consola.info(`Current branch: ${branchName}`);

  if (arg.store) {
    // get stored data
  }

  const inputs = getInputs();
  const response = await prompts(inputs);

  const message = `#${response.taskId} ${response.type}(${branchName}): ${response.message}`;
  consola.box(`git commit -m "${message}"`);
  const confirm = await prompts({
    type: "toggle",
    name: "value",
    message: "Can you confirm?",
    initial: true,
    active: "yes",
    inactive: "no",
  });
  if (!confirm.value) process.exit(1);

  console.log(response);
  consola.start("Commit...");
  await gitCommit(message);
  if (arg.store) {
    // set stored data
  }
  consola.success("Commit finished!");
}
