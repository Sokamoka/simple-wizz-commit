import type { InputParams } from './types/input-params'

export function getInputs(defaults: InputParams) {
  return [
    {
      type: 'number',
      name: 'taskId',
      message: 'Task Id',
      initial: defaults.taskId,
    },
    {
      type: 'select',
      name: 'type',
      message: 'Feature or Fix',
      choices: [
        {
          title: 'feat',
          description: 'This option has a description',
          value: 'feat',
        },
        { title: 'fix', value: 'fix' },
      ],
      initial: defaults.type,
    },
    {
      type: 'text',
      name: 'message',
      message: 'Commit message',
      initial: defaults.message,
    },
  ]
}
