export function getInputs() {
  return [
    {
      type: "number",
      name: "taskId",
      message: "Task Id",
      initial: 12345
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
      initial: "initial commit massage"
    },
  ];
}
