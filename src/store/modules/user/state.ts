import { Module } from 'vuex';
import { StateType } from '@/@types';
import actions from './actions'



export interface UserState{
    token: string
    name: string
    avatar: string
    introduction: string
    roles: string[]
    email: string
}

 const state: UserState = {
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  email: ''
}

type UserStateType = typeof state;

const user: Module<UserStateType, StateType> = { actions, ...state };


export { UserStateType, state };
export default user;