import type { PromptObject } from 'prompts'
import type { InputParams } from './types/input-params'

export function getInputs(defaults: InputParams) {
  return [
    {
      type: 'text',
      name: 'taskId',
      message: 'Task Id',
      initial: defaults.taskId,
      validate: (text: string) => !/^\d+$/.test(text) ? 'The taskId can only contain numbers' : true,
      onRender(this: any, color: any) {
        this.rendered = color.cyan(this.rendered)
      },
    },
    {
      type: 'select',
      name: 'type',
      message: 'Feature or Fix',
      choices: [
        {
          title: 'feat',
          description: 'This commit is a new feature',
          value: 'feat',
        },
        {
          title: 'fix',
          description: 'This commit is an incident fix',
          value: 'fix',
        },
        {
          title: 'chore',
          description: 'This commit is a chore commit',
          value: 'chore',
        },
        {
          title: 'refactor',
          description: 'This commit is a refactor commit',
          value: 'refactor',
        },
        {
          title: 'test',
          description: 'This commit is a unit test commit',
          value: 'test',
        },
      ],
      initial: defaults.type,
    },
    {
      type: 'text',
      name: 'message',
      message: 'Commit message',
      initial: defaults.message,
    },
  ] as PromptObject[]
}
