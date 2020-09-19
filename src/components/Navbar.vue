<template>
  <b-navbar
    toggleable="sm"
    :variant="darkMode ? 'dark' : 'light'"
    :type="darkMode ? 'dark' : 'light'"
  >
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
          <b-button
            class="mr-2"
            :variant="darkMode ? 'outline-light' : 'outline-secondary'"
            @click="$emit('focus-today')">
            Today
          </b-button>
          <b-button
            pill
            size="sm"
            class="mr-2 change-date-button"
            :variant="darkMode ? 'dark' : 'light'"
            @click="$emit('backward')"
          >
            <b-icon icon="chevron-left"></b-icon>
          </b-button>
          <b-button
            pill
            size="sm"
            class="mr-2 change-date-button"
            :variant="darkMode ? 'dark' : 'light'"
            @click="$emit('forward')"
          >
            <b-icon icon="chevron-right"></b-icon>
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button
            id="dark-mode-shift-button"
            class="mr-2"
            :variant="darkMode ? 'dark' : 'light'"
            @click="$emit('shift-dark-mode')"
          >
            <b-icon
              aria-hidden
              :icon="darkMode ? 'sun' : 'moon'"
            ></b-icon>
          </b-button>
        </b-nav-form>
        <b-nav-form>
          <b-dropdown
            :variant="darkMode ? 'outline-light' : 'outline-secondary'"
            :text="timeUnitMap[timeUnit]"
          >
            <div v-for="(item, key, index) in timeUnitMap" :key="index">
              <b-dropdown-item-button
                :variant="darkMode ? 'outline-light' : 'outline-dark'"
                @click="$emit('change-time-unit', key)"
              >
                {{ item }}
              </b-dropdown-item-button>
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
    },
    darkMode: {
      type: Boolean
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
#dark-mode-shift-button {
  width: 30pt;
  height: 30pt;
  border-radius: 30pt;
  padding: 0;
  vertical-align: text-top;
}
.change-date-button {
  width: 30pt;
  height: 30pt;
  border-radius: 30pt;
  padding: 0;
}
</style>
