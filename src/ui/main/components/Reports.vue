<template>
  <div class="component-report">
    <b-card
      tag="article">
      <b-form
        class="form"
        @submit="onSubmit"
        @reset="onReset">
        <b-row>
          <b-col
            lg="5"
            sm="12"
            class="text-left">
            <b-row>
              <b-col
                sm="12"><label for="startDate">{{ $t('form.startDate') }}:</label></b-col>
              <b-col
                sm="12">
                <b-form-input
                  id="startDate"
                  v-model="form.start_date"
                  type="date"
                  class="p-0"/>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            lg="5"
            sm="12"
            class=" text-left">
            <b-row>
              <b-col
                sm="12"><label for="endDate">{{ $t('form.endDate') }}:</label></b-col>
              <b-col
                sm="12">
                <b-form-input
                  id="endDate"
                  v-model="form.end_date"
                  type="date"
                  class="p-0" />
              </b-col>
            </b-row>
          </b-col>
          <b-col
            lg="2"
            sm="12"
            class="btn-form">
            <b-row>
              <b-col
                sm="12"
                lg="6">
                <b-button
                  type="submit"
                  variant="primary"><i class="fa fa-check"/></b-button>
              </b-col>
              <b-col
                sm="12"
                lg="6">
                <b-button
                  type="submit"
                  variant="error"
                  @click="onReset"><i class="fa fa-close"/></b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Reports',
  data () {
    return {
      form: {
        start_date: '',
        end_date: '',
        type_report: ''
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.$store.dispatch({
        type: 'report/getDate',
        startDate: this.form.start_date,
        endDate: this.form.end_date
      })
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: window.location.pathname.slice(1)
      })
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.start_date = ''
      this.form.end_date = ''
      // location.reload()
      this.$store.dispatch({
        type: 'report/getReportAction',
        method: 'method',
        section: window.location.pathname.slice(1)
      })
    }
  }
}
</script>
