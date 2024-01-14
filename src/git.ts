import * as ezSpawn from "@jsdevtools/ez-spawn";

export async function getBranchName() {
  const { stdout: branchName } = await ezSpawn.async(
    `git rev-parse --abbrev-ref HEAD`
  );
  return branchName;
}

export async function gitCommit(message: string) {
  await ezSpawn.async("git", ["commit", "--dry-run", "-m", message]);
}
