import type { PromptObject } from 'prompts'
import type { InputParams } from './types/input-params'
import type { WCommitOptions } from './types/w-commit-options'
import process from 'node:process'
import { consola } from 'consola'
import { defu } from 'defu'
import prompts from 'prompts'
import { ExitCode } from './cli/exit-code'
import { InputParamsDefaults } from './config'
import { getBranchName, gitCommit, gitPush } from './git'
import { getInputs } from './inputs'
import { deleteStoredData, getStoredData, setStoredData } from './store'

export async function wizzCommit(arg: WCommitOptions) {
  const branchName = await getBranchName()

  console.clear()
  consola.info(`Current branch: ${branchName}`)

  if (arg.clear) {
    deleteStoredData(branchName)
    consola.success('Delete stored data successfully')
  }

  let inputParams = InputParamsDefaults

  if (arg.store) {
    const storedData = getStoredData(branchName)
    inputParams = defu(storedData, inputParams) as InputParams
  }

  const inputs = getInputs(inputParams) as PromptObject[]
  const answers = await prompts(inputs)

  const message = `${answers.type}: (${branchName})(ab#${answers.taskId}): ${answers.message}`
  consola.box(`git commit -m "${message}"`)

  const confirm = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Can you confirm?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  })
  if (!confirm.value)
    process.exit(ExitCode.FatalError)

  const confirmPush = await prompts({
    type: 'toggle',
    name: 'value',
    message: 'Do you want to git push?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  })

  if (arg.store) {
    setStoredData(branchName, {
      ...answers,
      type: answers.type === 'fix' ? 1 : 0,
    } as InputParams)
  }

  consola.start('Commit...')
  await gitCommit(message)
  consola.success('Commit finished!')

  if (confirmPush.value) {
    consola.start('Push...')
    await gitPush(branchName)
    consola.success('Push finished!')
  }
}
