import { Module } from 'vuex';
import { State } from '../../store';
import {makeToast, getErrorText} from '@/assets/js/some-funct';

interface AuthState {
  token: string | null;
  user: {
    username: string | null;
  } | null;
}

const auth: Module<AuthState, State> = {
  state: {
    token: sessionStorage.getItem('token') || null,
    user: JSON.parse(sessionStorage.getItem('user') || 'null')
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    setUser(state, user: { username: string }) {
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    clearAuth(state) {
      state.token = null;
      state.user = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  },
  actions: {
    async login({ commit }, { login, password }: { login: string; password: string }) {
      const url = 'http://85.159.27.162:85/api/Account/signin';
      const obj = {
        login: login,
        pwd: password,
        rem: true
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(obj)
        });

        if (!response.ok) {
          const errTxt = await getErrorText(response);
          throw new Error(errTxt);
        }

        const data = await response.json();
        commit('setToken', data.token);
        commit('setUser', { username: login });
      } catch (error) {
        makeToast(this, 'danger', 'Error Login', (error as Error).toString());
        console.error('Error Login:', error);
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    token: (state) => state.token,
    user: (state) => state.user
  }
};

export default auth;
