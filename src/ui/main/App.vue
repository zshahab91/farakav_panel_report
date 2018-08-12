<template>
  <div
    id="app"
    class="page-app">
    <notifications/>
    <div class="container-fluid p-0">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-lg-2 col-sm-12 p-0">
          <Sidebar/>
        </div>
        <div class="col-lg-10 col-sm-12 p-0">
          <!-- Content -->
          <main class="page">
            <div
              v-if="showLoading"
              v-cloak
              class="loading">
              <div class="box-loading">
                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"/>
                <span>Loading...</span>
              </div>
            </div>
            <router-view />
          </main>
        </div>
      </div>
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
