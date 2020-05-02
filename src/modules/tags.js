export default {
  state: {
    tags: [],
  },
  mutations: {
    SOCKET_UPDATE_TAGS(state, tags) {
      console.log('tags:', tags);
      state.tags = tags;
    },
  },
  actions: {
    insert_tag({rootState}, name) {
      console.log('inserting tag:', name);
      rootState.io.emit('insert_tag', name);
    },
    update_tag({rootState}, tag) {
      console.log('updating tag:', tag.id);
      rootState.io.emit('update_tag', tag);
    },
    remove_tag({rootState}, tag) {
      console.log('removing tag:', tag.id);
      rootState.io.emit('remove_tag', tag);
    },
  },
  getters: {
    tags(state) {
      return state.tags;
    },
  },
};
