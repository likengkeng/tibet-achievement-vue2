<template>
  <div class="leaderCare">
    <div class="leaderCare-logo"></div>
    <image-swiper :list="imgList" width="100%" height="375px" key="leaderCare"></image-swiper>
    <ul class="text-content">
      <li v-for="item in leaderCareList" :key="item.id" class="content-item">
        <p>{{ item.content }}</p>
        <div class="date">{{ item.date }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ImageSwiper from '@/common/components/MySwiper.vue';
import { leaderCareList } from '../mock';
@Component({
  components: {
    ImageSwiper,
  }
})
export default class LeaderCare extends Vue {
  imgList = [
    {
      src: '/static/imgs/test01.jpg',
    },
    {
      src: '/static/imgs/test02.jpg',
    },
    {
      src: '/static/imgs/test03.jpg',
    },
  ];
  leaderCareList = [];

  mounted() {
    this.leaderCareList = leaderCareList;
  }
}
</script>
<style scoped lang="scss">
.leaderCare {
  .leaderCare-logo {
    height: 96px;
    background: url('@/h5/static/imgs/leaderCare-1x.png') no-repeat center center;
  }
  .content-item {
    padding-left: 20px;
    p:before {
      content: '';
      display: inline-block;
      width: 7px;
      height: 7px;
      background-color: #BA0C00;
      vertical-align: middle;
      margin-right: 7px;
      border-radius: 7px;
    }
    .date {
      padding-left: 22px;
      color: #999999
    }
  }
}
</style>
