import Conf from 'conf'
import type { InputParams } from './types/input-params'

export function getStore() {
  return new Conf({ projectName: 'wcommit' })
}

export function setStoreData(params: InputParams) {
  getStore().set({
    wcommit: params,
  })
}

export function getStoreData() {
  return getStore().get('wcommit')
}

export function clearStoreData() {
  getStore().clear()
}
