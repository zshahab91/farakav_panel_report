<template>
  <div
    id="app"
    class="page-app">
    <notifications/>
    <div class="s-layout">
      <!-- Sidebar -->
      <Sidebar/>
      <!-- Content -->
      <main class="s-layout__content">
        <div
          v-if="showLoading"
          v-cloak
          class="loading">
          <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"/>
          <span>Loading...</span>
        </div>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidbar'
export default {
  name: 'App',
  components: {
    Sidebar
  },
  data () {
    return {
      label: 'Loading...',
      overlay: true
    }
  },
  computed: {
    showLoading () {
      return this.$store.getters['report/getLoading']
    }
  }
}
</script>

<style lang="scss">
  @import "sass/main";
</style>
