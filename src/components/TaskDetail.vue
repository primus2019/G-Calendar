<template>
  <b-modal
    centered
    hide-backdrop
    :id="id"
    :header-bg-variant="darkMode ? 'dark' : 'light'"
    :body-bg-variant="darkMode ? 'dark' : 'light'"
    :footer-bg-variant="darkMode ? 'dark' : 'light'"
    @show="reset"
  >
    <template v-slot:modal-header style="align-items: center;">
      <h3
        v-if="!editTitle"
        :style="{ color: darkMode ? 'white' : 'black' }"
        @dblclick="editTitle = true"
      >{{ tmpTask.title }}</h3>
      <b-input-group-append
        v-if="editTitle"
      >
        <b-form-input
          autofocus
          v-model="titleOnInput"
          :style="{ color: darkMode ? 'white' : 'black', 'background-color': 'transparent' }"
          @keydown.enter="handleTitleInput"
          @blur="handleTitleInput"
        ></b-form-input>
      </b-input-group-append>
      <b-button-group class="ml-auro" v-if="!editStartTime && !editEndTime">
        <b-button :variant="importanceVariantMap[tmpTask.importance]" @click="editStartTime = true">
          <b-icon icon="hammer"></b-icon>
          {{ tmpTask.start_hour + ' : ' + tmpTask.start_minute.toString().padStart(2, '0') }}
        </b-button>
        <b-button :variant="'outline-' + importanceVariantMap[tmpTask.importance]" @click="editEndTime = true">
          <b-icon icon="house"></b-icon>
          {{ tmpTask.end_hour + ' : ' + tmpTask.end_minute.toString().padStart(2, '0') }}
        </b-button>
      </b-button-group>
      <b-input-group-append
        v-if="editStartTime || editEndTime"
      >
        <b-form-timepicker
          no-close-button
          v-model="timeOnPick"
          @hidden="handleTimePick"
        ></b-form-timepicker>
      </b-input-group-append>
    </template>
    <template v-slot:modal-footer style="align-items: center; justify-coentents: end;">
      <b-button-group>
        <b-button
        >
          cancel
        </b-button>
        <b-button
          @click="$emit('delete-task', tmpTask.task_id)"
        >
          delete
        </b-button>
        <b-button
          :variant="importanceVariantMap[tmpTask.importance]"
          @click="$emit('alter-task', tmpTask)"
        >
          change
        </b-button>
      </b-button-group>
    </template>
    <b-textarea
      no-resize
      rows="8"
      :plaintext="!editDescription"
      :value="tmpTask.description"
      :style="{ color: darkMode ? 'white' : 'black', 'background-color': 'transparent' }"
      @dblclick="editDescription = true"
      @keydown.ctrl.enter="editDescription = false"
      @blur="editDescription = false"
    >
    </b-textarea>
    <b-textarea
      no-resize
      :plaintext="!editLocation"
      :value="tmpTask.location"
      :style="{ color: darkMode ? 'white' : 'black', 'background-color': 'transparent' }"
      @dblclick="editLocation = true"
      @keydown.ctrl.enter="editLocation = false"
      @blur="editLocation = false"
    >
    </b-textarea>
    <b-form-rating
      no-border
      show-clear
      icon-empty="star"
      stars="3"
      v-model="tmpTask.importance"
      :style="{ 'background-color': darkMode ? '#4d4d4d' : '#e9ecef' }"
      :color="importanceColorMap[tmpTask.importance]"
    ></b-form-rating>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'TaskDetail',
  props: {
    task: Object,
    id: String,
    darkMode: Boolean
  },
  data () {
    return {
      editStartTime: false,
      editEndTime: false,
      editTitle: false,
      editDescription: false,
      editLocation: false,
      editImportance: false,
      editDaily: false,
      tmpTask: { ...this.task },
      timeOnPick: '',
      titleOnInput: '',
      importanceVariantMap: {
        0: 'primary',
        1: 'success',
        2: 'warning',
        3: 'danger'
      },
      importanceColorMap: {
        0: '#007bff',
        1: '#28a745',
        2: '#ff8800',
        3: '#dc3545'
      }
    }
  },
  methods: {
    reset (): void {
      this.editStartTime = false
      this.editEndTime = false
      this.editTitle = false
      this.editDescription = false
      this.editLocation = false
      this.editImportance = false
      this.editDaily = false
    },
    handleTimePick (): void {
      if (!this.timeOnPick) {
        this.editStartTime = false
        this.editEndTime = false
      } else if (this.editStartTime) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.tmpTask.start_hour = parseInt(this.timeOnPick.substring(0, 2))
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.tmpTask.start_minute = parseInt(this.timeOnPick.substring(3, 5))
        this.editStartTime = false
      } else {
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.tmpTask.end_hour = parseInt(this.timeOnPick.substring(0, 2))
        // eslint-disable-next-line @typescript-eslint/camelcase
        this.tmpTask.end_minute = parseInt(this.timeOnPick.substring(3, 5))
        this.editEndTime = false
      }
      this.timeOnPick = ''
    },
    handleTitleInput (): void {
      if (this.titleOnInput) {
        this.tmpTask.title = this.titleOnInput
      }
      this.editTitle = false
      this.titleOnInput = ''
    }
  },
  watch: {
    task: {
      deep: true,
      handler: function (): void {
        this.tmpTask = { ...this.task }
      }
    }
  }
})
</script>

<style scoped>
</style>
