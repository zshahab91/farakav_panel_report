<template>
  <div class="component-report">
    <b-card
      tag="article">
      <b-form
        class="form">
        <b-row>
          <b-col
            lg="5"
            sm="12"
            class="text-left">
            <b-row>
              <b-col
                sm="12">
                <date-picker
                  id="startDate"
                  v-model="start_date"
                  :config="datepickerOptions"
                  autocomplete="off"
                  class="form-control"
                  placeholder="From..."/>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            lg="5"
            sm="12"
            class=" text-left">
            <b-row>
              <b-col
                sm="12">
                <date-picker
                  id="endDate"
                  :config="datepickerOptions"
                  v-model="end_date"
                  autocomplete="off"
                  class="form-control"
                  placeholder="To..."/>
              </b-col>
            </b-row>
          </b-col>
          <b-col
            lg="2"
            sm="12">
            <b-row>
              <b-col
                sm="12"
                lg="6">
                <b-button
                  size="md"
                  type="button"
                  variant="primary-outline"
                  class="btn btn-dark"
                  @click="onSubmit">
                  <i class="fa fa-check"/>
                </b-button>
              </b-col>
              <b-col
                sm="12"
                lg="6">
                <b-button
                  size="md"
                  type="button"
                  variant="error"
                  class="btn btn-danger"
                  @click="onReset">
                  <i class="fa fa-close"/>
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import { setDefaultDate } from '../../../services/setDefaultDate'

export default {
  name: 'Filterdate',
  components: {datePicker},
  data () {
    return {
      datepickerOptions: {
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        useCurrent: false
      },
      start_date: this.$store.getters['filter/getStartDateRange'],
      end_date: this.$store.getters['filter/getEndDateRange']
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch({
        type: 'filter/setDateAction',
        startDate: this.start_date,
        endDate: this.end_date
      })
      this.$emit('change', true)
    },
    onReset () {
      this.start_date = setDefaultDate().from
      this.end_date = setDefaultDate().to
      this.$store.dispatch({
        type: 'filter/setDateAction',
        startDate: this.start_date,
        endDate: this.end_date
      })
      this.$emit('change', false)
    }
  }
}
</script>
