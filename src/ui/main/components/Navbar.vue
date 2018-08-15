<template>
  <div class="component-navbar">
    <b-navbar
      toggleable
      type="light"
      variant="light">
      <!--<b-navbar-toggle-->
      <!--target="nav_text_collapse"/>-->
      <b-navbar-brand>
        <router-link to="/">
          {{ $t('menu.home') }}
        </router-link>
      </b-navbar-brand>
      <b-collapse
        v-if="title !== 'Home Page'"
        id="nav_text_collapse"
        is-nav
        class="col-lg-9 col-sm-12">
        <b-navbar-nav>
          <b-nav-text class="seprator">/</b-nav-text>
          <b-nav-text>{{ title }}</b-nav-text>
        </b-navbar-nav>
      </b-collapse>
      <b-form
        v-if="isShowDate !== null"
        class="col-lg-3 col-sm-12 form">
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
                  v-model="date"
                  :config="datepickerOptions"
                  autocomplete="off"
                  class="form-control"
                  placeholder="Date..."
                  @dp-change="changeDate"/>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
    </b-navbar>
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import { setDefaultDate } from '../../../services/setDefaultDate'
export default {
  name: 'Navbar',
  components: {datePicker},
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      datepickerOptions: {
        showTodayButton: true,
        format: 'YYYY-MM-DD',
        useCurrent: false
      },
      date: setDefaultDate().date
    }
  },
  computed: {
    isShowDate () {
      return this.$store.getters['filter/getSection']
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$store.dispatch({
        type: 'filter/setDateTodayAction',
        date: this.date
      })
    },
    changeDate () {
      this.$store.dispatch({
        type: 'filter/setDateTodayAction',
        date: this.date
      })
      this.$emit('changeTodayDate', true)
    }
  }

}
</script>
