<template>
  <!-- Sidebar -->
  <div class="s-layout__sidebar">
    <a
      class="s-sidebar__trigger">
      <i
        class="fa fa-bars fa-2x"
        @click="showSubMenuFunc"/>
    </a>

    <nav :class="[showSubMenu ? 'menu show-sub-menu-class' : 'menu']">
      <ul>
        <li>
          <router-link
            to="/"
            class-active=""
            exact-active-class=""
            class="s-sidebar__nav-link text-center logo">
            <img
              src="../../../../static/img/logo.png"
              alt="logo"
              width="100">
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/homepage_layouts"
            class="s-sidebar__nav-link">
            <i class="fa fa-home "/><em>{{ $t("sidebar.homePageLayout") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/category_layouts"
            class="s-sidebar__nav-link">
            <i class="fa fa-user"/><em> {{ $t("sidebar.categoryLayout") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/channels"
            class="s-sidebar__nav-link">
            <i class="fa fa-users"/><em> {{ $t("sidebar.channel") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/comments"
            class="s-sidebar__nav-link">
            <i class="fa fa-comments"/><em> {{ $t("sidebar.comment") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/likes"
            class="s-sidebar__nav-link">
            <i class="fa fa-thumbs-up"/><em> {{ $t("sidebar.like") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/videos"
            class="s-sidebar__nav-link">
            <i class="fa fa-video-camera"/><em> {{ $t("sidebar.video") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/tasks"
            class="s-sidebar__nav-link">
            <i class="fa fa-tasks"/><em>{{ $t("sidebar.task") }}</em>
          </router-link>
        </li>
        <li @click="showSubMenuFunc">
          <router-link
            to="/playlists"
            class="s-sidebar__nav-link">
            <i class="fa fa-play"/><em>{{ $t("sidebar.playlist") }}</em>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Sidbar',
  data () {
    return {
      showSubMenu: false
    }
  },
  methods: {
    showSubMenuFunc () {
      this.showSubMenu = !this.showSubMenu
      console.log('this.showSubMenu is:', this.showSubMenu)
    }
  }
}
</script>
