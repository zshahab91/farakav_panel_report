<template>
  <div class="component-navbar">
    <b-navbar
      toggleable
      type="light"
      variant="light">
      <b-navbar-toggle
        target="nav_text_collapse"/>
      <b-navbar-brand>
        <router-link to="/">
          {{ $t('menu.home') }}
        </router-link>
      </b-navbar-brand>
      <b-collapse
        v-if="title !== 'Home Page' "
        id="nav_text_collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-text>/ {{ title }}</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
