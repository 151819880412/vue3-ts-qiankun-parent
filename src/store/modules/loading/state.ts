import { StateType } from '@/@types'
import { Module } from 'vuex'

const state = {
  language: 'zhCN',
  lock: true,
  text: 'Loading...',
  spinner: 'el-icon-loading',
  background: 'rgba(255, 2555, 255, 0.5)',
  customClass:'qqqqq',
}
type LoadingStateType = typeof state

const loading: Module<LoadingStateType, StateType> = { namespaced: false, ...state }

export { LoadingStateType, state }
export default loading