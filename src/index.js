const prompts = require("prompts");
const ezSpawn = require("@jsdevtools/ez-spawn");
const { consola } = require("consola");

(async () => {
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
    `#${response.taskId} ${response.type}(${branchName}): ${response.message}`
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
})();
