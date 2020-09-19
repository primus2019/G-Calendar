<template>
  <b-row style="width: 100%; margin: 0px;">
    <b-col xl="1" lg="1" md="1" sm="1" cols="1" style="margin: 0px; padding: 0px;">
      <b-list-group flush>
        <b-list-group-item
          class="list-group-item"
          :variant="darkMode ? 'dark' : 'light'"
        ></b-list-group-item>
        <div v-for="n in 24" :key="n">
          <b-list-group-item
            class="list-group-item"
            :variant="darkMode ? 'dark' : 'light'"
          >{{ n - 1 }}</b-list-group-item>
        </div>
      </b-list-group>
    </b-col>
    <b-col xl="11" lg="11" md="11" sm="11" cols="11" style="padding: 0px;">
      <b-row
        style="width: 100%; margin: 0px;"
        cols-xl="totalCols[timeUnit]"
        cols-lg="totalCols[timeUnit]"
        cols-md="totalCols[timeUnit]"
        cols-sm="totalCols[timeUnit]"
        cols="totalCols[timeUnit]"
      >
        <b-col
          v-for="day in timeUnitNum[timeUnit]"
          :key="day"
          style="margin: 0px; padding: 0px;"
        >
          <b-list-group flush>
            <b-list-group-item
              class="list-group-item"
              :variant="darkMode ? 'dark' : 'light'"
            >
              {{ listItems[day - 1].date }}
            </b-list-group-item>
            <div v-for="hour in 24" :key="hour">
              <b-list-group-item
                :button="listItems[day - 1][hour - 1] == null"
                class="list-group-item"
                :variant="darkMode ? 'dark' : 'light'"
                @click="$emit('add-task', day - 1, hour - 1)"
              >
                <b-button
                  block
                  class="task-button"
                  v-if="listItems[day - 1][hour - 1]"
                  :style="taskButtonStyle(day - 1, hour - 1)"
                  :variant="importanceVariantMap[listItems[day - 1][hour - 1].importance]"
                  @click.stop="$emit('show-task', day - 1, hour - 1)"
                >
                  {{ listItems[day - 1][hour - 1].title }}
                </b-button>
              </b-list-group-item>
            </div>
          </b-list-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HourList',
  props: {
    timeUnit: String,
    listItems: Object,
    darkMode: Boolean
  },
  data () {
    return {
      listItemHeight: '45px',
      totalCols: {
        W: 7,
        D: 1,
        X: 4
      },
      timeUnitNum: {
        W: 7,
        D: 1,
        X: 4
      },
      importanceVariantMap: {
        0: 'primary',
        1: 'success',
        2: 'warning',
        3: 'danger'
      }
    }
  },
  methods: {
    taskButtonStyle (day: number, hour: number): Record<string, any> {
      return {
        position: 'relative',
        'z-index': 30,
        height: this.listItems[day][hour].length * 46 + 'pt',
        top: this.listItems[day][hour].offset * 46 + 'pt',
        opacity: 0.7
      }
    }
  }
})
</script>

<style scoped>
.list-group-item {
  height: 46pt;
  padding: 0px;
  padding-left: 10pt;
  padding-top: 0pt;
  border-left: 0px;
  border-right: 0px;
}
</style>
