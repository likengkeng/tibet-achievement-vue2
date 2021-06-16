<template>
  <div class="preface">
    <img :src="logo" alt="" class='preface-logo'>
    <van-swipe @change="onChange">
      <van-swipe-item v-for='(item, index) in list' :key="index">
        <video :src="item.materialVO.pathAll" class='video' :ref='`video${index}`' v-if='item.isVideo'>
            您的浏览器不支持 video 标签。
        </video>
        <img v-else :src="item.materialVO.pathAll" class='img' alt="图片">
        <div class='van_name'>{{item.materialVO.name}}</div>
      </van-swipe-item>
      <template #indicator>
        <div class="custom_indicator">
          <div v-for='(item, index) in list' class='page' :class='{current_page: current == index}'></div>
        </div>
      </template>
    </van-swipe>
    <div class='solid'></div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import ImageSwiper from '@/common/components/MySwiper.vue';
  import logo from '@/h5/static/imgs/title1.png'
  import $http from '@/pc/api/event';

  @Component({
    components: {
      ImageSwiper,
    }
  })
  export default class Preface extends Vue {
    logo = logo
    list = [];
    current = 1
    onChange(index) {
      this.current = index;
    }
    getList(){
      $http.prefaceList({prefaceType: 1})
      .then(res => {
        res?.data?.data?.map(el => {
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
  .solid{
    width: 100%;
    height: 2px;
    border-top: 8px solid #CBA264;
    border-bottom: 2px solid #CBA264;
  }
  .preface-logo {
    width: 93px;
    height: 59px;
    display: block;
    margin: 0px auto 9px;
  }
  .video{
    width: 100%;
    height: 199px;
    display: block
  }
  .van_name{
    padding: 11px
  }
  .custom_indicator{
    display: flex;
    justify-content: center;
    width:100%;
    position: absolute;
    bottom: 51px;
    left: 0px;
    .page{
      width: 8px;
      height: 8px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.8);
      margin-right: 5px
    }
    .current_page {
      width: 15px;
      background: rgba(255, 255, 255, 1);
    }
  }
  .custom_indicator .page:last-child{
    margin-right: 0px
  }
}
</style>
