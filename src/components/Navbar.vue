<template>
  <b-navbar toggleable="sm" variant="light">
    <b-navbar-brand href="#">
      <b-icon icon="calendar2-check" class="mr-2"></b-icon>
      <span id="calendar-title">Calendar</span>
    </b-navbar-brand>
    <b-nav-toggle target="nav-collapse">
      <b-icon icon="list" aria-hidden="true"></b-icon>
    </b-nav-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-form>
          <b-button variant="outline-secondary" class="mr-2" @click="$emit('focus-today')">
            Today
          </b-button>
          <b-button variant="light" pill size="sm" class="mr-2">
            <b-icon icon="chevron-left"></b-icon>
          </b-button>
          <b-button variant="light" pill size="sm">
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-dropdown variant="outline-secondary" :text="timeUnitMap[timeUnit]">
            <div v-for="(item, key, index) in timeUnitMap" :key="index">
              <b-dropdown-item @click="$emit('change-time-unit', key)">{{ item }}</b-dropdown-item>
            </div>
          </b-dropdown>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Navbar',
  props: {
    timeUnit: {
      type: String
    }
  },
  data () {
    return {
      timeUnitMap: {
        D: 'Day',
        W: 'Week',
        M: 'Month',
        Y: 'Year',
        X: '4 days'
      }
    }
  }
})
</script>

<style scoped>
.navbar {
  width: 100%;
}
</style>
