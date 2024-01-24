import Conf from 'conf'
import { name } from '../package.json'
import type { InputParams } from './types/input-params'

const store = new Conf({ projectName: name })

export function setStoredData(key: string, params: InputParams) {
  store.set(getKey(name, key), params)
}

export function getStoredData(key: string) {
  return store.get(getKey(name, key))
}

export function deleteStoredData(key: string) {
  store.delete(getKey(name, key))
}

export function clearStoredData() {
  store.clear()
}

function getKey(projectName: string, key: string): string {
  return [projectName, key].join('.')
}
