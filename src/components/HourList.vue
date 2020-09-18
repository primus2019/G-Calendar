<template>
  <b-row style="width: 100%;"
    :cols-xl="totalCols['xl']"
    :cols-lg="totalCols['lg']"
    :cols-md="totalCols['md']"
    :cols-sm="totalCols['sm']"
    :cols="totalCols['cols']"
  >
    <b-col :xl="hourIndexCols['xl']" :lg="hourIndexCols['lg']" :md="hourIndexCols['md']" :sm="hourIndexCols['sm']" :cols="hourIndexCols['cols']" style="margin: 0px; padding: 0px;">
      <b-list-group flush>
        <b-list-group-item class="list-group-item"></b-list-group-item>
        <div v-for="n in 24" :key="n">
          <b-list-group-item class="list-group-item">{{ n - 1 }}</b-list-group-item>
        </div>
      </b-list-group>
    </b-col>
    <b-col
      :xl="Math.floor((totalCols['xl'] - hourIndexCols['xl']) / timeUnitNum[timeUnit])"
      :lg="Math.floor((totalCols['lg'] - hourIndexCols['lg']) / timeUnitNum[timeUnit])"
      :md="Math.floor((totalCols['md'] - hourIndexCols['md']) / timeUnitNum[timeUnit])"
      :sm="Math.floor((totalCols['sm'] - hourIndexCols['sm']) / timeUnitNum[timeUnit])"
      :cols="Math.floor((totalCols['cols'] - hourIndexCols['cols']) / timeUnitNum[timeUnit])"
      v-for="day in timeUnitNum[timeUnit]"
      :key="day"
      style="margin: 0px; padding: 0px;"
    >
      <b-list-group flush>
        <b-list-group-item class="list-group-item">
          {{ listItems[day - 1].date }}
        </b-list-group-item>
        <div v-for="hour in 24" :key="hour">
          <b-list-group-item
            button
            class="list-group-item"
            @click="$emit('add-task')"
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
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HourList',
  props: {
    timeUnit: String,
    tableFields: Array,
    listItems: Object
  },
  data () {
    return {
      listItemHeight: '45px',
      totalCols: {
        xl: 12,
        lg: 12,
        md: 12,
        sm: 12,
        cols: 12
      },
      hourIndexCols: {
        xl: 1,
        lg: 1,
        md: 1,
        sm: 2,
        cols: 2
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
        height: this.listItems[day][hour].length * 45 + 'pt',
        top: this.listItems[day][hour].offset * 45 + 'pt'
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
