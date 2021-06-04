<template>
  <div class="leader-care">
    <div class="image">
      <image-swiper :list="imgList"></image-swiper>
    </div>
    <div class="content">
      <ul class="content-type">
        <li>中央领导关怀</li>
        <li>自治区党委书记</li>
        <li>历任组织部部长</li>
      </ul>
      <div class="content-list">
        <ul>
          <li>
            <span class="title">中央领导关怀-习近平拜访各族人民</span>
            <span>2021-05-09</span>
          </li>
        </ul>
      </div>
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
export default class LeaderCare extends Vue {
  currentImage: string = '/static/imgs/test01.jpg';
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
}
</script>
<style scoped lang="scss">
.leader-care {
  background: #b9b6e2;
  height: 657px;
  position: relative;
  .image {
    width: 40%;
    height: 100%;
    float: left;
    margin-top: 40px;
  }
  .content {
    width: 50%;
    height: 100%;
    float: left;
    margin-top: 40px;
    .content-type {
      li {
        display: inline-block;
        width: 150px;
        height: 48px;
      }
    }
    .content-list {
      .title {
        width: 40%;
        display: inline-block;
      }
    }
  }
}
</style>
