<template>
  <div class="SevenGroup">
    <div class='solid'></div>
    <img :src="logo" alt="" class='SevenGroup-logo' @click='detail'>
    <van-tabs v-model='navIndex' title-active-color="#BA0C00FF" color='#BA0C00FF' @click="navTab">
      <van-tab v-for="item in navList" :title="item.name" :key='item.name'>
      </van-tab>
    </van-tabs>
    <div class='list_box' v-if='!!list.length'>
      <!--<div class='icon_box'>
        <img :src="rightIcon" alt="" class='right_icon' @click='rightBtn'>
        <img :src="rightIcon" alt="" class='left_icon' @click='leftBtn'>
      </div>-->
      
      <carousel-3d ref='carousel' :width="260" :height="175" :autoplay="false" :controlsVisible='true' :onSlideChange='onSlideChange'>
    　　<slide v-for="(slide, i) in list" :key="i" :index="i">
    　　　　<template slot-scope="{ index, isCurrent, leftIndex, rightIndex}">
    　　　　　　<img
                @click='nav(slide,i)'
                class='img3d'
    　　　　　　:data-index="index"
    　　　　　　:class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >=0)}"
    　　　　　　:src="slide.areaVoiceCoverImagePath"
    　　　　　　>
    　　　</template>
    　　</slide>
      </carousel-3d>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import logo from '@/h5/static/imgs/title6.png'
  import $http from '@/h5/api/event';
  import { Carousel3d, Slide } from 'vue-carousel-3d'
  import rightIcon from '@/h5/static/imgs/right_icon.png'


  @Component({
    components: {
      Carousel3d, Slide
    }
  })
  export default class SevenGroup extends Vue {
    logo = logo
    list = []
    name = 'assa'
    navList = [
      {name: '拉萨', check: true, path: ''},
      {name: '日喀则',  check: false, path: ''},
      {name: '山南',  check: false, path: ''},
      {name: '林芝', check: false, path: ''},
      {name: '昌都',  check: false, path: ''},
      {name: '那曲',  check: false, path: ''},
      {name: '阿里',  check: false, path: ''},
    ]
    navIndex = 0
    navTab(index){
      console.log(this.$refs.carousel)
      this.$refs.carousel.currentIndex = index
    }
    getList(){
      $http.voiceList({
        areaVoiceType: 1
      })
      .then(res => {
        console.log(res)
        res.data.data.map(el => {
          el.check = false
          return el
        })
        res.data.data[0].check = true
        this.list = res.data.data
      })
    }
    detail(){this.$router.push({name: 'list', query: {value: 'sevenGroup'}})}
    nav(item, index){
      sessionStorage.setItem("myqidi",index+1)
      this.$router.push({name: 'list', query: {value: 'sevenGroup', index: index+1}})
    }
    onSlideChange(index){
      console.log(index)
      this.navIndex = index
    }
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.SevenGroup {
  margin-bottom: 22px;
  .solid{
    width: 100%;
    height: 2px;
    border-top: 8px solid #CBA264;
    border-bottom: 2px solid #CBA264;
  }
  .SevenGroup-logo{
    width: 178px;
    height: 52px;
    display: block;
    margin: 27px auto 37px
  }
  .list_box{
    position: relative;
    .img3d{
      width: 260px;
      height: 175px;
      margin: 0px 5px
    }
    .icon_box{
      position: absolute;
      top: 50%;
      height: 0;
      margin-top: -30px;
      left: 0;
      width: 100%;
      z-index: 999;
    }
    .right_icon{
      position: absolute;
      z-index: 1009;
      top: 0;
      width: 32px;
      height: 32px;
      left: 10px;
    }
    .left_icon{
      position: absolute;
      z-index: 1009;
      top: 0;
      width: 32px;
      height: 32px;
      right: 10px;
      transform: rotate(180deg)
    }
  }
  .title{
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    margin-top: 18px;
    height: 62px;
  }
}
// ::v-deep .carousel-3d-container{
//   height: 255px!important
// }
// ::v-deep .carousel-3d-slider{
//   width: 260px!important
// }
::v-deep .carousel-3d-slide{
  width: 260px!important;
  background: transparent;
  border-color: transparent;
}
// ::v-deep .next,.prev{
//   opacity: 0
// }
</style>
