<template>
  <div class="extra-data">
    <h5>{{ title }} :</h5>
    <div class="row">
      <div
        v-for="(item,inx) of dataExtra"
        :key="inx"
        :class="[dataExtra.length !== 3 ? 'col-lg-3 col-sm-12' : 'col-lg-4 col-sm-12']">
        <b-card
          :title="String(item.data)"
          :footer="item.name"
          footer-tag="footer"
          class="component-datashow text-center"/>
      </div>
    </div>
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
