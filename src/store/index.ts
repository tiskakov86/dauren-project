import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export interface State {
  auth: {
    token: string | null;
    user: {
      username: string | null;
    } | null;
  };
}

const store: Store<State> = new Vuex.Store({
  modules: {
    auth
  }
});

export default store;
