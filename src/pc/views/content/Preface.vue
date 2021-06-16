<template>
  <div class="preface">
    <MyContentHeader :content='content' @click='detail'></MyContentHeader>
    <div class='list_box'>
        <img @click='leftBtn' :src="left_icon" alt="" class='icon left'>
        <img @click='rightBtn' :src="right_icon" alt="" class='icon right'>

      <div v-for='(item, index) in list' :key='item.prefaceId' class='list' :style='{transform: `translateX(-${pageSize*100}%)`}'>
        <img v-show='isShowPlay' :src="play" alt="" class='play'  v-if='item.isVideo' @click='playVideo(index)'>
        <video :src="item.materialVO.pathAll" class='video' :id="'videoPlay'+index" :ref='`video${index}`' v-if='item.isVideo'>
          您的浏览器不支持 video 标签。
        </video>
        <img v-else :src="item.materialVO.pathAll" alt="" class='list_img'>
        <div class='content'>
          <div>{{item.materialVO.name}}</div>
          <div class='carousel_btn_box'>
            <div class='carousel_btn' @click='selectChange(index)' :class='{select: index == pageSize}' v-for='(item, index) in list' :key='item.articleId'></div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'video.js/dist/video-js.css';
import '@/pc/static/styles/video-custom.css';
import { videoPlayer } from 'vue-video-player';
import content from '@/pc/static/imgs/title_1.png'
import play from '@/pc/static/imgs/play.png'
import MyContentHeader from '@/pc/components/MyContentHeader.vue';
import right_icon from '@/pc/static/imgs/right_icon.png'
import left_icon from '@/pc/static/imgs/left_icon.png'
import $http from '@/pc/api/event';

@Component({
  components: {
    videoPlayer,MyContentHeader
  }
})
export default class Preface extends Vue {
  play=play
  playerOptionsDefault = {
    // videojs options
    muted: true,
    language: 'en',
    height: '568',
    width: '100%',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [{
      type: 'video/mp4',
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
    }],
    // poster: '/static/imgs/author.jpg',
  }
  left_icon = left_icon
  right_icon = right_icon
  playerOptions = {};
  
  content = content
  list = []
  pageSize = 0
  isShowPlay = true
  playVideo(index){
      var vdo = document.getElementById(`videoPlay${index}`);
      vdo.play();
      this.isShowPlay = false
  }
  selectChange(index){
    this.isShowPlay = true
    this.list.forEach((el, index) => {
      var vdo = document.getElementById(`videoPlay${index}`);
      vdo.pause();
    })
    this.pageSize = index
  }
  leftBtn(){
    console.log(this.pageSize)
    if (this.pageSize == 0) {
      return
    }
    this.pageSize -= 1
  }
  rightBtn(){
    console.log(this.pageSize)
    if (this.pageSize == this.list.length-1) {
      return
    }
    this.pageSize += 1
  }
  get player() {
    return this.$refs.videoPlayer.player;
  }
  detail(){
    this.$router.push({name: 'list', query: {value: 'preface'}})
  }
  getData() {
    this.playerOptions = { ...this.playerOptionsDefault };
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
    this.$nextTick(() => {
      this.getData();
    })
  }

  onPlayerPlay(player) {
    // console.log('player play!', player)
  }
  onPlayerPause(player) {
    // console.log('player pause!', player)
  }
  // ...player event

  // or listen state event
  playerStateChanged(playerCurrentState) {
    // console.log('player current update state', playerCurrentState)
  }

  // player is ready
  playerReadied(player) {
    console.log('the player is readied', player)
    // you can use it to do something...
    // player.[methods]
  }
}
</script>
<style scoped lang="scss">
.preface {
  width: 1200px;
  margin: auto;
  .list_box{
    width: 1200px;
    overflow: hidden;
    display: flex;
    position: relative;
    .video{
      width: 100%;
      height: 568px;
    }
    .icon{
        width: 46px;
        height: 36px;
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
      }
      .right{
        right: 0px;
      }
      .left{
        left: 0px;
      }
    .list{
      width: 1200px;
      flex-shrink: 0;
      position: relative;
      transition: .5s;
      .list_img{
        height: 568px;
        display: block;
      }
      .content{
        position: absolute;
        z-index: 9;
        bottom: 0px;
        width: 100%;
        padding: 13px 24px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, 0.5);
        font-size: 18px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .carousel_btn_box{
          display: flex;
          .carousel_btn{
            display: flex;
            margin-left: 10px;
            border-radius: 10px;
            width: 10px;
            height: 10px;
            background: rgba(255, 255, 255, 0.6);
          }
          .select{
            width: 20px;
            background: #fff;
          }
        }
        
      }
    }
  }
  
}
.play{
  position: absolute;
  top: 50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 102px;
  height: 102px;
  cursor: pointer;
  z-index: 111
}
::v-deep .vjs-has-started .vjs-control-bar{
  display: none;
}
</style>
