import createStoreHook from 'zustand'
import createStore from 'zustand/vanilla'
import { initialState } from './initialState'

export const store = createStore(
  () => initialState
)

export const useSelector = createStoreHook(store)
