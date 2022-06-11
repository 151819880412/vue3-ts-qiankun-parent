
import {
  Module
} from 'vuex';

import { StateType } from '@/@types';

import { state } from './state';
import { mutations } from './mutations';
import actions from './actions';
import type { UserState } from './state';

export { UserState };


export const user: Module<UserState, StateType> = {
  state,
  mutations,
  actions
};
