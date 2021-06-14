<template>
  <div class="preface">
    <img :src="logo" alt="" class='preface-logo'>
    <image-swiper :p2="true" :list="list" width="100%" height="199px" key="preface" @slideChanged='slideChanged'>
      <div slot-scope='slide' slot='content'>
        <video :src="slide.slide.materialVO.pathAll" class='video' :ref='`video${index}`' v-if='slide.slide.isVideo'>
            您的浏览器不支持 video 标签。
        </video>
        <img v-else :src="slide.slide.materialVO.pathAll" alt="图片">
      </div>
      <div name='pagination'>{{currentDesc}}</div>
    </image-swiper>
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
  list = [];
  currentDesc: string = '以习近平为团长的中央代表团抵达日喀则地区，收到...';
  slideChanged(index){
    console.log(index)
    // this.currentDesc = this.list[index].materialVO.name
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
  .video{
    width: 100%;
    height: 199px;
  }
}
</style>
