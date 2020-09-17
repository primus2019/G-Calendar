<template>
<b-row>
    <b-col xl="6" lg="6" md="6" sm="6" cols="6" v-for="(singleList, index) in listItems" :key="index" style="margin: 0px; padding: 0px;">
      <b-list-group>
        <div v-for="(item, index) in hourList" :key="index">
          <b-list-group-item class="list-group-item" style="height: 100px;">
            {{ item }}
            <b-button v-if="item === 1"
              style="position: relative; height: 1000px; z-index: 30;"
            >
              aaa
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
      hourList: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
      ]
    }
  }
})
</script>

<style scoped>
</style>
