<template>
  <b-container style="padding: 0px;" :fluid="true">
    <b-row style="margin: 0px;">
      <Navbar
        :timeUnit="timeUnit"
        :darkMode="darkMode"
        @change-time-unit="handleChangeTimeUnit"
        @focus-today="handleFocusToday"
        @shift-dark-mode="handleShiftDarkMode"
      ></Navbar>
    </b-row>
    <b-row style="margin: 0px;">
      <HourList
        :timeUnit="timeUnit"
        :tableFields="tableFields"
        :listItems="listItems"
        :darkMode="darkMode"
        @add-task="handleAddTask"
        @show-task="handleShowTask"
      ></HourList>
    </b-row>
    <TaskDetail
      id="task-detail"
      :task="taskOnShow"
      :darkMode="darkMode"
      @alter-task="handleAlterTask"
      @delete-task="handleDeleteTask"
    ></TaskDetail>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import Navbar from '../components/Navbar.vue'
import HourList from '../components/HourList.vue'
import TaskDetail from '../components/TaskDetail.vue'

export default Vue.extend({
  name: 'Calendar',
  components: {
    Navbar,
    HourList,
    TaskDetail
  },
  data () {
    return {
      timeUnit: 'X',
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
      listItems: {
        0: {
          date: '2020年9月18日',
          8: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            task_id: 0,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_hour: 8,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_minute: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_hour: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_minute: 10,
            length: 1,
            offset: 1.5,
            title: 'some title',
            description: 'some description',
            location: 'some location',
            importance: 0,
            daily: false
          }
        },
        1: {
          date: '2020年9月19日',
          8: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            task_id: 0,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_hour: 8,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_minute: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_hour: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_minute: 10,
            length: 1.5,
            offset: 0.5,
            title: 'some title',
            description: 'some description',
            location: 'some location',
            importance: 1,
            daily: false
          }
        },
        2: {
          date: '2020年9月20日',
          8: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            task_id: 0,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_hour: 8,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_minute: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_hour: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_minute: 10,
            length: 3,
            offset: 0.5,
            title: 'some title',
            description: 'some description',
            location: 'some location',
            importance: 2,
            daily: false
          }
        },
        3: {
          date: '2020年9月21日',
          8: {
            // eslint-disable-next-line @typescript-eslint/camelcase
            task_id: 0,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_hour: 8,
            // eslint-disable-next-line @typescript-eslint/camelcase
            start_minute: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_hour: 10,
            // eslint-disable-next-line @typescript-eslint/camelcase
            end_minute: 10,
            length: 4.5,
            offset: 0.5,
            title: 'some title',
            description: 'some description',
            location: 'some location',
            importance: 3,
            daily: false
          }
        }
      },
      taskOnShow: {},
      darkMode: false
    }
  },
  methods: {
    handleChangeTimeUnit (newTimeUnit: string): void {
      this.timeUnit = newTimeUnit
      console.log('handleChangeTimeUnit: ->' + String(newTimeUnit))
    },
    handleFocusToday (): void {
      console.log('handleFocusToday')
    },
    handleShiftDarkMode (): void {
      console.log('handleShiftDarkMode')
      this.darkMode = !this.darkMode
    },
    async handleAddTask (): Promise<void> {
      await console.log('handleAddTask')
    },
    async handleShowTask (day: number, hour: number): Promise<void> {
      console.log('handleShowTask')
      this.taskOnShow = (this.listItems as Record<string, any>)[day][hour]
      await this.$bvModal.show('task-detail')
    },
    async handleAlterTask (newTask: Record<string, any>): Promise<void> {
      await console.log('handleAlterTask')
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    async handleDeleteTask (task_id: number): Promise<void> {
      await console.log('handleDeleteTask', task_id)
    }
  }
})
</script>
