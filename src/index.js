const prompts = require("prompts");
const ezSpawn = require("@jsdevtools/ez-spawn");

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

  let process = await ezSpawn.async(`git rev-parse --abbrev-ref HEAD`);
  console.log(process.stdout);

  const response = await prompts(q);
  console.log(response);
  console.log(
    `#${response.taskId} ${response.type}(branch): ${response.message}`
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
