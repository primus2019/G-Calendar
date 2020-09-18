<template>
  <b-table responsive small selectable select-mode="single" :fields="tableFields" :items="tableItems" primary-key="hour">
    <template v-slot:cell(hour)="data">
      {{ data.value }}
    </template>
    <template v-slot:cell(day0)="data" v-if="['W', 'X', 'D'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day1)="data" v-if="['W', 'X'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day2)="data" v-if="['W', 'X'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day3)="data" v-if="['W', 'X'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day4)="data" v-if="['W'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day5)="data" v-if="['W'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
    <template v-slot:cell(day6)="data" v-if="['W'].includes(timeUnit)">
      <b-button
        block
        class="task-button"
        v-if="data.value.title"
        :variant="importanceMap[data.value.importance]"
      >
        {{ data.value.title }}
      </b-button>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HourTable',
  props: {
    timeUnit: {
      type: String
    },
    tableFields: {
      type: Array
    },
    tableItems: {
      type: Array
    }
  },
  data () {
    return {
      importanceMap: {
        0: 'success',
        1: 'primary',
        2: 'warning',
        3: 'danger'
      }
    }
  }
})
</script>

<style scoped>
</style>
