<template>
  <div class="list">
    <my-header></my-header>
    <div class='content_box'>
        <div class='content'>
            <div class='list_box'>
                <img @click='leftBtn' :src="left_icon" alt="" class='icon left'>
                <img @click='rightBtn' :src="right_icon" alt="" class='icon right'>

                <div v-for='item in list' :key='item' class='videolist' :style='{transform: `translateX(-${pageSize*100}%)`}'>
                    <video-player
                    class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"
                    customEventName="customstatechangedeventname">
                    </video-player>
                    <div class='content'>
                    <div>以习近平为团长的中央代表团抵达日喀则地区，受到各族群众热烈欢迎！</div>
                    <div class='carousel_btn_box'>
                        <div class='carousel_btn' @click='selectChange(index)' :class='{select: index == pageSize}' v-for='(item, index) in list' :key='index'></div>
                    </div>
                    </div>
                </div>
            </div>
            <div class='content_bottom'>
                <div class='nav'>
                    <div class='nav_btn' :class='{nav_btn_check: item.value == navIndex}' v-for='item in navList' :key='item.name' @click='navCheck(item)'>{{item.name}}</div>
                </div>
                <div class='data_list'>
                    <div v-for='item in dataList' :key='item' class='data_list_content' @click='jump(item)'>
                        <img :src="right_icon" alt="" class='data_list_img'>
                        <div clas='data_list_title'>林芝市米林县开展军地联脸···</div>
                        <div class='data_list_text'>林芝市米林县开展军地联合巡逻演示动</div>
                        <div class='data_list_time'>2020.06.29</div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyHeader from '@/pc/components/MyHeader.vue';
import right_icon from '@/pc/static/imgs/right_icon.png'
import left_icon from '@/pc/static/imgs/left_icon.png'
import 'video.js/dist/video-js.css';
import '@/pc/static/styles/video-custom.css';
import { videoPlayer } from 'vue-video-player';
@Component({
  components: {
      MyHeader,videoPlayer
  },
})
export default class List extends Vue {
  playerOptionsDefault = {
    // videojs options
    muted: true,
    language: 'en',
    height: '540',
    width: '100%',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [{
      type: 'video/mp4',
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
    }],
  }
  left_icon = left_icon
  right_icon = right_icon
  playerOptions = {};
  list = [1,2,3,4,5]
  pageSize = 0
  dataList = [1,2,3,4,5,6,7,8,9,0]
  navList = [
      {name: '中央领导关怀'},
      {name: '自治区党委书记'},
      {name: '历任组织部部长'},
  ]
  navIndex = ''
  selectChange(index){
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

  navCheck(item){}
  jump(item){
      this.$router.push({name: 'article', query: {item: JSON.stringify(item)}})
  }
  mounted(){
    this.$nextTick(() => {
        this.playerOptions = { ...this.playerOptionsDefault };
    })
  }
}
</script>

<style scoped lang="scss">
    .list{
        padding: 25px 0px;
        .content_box{
            background-image: url('/src/pc/static/imgs/detail-background.png');
            background-size: 100% 1154px;
            background-repeat: no-repeat;
            .content{
                width: 1200px;
                margin: auto;
                padding: 25px 32px;
                background: #fff;
                .list_box{
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    position: relative;
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
                    .videolist{
                    width: 100%;
                    flex-shrink: 0;
                    position: relative;
                    transition: .5s;
                    
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
                .content_bottom{
                    .nav{
                        display: flex;
                        border-top: 8px solid rgba(176, 21, 22, 1);
                        background: rgba(239, 208, 208, 1);
                        margin-top: 30px;
                        .nav_btn{
                            padding: 12px 38px 14px;
                            color: rgba(176, 21, 22, 1);
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .nav_btn_check{
                            color: #fff;
                            background: rgba(176, 21, 22, 1);
                        }
                    }
                    .data_list .data_list_content:nth-child(4n){
                        margin-right: 0px;
                    }
                    .data_list{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 38px 32px;
                        .data_list_content{
                            padding: 10px 10px 29px;                       
                            box-shadow: 0px 2px 18px 0px rgba(211, 211, 211, 0.5);
                            background: #FFFFFF;
                            border-radius: 4px;
                            margin: 0px 12px 14px 0px;
                            cursor: pointer;
                            .data_list_img{
                                width: 255px;
                                height: 176px;
                                display: block;
                            }
                            .data_list_title{
                                font-size: 18px;
                                font-weight: bold;
                                color: #666;
                                margin: 6px 0px 10px;
                            }
                            .data_list_text{
                                font-size: 14px;
                                color: #666;
                                margin-bottom: 13px;
                            }
                            .data_list_time{
                                font-size: 14px;
                                color: #666;
                            }
                        }
                    }
                }
                
            }
        }
    }
</style>
