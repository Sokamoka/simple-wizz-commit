import Conf from 'conf'
import type { InputParams } from './types/input-params'

export function getStore() {
  return new Conf({ projectName: 'wcommit' })
}

export function setStoredData(key: string, params: InputParams) {
  getStore().set({
    wcommit: {
      [key]: params,
    },
  })
}

export function getStoredData(key: string) {
  return getStore().get(`wcommit.${key}`)
}

export function deleteStoredData(key: string) {
  getStore().delete(`wcommit.${key}`)
}

export function clearStoredData() {
  getStore().clear()
}
