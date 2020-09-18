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
      v-for="(singleList, listIndex) in listItems"
      :key="listIndex"
      style="margin: 0px; padding: 0px;"
    >
      <b-list-group flush>
        <b-list-group-item class="list-group-item">
          {{ (totalCols['xl'] - hourIndexCols['xl']) / timeUnitNum[timeUnit] }}
        </b-list-group-item>
        <div v-for="(item, itemIndex) in singleList" :key="itemIndex">
          <b-list-group-item
            button
            class="list-group-item"
            @click="$emit('add-task')"
          >
            <b-button
              block
              class="task-button"
              v-if="itemIndex === 0"
              :style="taskButtonStyle"
            >
              {{ item.title }}
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
    listItems: Array
  },
  data () {
    return {
      listItemHeight: '45px',
      taskButtonStyle: {
        position: 'relative',
        'z-index': 30,
        height: 120 + 'pt'
      },
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
      }
    }
  }
})
</script>

<style scoped>
.list-group-item {
  height: 45pt;
}
</style>
