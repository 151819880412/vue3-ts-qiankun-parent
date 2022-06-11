
import { MutationTree } from 'vuex'
import { UserState } from './state'
import { UserMutationTypes } from './mutation-types'

export type Mutations<S = UserState> = {
  [UserMutationTypes.SET_TOKEN](state: S, token: string): void
}
// 无参
// export type Mutations<S = UserState> = {
//   [UserMutationTypes.SET_TOKEN](state: S): void
// }

export const mutations: MutationTree<UserState> & Mutations = {
  [UserMutationTypes.SET_TOKEN](state: UserState, token: string) {
    state.token = token
    localStorage.setItem('token',token)
  },

  // 无参
  // [UserMutationTypes.SET_TOKEN](state: UserState) {
  // },

}