import Vue from 'vue'
import Vuex from 'vuex'
import VueSocketIO from 'vue-socket.io'
// import SocketIO from 'socket.io-client'
import tags from './modules/tags'
import socket from './modules/socket'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    io: null,
  },
  mutations: {
    setSocket(state, socket) {
      console.log('socket conectado a vuex');
      state.io = socket;
    },
  },
  modules: {
    socket,
    tags,
  },
});

Vue.use(new VueSocketIO({
  // debug: true,
  connection: 'http://localhost:4000',
  vuex: {
    store,
    mutationPrefix: 'SOCKET_'
  },
}))
// Vue.use(VueSocketIO, 'http://localhost:4000', store);

export default store;
