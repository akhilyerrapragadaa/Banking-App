import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clients: [],
    client_accounts: Object.create(null)
  },
  mutations: {
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
    SET_CLIENT_ACCOUNT(state, {response, payload}) {
      Vue.set(state.client_accounts, payload.id, response.data);
    }
  },
  actions: {
    async getClients({ commit }) {
      const response = await api.getClients();
      if (response) {
        commit('SET_CLIENTS', response.data)
      }
    },
    async getClientAccounts({ commit }, payload) {
      const response = await api.getClientAccounts(payload.id);
      if (response) {
        commit('SET_CLIENT_ACCOUNT', {response, payload})
      }
    },
  },
  modules: {
  }
})
