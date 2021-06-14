<template>
  <div class="preface">
    <img :src="logo" alt="" class='preface-logo'>
    <image-swiper :p2="true" :list="list" width="100%" height="375px" key="preface" @slideChanged='slideChanged'>
      <template slot-scope='slide'>
        <video name='content' :src="slide.materialVO.pathAll" class='video' :ref='`video${index}`' v-if='slide.isVideo'>
            您的浏览器不支持 video 标签。
        </video>
      </template>
      
      <div name='pagination'>测试</div>
    </image-swiper>
    <div class="text-content">
      {{ currentDesc }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ImageSwiper from '@/common/components/MySwiper.vue';
import logo from '@/h5/static/imgs/preface-1x.png'
import $http from '@/pc/api/event';

@Component({
  components: {
    ImageSwiper,
  }
})
export default class Preface extends Vue {
  logo = logo
  list = [
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
  slideChanged(index){
    console.log(index)
  }
  getList(){
    $http.prefaceList({prefaceType: 1})
    .then(res => {
      console.log(res)
      res.data.data.map(el => {
        el.isVideo = false
        if (el.materialVO.stffix == 'mp4') {
          el.isVideo = true
        }
        return el
      })
      this.list = res.data.data
    })
  }
  mounted() {
    this.getList()
  }
}
</script>
<style scoped lang="scss">
.preface {
  background: #fff;
  padding-top: 28px;
  .preface-logo {
    width: 93px;
    height: 59px;
    display: block;
    margin: 0px auto 9px;
  }
  .text-content {
    height: 44px;
    line-height: 44px;
    font-size: 15px;
    padding-left: 20px;
  }
}
</style>
