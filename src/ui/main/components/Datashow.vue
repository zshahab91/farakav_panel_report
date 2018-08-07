<template>
  <div class="extra-data">
    <h5>{{ title }} :</h5>
    <span
      v-for="(item,inx) of dataExtra"
      :key="inx">
      <b-card
        :style="{width: width + '%' }"
        :title="String(item.data)"
        :footer="item.name"
        footer-tag="footer"
        class="component-datashow text-center"/>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Datashow',
  props: {
    dataExtra: {
      type: Array,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
