<template>
  <div id="app">
    <Tags />
  </div>
</template>

<script>
import Vue from 'vue'
import Tags from './components/Tags'

export default Vue.extend({
  name: 'App',
  components: {
    Tags,
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
