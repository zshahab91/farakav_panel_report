<template>
  <div class=" page page-404">
    <h2>{{ titlePage }}</h2>
    <h3>{{ $t('message.notFound') }}</h3>
  </div>
</template>

<script>
export default {
  name: '404',
  computed: {
    titlePage () {
      return this.$route.meta.title
    }
  }
}
</script>
