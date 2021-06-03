<template>
  <div class="big-event">
    大事件
    <time-line :list="bigEventList"></time-line>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TimeLine from '@/common/components/TimeLine.vue';
import $http from '@/pc/api/event';
import { eventList } from '../mock';

@Component({
  components: {
    TimeLine,
  },
})
export default class BigEvent extends Vue {
  bigEventList: Array<{[key: string]: any}> = [];

  mounted() {
    $http.getBigEventList()
      .then((res) => {
        // bigEventList = res;
      })
      .catch(() => {

      });
    this.bigEventList = eventList;
  }
}
</script>
<style scoped lang="scss">
.big-event {
  background: #FFFFFF;
  height: 657px;
}
</style>
