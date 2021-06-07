<template>
  <div class="bigEvent">
    <div class="bigEvent-logo"></div>
    <div class="text-content">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { eventList } from '../mock';
@Component({
  components: {
  }
})
export default class BigEvent extends Vue {
  eventList = [];

  get imgList() {
    return this.eventList.map(item => {
      return { src: item?.content?.img };
    });
  }

  mounted() {
    this.eventList = eventList;
  }
}
</script>
<style>
</style>
<style scoped lang="scss">
.bigEvent {
  .bigEvent-logo {
    height: 96px;
    background: url('@/h5/static/imgs/bigEvent-1x.png') no-repeat center center;
  }
}
</style>
