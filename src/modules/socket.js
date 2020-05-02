export default {
  state: {
    isConnected: false,
  },
  mutations: {
    SOCKET_CONNECTED(state) {
      console.log('tags: connected');
      state.isConnected = true;
    },
    SOCKET_DISCONNECTED(state) {
      console.log('tags: disconnected');
      state.isConnected = false;
    },
  },
  getters: {
    isConnected(state) {
      return state.isConnected;
    },
  },
};
