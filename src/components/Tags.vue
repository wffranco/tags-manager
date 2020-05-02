<template>
  <div>
    <nav class="navbar navbar-dark bg-dark sticky-top text-light">
      <a class="navbar-brand">Tags Manager</a>
      <i class="fa-lightbulb" :class="isConnected?'fas':'far'" :title="`Socket ${isConnected?'C':'Disc'}onnected`" />
    </nav>
    <div class="container">
      <form class="my-3" @submit.prevent.stop="insertTag">
        <div class="input-group">
          <div class="input-group-prepend">
            <label class="input-group-text" id="tag-name-title" for="tag-name">Add Tag</label>
          </div>
          <input v-model="name" type="text" autofocus class="form-control" id="tag-name" aria-describedby="tag-name-title" required>
          <div class="input-group-append" title="Save Tag">
            <button class="btn btn-primary" type="submit"><i class="far fa-save"></i></button>
          </div>
        </div>
      </form>
      <ul v-if="tags && tags.length" class="list-group">
        <template v-for="tag in tags">
          <li :key="tag.id" class="list-group-item text-left">
            <template v-if="edit && edit.id === tag.id">
              <form @submit.prevent.stop="updateTag">
                <div class="input-group">
                  <input ref="edit" @keydown.esc="edit=null" v-model="edit.name" type="text" autofocus class="form-control" id="tag-name" aria-describedby="tag-name-title" required>
                  <div class="input-group-append">
                    <button class="btn btn-success" type="submit" title="Update"><i class="far fa-save"></i></button>
                    <button @click="edit=null" class="btn btn-danger" type="button" title="Cancel"><i class="fas fa-times"></i></button>
                  </div>
                </div>
              </form>
            </template>
            <template v-else>
              <div class="row">
                <div class="col">
                  <i class="fas fa-check-circle mr-1 my-2" :style="{color:tag.color}"></i>
                  {{tag.name}}
                </div>
                <div class="col-auto">
                  <button @click="editTag(tag)" class="btn btn-outline-secondary btn-sm mx-1" title="Edit Tag">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button @click="removeTag(tag)" class="btn btn-outline-secondary btn-sm mx-1" title="Remove Tag">
                    <i class="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      edit: null,
      name: '',
    };
  },
  sockets: {

    // connect() {
    //   this.isConnected = true;
    // },

    // disconnect() {
    //   this.isConnected = false;
    // },

  },

  computed: {
    ...mapGetters(['tags', 'isConnected']),
  },

  methods: {
    insertTag() {
      this.$store.dispatch('insert_tag', this.name);
      this.name = '';
    },
    editTag(edit) {
      if (!edit) return;
      const tag = this.tags.find(el => el.id === edit.id);
      this.edit = tag ? {...tag} : null;
      this.$nextTick(() => this.$refs.edit[0].focus());
    },
    updateTag() {
      if (!this.edit) return;
      this.$store.dispatch('update_tag', this.edit);
      this.edit = null;
    },
    removeTag(tag) {
      if (!tag || !tag.id) return;
      if (confirm('Are you sure you want to remove this tag?')) {
        this.$store.dispatch('remove_tag', tag);
      }
    },
  }
}
</script>
