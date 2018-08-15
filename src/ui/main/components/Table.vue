<template>
  <div class="component-table">
    <!--<h5>{{ title }} :</h5>-->
    <b-table
      :items="dataExtra"
      :fields="fields"
      striped
      bordered
      hover/>
  </div>
</template>

<script>
export default {
  name: 'TableShow',
  props: {
    dataExtra: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      fields: {
        name: {
          label: this.title,
          sortable: true
        },
        data: {
          label: 'Count',
          sortable: true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
