<template>
  <div class="bigEvent">
    <div class="bigEvent-logo"></div>
    <div class="text-content relative">
      <div class="line"></div>
      <div class="date">2020年6月29号</div>
      <img src="@/h5/static/imgs/test01.jpg" class="img"></img>
      <h4 class="title">大标题</h4>
      <p class="desc">
        况一机非克学此率原资群心集新车重团就资该观农素方切值拉极们眼节再响然取老作的价都农导维信己知革心不。收必时给说高存容话当手么二斯计江品金转。
      </p>
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
  .text-content {
    margin-top: 60px;
    .img {
      height: 246px;
      width: 100%;
    }
    .line {
      height: 4px;
      content: "";
      width: 100%;
      background-color: #FFC9C9;
      position: absolute;
      top: -22px;
      z-index: 100;
    }
  }
  .text-content::before {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    position: absolute;
    top: -30px;
    left: 50%;
    border-radius: 50%;
    background: #BA0C00;
    z-index: 101;
  }
}
</style>
