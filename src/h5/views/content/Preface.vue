<template>
  <div class="preface">
    <div class="preface-logo"></div>
    <image-swiper :list="imgList" width="100%" height="375px"></image-swiper>
    <div class="text-content">
      {{ currentDesc }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ImageSwiper from '@/common/components/MySwiper.vue';
@Component({
  components: {
    ImageSwiper,
  }
})
export default class Preface extends Vue {
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
  currentDesc: string = '以习近平为团长的中央代表团抵达日喀则地区，收到...';
}
</script>
<style scoped lang="scss">
.preface {
  .preface-logo {
    height: 96px;
    background: url('@/h5/static/imgs/preface-1x.png') no-repeat center center;
  }
  .text-content {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    padding-left: 20px;
  }
}
</style>
