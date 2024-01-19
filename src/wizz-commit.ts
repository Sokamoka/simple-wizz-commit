import process from 'node:process'
import prompts from 'prompts'
import { defu } from 'defu'
import type { PromptObject } from 'prompts'
import { consola } from 'consola'
import type { WCommitOptions } from './types/w-commit-options'
import { getInputs } from './inputs'
import { getBranchName, gitCommit, gitPush } from './git'
import type { InputParams } from './types/input-params'
import { deleteStoredData, getStoredData, setStoredData } from './store'
import { InputParamsDefaults } from './config'
import { ExitCode } from './cli/exit-code'

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

  const message = `#${answers.taskId} ${answers.type}(${branchName}): ${answers.message}`
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
