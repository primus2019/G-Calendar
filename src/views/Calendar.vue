<template>
  <b-container style="padding: 0px;" :fluid="true">
    <b-row style="margin: 0px;">
      <Navbar
        :timeUnit="timeUnit"
        :darkMode="darkMode"
        @change-time-unit="handleChangeTimeUnit"
        @focus-today="handleFocusToday"
        @shift-dark-mode="handleShiftDarkMode"
        @backward="handleBackward"
        @forward="handleForward"
      ></Navbar>
    </b-row>
    <b-row style="margin: 0px;">
      <HourList
        :timeUnit="timeUnit"
        :listItems="listItems"
        :darkMode="darkMode"
        @add-task="handleAddTaskModal"
        @show-task="handleShowTask"
      ></HourList>
    </b-row>
    <TaskDetail
      id="task-detail"
      :task="taskOnShow"
      :darkMode="darkMode"
      :addMode="addMode"
      @alter-task="handleAlterTask"
      @delete-task="handleDeleteTask"
      @add-task="handleAddTask"
    ></TaskDetail>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
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
      listItems: {},
      taskOnShow: {},
      darkMode: false,
      startingDate: '',
      addMode: false
    }
  },
  methods: {
    handleChangeTimeUnit (newTimeUnit: string): void {
      console.log('handleChangeTimeUnit: ->' + String(newTimeUnit))
      this.timeUnit = newTimeUnit
      this.reviewTasks()
    },
    handleFocusToday (): void {
      console.log('handleFocusToday')
      this.setStartingDate()
      this.reviewTasks()
    },
    handleShiftDarkMode (): void {
      console.log('handleShiftDarkMode')
      this.darkMode = !this.darkMode
    },
    handleBackward (): void {
      console.log('handleBackward')
      const tmpDate = new Date(
        parseInt(this.startingDate.substr(0, 4)),
        parseInt(this.startingDate.substr(4, 2)) - 1,
        parseInt(this.startingDate.substr(6, 2))
      )
      tmpDate.setDate(tmpDate.getDate() - 1)
      this.startingDate = tmpDate.getFullYear().toString() + (tmpDate.getMonth() + 1).toString().padStart(2, '0') + tmpDate.getDate().toString().padStart(2, '0')
      this.reviewTasks()
    },
    handleForward (): void {
      console.log('handleForward')
      const tmpDate = new Date(
        parseInt(this.startingDate.substr(0, 4)),
        parseInt(this.startingDate.substr(4, 2)) - 1,
        parseInt(this.startingDate.substr(6, 2))
      )
      tmpDate.setDate(tmpDate.getDate() + 1)
      this.startingDate = tmpDate.getFullYear().toString() + (tmpDate.getMonth() + 1).toString().padStart(2, '0') + tmpDate.getDate().toString().padStart(2, '0')
      this.reviewTasks()
    },
    handleAddTaskModal (day: number, hour: number): void {
      this.addMode = true
      const tmpDate = new Date(
        parseInt(this.startingDate.substr(0, 4)),
        parseInt(this.startingDate.substr(4, 2)) - 1,
        parseInt(this.startingDate.substr(6, 2))
      )
      tmpDate.setDate(tmpDate.getDate() + day)
      const tmpDateStr = tmpDate.getFullYear().toString() + (tmpDate.getMonth() + 1).toString().padStart(2, '0') + tmpDate.getDate().toString().padStart(2, '0')
      this.taskOnShow = {
        date: tmpDateStr,
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_hour: hour,
        // eslint-disable-next-line @typescript-eslint/camelcase
        start_minute: 0,
        // eslint-disable-next-line @typescript-eslint/camelcase
        end_hour: hour + 1,
        // eslint-disable-next-line @typescript-eslint/camelcase
        end_minute: 0,
        title: 'New title',
        description: null,
        location: null,
        importance: 0,
        daily: 0
      }
      this.$bvModal.show('task-detail')
    },
    handleAddTask (task: Record<string, any>): void {
      if (task.importance == null) {
        task.importance = 0
      }
      console.log('POST add_task: request', {
        method: 'post',
        url: 'www.primus2020.cn:3000/calendar/add_task',
        data: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          task: task
        }
      })
      axios({
        method: 'post',
        url: 'www.primus2020.cn:3000/calendar/add_task',
        data: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          task: task
        }
      })
        .then((res: Record<string, any>) => {
          console.log('POST add_task: response.data', res.data)
          this.$bvModal.hide('task-detail')
          this.reviewTasks()
        })
        .catch((err) => { console.log(err) })
    },
    async handleShowTask (day: number, hour: number): Promise<void> {
      console.log('handleShowTask')
      this.addMode = false
      this.taskOnShow = (this.listItems as Record<string, any>)[day][hour]
      await this.$bvModal.show('task-detail')
    },
    handleAlterTask (newTask: Record<string, any>): void {
      if (newTask.importance == null) {
        newTask.importance = 0
      }
      console.log('POST alter_task: request', {
        method: 'post',
        url: 'www.primus2020.cn:3000/calendar/alter_task',
        data: { task: newTask }
      })
      axios({
        method: 'post',
        url: 'www.primus2020.cn:3000/calendar/alter_task',
        data: { task: newTask }
      })
        .then((res) => {
          if (res.data.status === 0) {
            console.log('alter set')
          } else {
            console.log('alter fails')
          }
          this.$bvModal.hide('task-detail')
          this.reviewTasks()
        })
        .catch((err) => { console.log(err) })
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    handleDeleteTask (taskId: number): void {
      axios({
        method: 'post',
        url: 'www.primus2020.cn:3000/calendar/delete_task',
        // eslint-disable-next-line @typescript-eslint/camelcase
        data: { task_id: taskId }
      })
        .then((res) => {
          console.log('delete_task: response.data', res.data)
          if (res.data.status === 0) {
            console.log('remove is set')
          } else {
            console.log('remove fails')
          }
          this.$bvModal.hide('task-detail')
          this.reviewTasks()
        })
        .catch((err) => { console.log(err) })
    },
    setStartingDate (): void {
      const today = new Date()
      if (this.timeUnit === 'W') {
        today.setDate(today.getDate() - today.getDay())
      }
      this.startingDate = today.getFullYear().toString() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate().toString().padStart(2, '0')
    },
    reviewTasks (): void {
      console.log('review_task: request', {
        method: 'get',
        url: 'www.primus2020.cn:3000/calendar/review_tasks',
        params: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          time_unit: this.timeUnit,
          // eslint-disable-next-line @typescript-eslint/camelcase
          starting_date: this.startingDate
        }
      })
      axios({
        method: 'get',
        url: 'www.primus2020.cn:3000/calendar/review_tasks',
        params: {
          // eslint-disable-next-line @typescript-eslint/camelcase
          time_unit: this.timeUnit,
          // eslint-disable-next-line @typescript-eslint/camelcase
          starting_date: this.startingDate
        }
      })
        .then((res: Record<string, any>) => {
          console.log(res.data)
          this.listItems = res.data
        })
        .catch((err) => { console.log(err) })
    }
  },
  mounted (): void {
    this.setStartingDate()
    this.reviewTasks()
  }
})
</script>
