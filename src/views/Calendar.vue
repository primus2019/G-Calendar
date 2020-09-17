<template>
  <b-container :fluid="true">
    <b-row>
      <Navbar
        :timeUnit="timeUnit"
        @change-time-unit="handleChangeTimeUnit"
        @focus-today="handleFocusToday"
      ></Navbar>
    </b-row>
    <b-row>
      <HourTable
        :timeUnit="timeUnit"
        :tableFields="tableFields"
        :tableItems="tableItems"
      ></HourTable>
    </b-row>
    <HourList
      :timeUnit="timeUnit"
      :tableFields="tableFields"
      :listItems="listItems"
    ></HourList>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '../components/Navbar.vue'
import HourTable from '../components/HourTable.vue'
import HourList from '../components/HourList.vue'

export default Vue.extend({
  name: 'Calendar',
  components: {
    Navbar,
    HourTable,
    HourList
  },
  data () {
    return {
      timeUnit: 'W',
      tableFields: [
        'hour',
        { key: 'day0', label: '2020年9月15日' },
        { key: 'day1', label: '2020年9月16日' },
        { key: 'day2', label: '2020年9月17日' },
        { key: 'day3', label: '2020年9月18日' },
        { key: 'day4', label: '2020年9月19日' },
        { key: 'day5', label: '2020年9月20日' },
        { key: 'day6', label: '2020年9月21日' }
      ],
      tableItems: [
        { hour: 0, day0: { start: 20, end: 30, title: 'aaa', description: 'bbb', importance: 0 }, day1: {}, day2: {}, day3: {}, day4: {}, day5: {}, day6: { title: 'aaa', importance: 3 } },
        { hour: 1, day0: { start: 20, end: 30, title: 'aaa', description: 'bbb', importance: 0 }, day1: { start: 20, end: 30, title: 'aaa', description: 'bbb', importance: 0 } },
        { hour: 2, day0: {}, day1: {} },
        { hour: 3, day0: {}, day1: {} },
        { hour: 4, day0: {}, day1: {} },
        { hour: 5, day0: {}, day1: {} },
        { hour: 6, day0: {}, day1: {} },
        { hour: 7, day0: {}, day1: {} },
        { hour: 8, day0: {}, day1: {} },
        { hour: 9, day0: {}, day1: {} },
        { hour: 10, day0: {}, day1: {} },
        { hour: 11, day0: {}, day1: {} },
        { hour: 12, day0: {}, day1: {} },
        { hour: 13, day0: {}, day1: {} },
        { hour: 14, day0: {}, day1: {} },
        { hour: 15, day0: {}, day1: {} },
        { hour: 16, day0: {}, day1: {} },
        { hour: 17, day0: {}, day1: {} },
        { hour: 18, day0: {}, day1: {} },
        { hour: 19, day0: {}, day1: {} },
        { hour: 20, day0: {}, day1: {} },
        { hour: 21, day0: {}, day1: {} },
        { hour: 22, day0: {}, day1: {} },
        { hour: 23, day0: {}, day1: {} }
      ],
      listItems: [
        [
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 }
        ],
        [
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 },
          { start: '0620', end: '0820', title: 'aaa', description: 'bbb', importance: 0 }
        ]
      ]
    }
  },
  methods: {
    handleChangeTimeUnit (newTimeUnit: string): void {
      this.timeUnit = newTimeUnit
      console.log('handleChangeTimeUnit: ->' + String(newTimeUnit))
    },
    handleFocusToday (): void {
      console.log('handleFocusToday')
    }
  }
})
</script>
