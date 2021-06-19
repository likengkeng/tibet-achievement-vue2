<template>
  <div class="bigEvent">
    <div class='solid'></div>
    <img :src="logo" alt="" class='bigEvent-logo' @click='detail'>
    <div class='list_box'>
      
      <div v-for='item in list' :key='item.memorabiliaId' class='list' :style='{transform: `translateX(-${pageSize*100}%)`}'>
        <div class='time1'>{{item.time[0]}}</div>
        <div class='time2'>{{item.time[0]}}</div>
        <div class='division'></div>
        <div class='padding_lf13' @click.stop='jump(item)'>
          <div class='img_box'>
            <video v-if='item.fileType=="mp4"' :src="(item.memorabiliaImagePathAlls||[])[0]" class='img'>
                  您的浏览器不支持 video 标签。
              </video>
              <audio :src="(item.memorabiliaImagePathAlls||[])[0]" controls class='img' v-else-if='item.fileType=="mp3"'>
              您的浏览器不支持 audio 标签。
            </audio>
            <img :src="(item.memorabiliaImagePathAlls||[])[0]" alt="" class='img' v-else>
            <img :src="rightIcon" alt="" class='right_icon' @click.stop='rightBtn'>
            <img :src="rightIcon" alt="" class='right_icon left_icon' @click.stop='leftBtn'>
          </div>
          <div class='list_title'>{{item.memorabiliaTitle}}</div>
          <div class='list_text'>{{item.memorabiliaContent}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import logo from '@/h5/static/imgs/title3.png'
  import rightIcon from '@/h5/static/imgs/right_icon.png'
  import $http from '@/h5/api/event';
  @Component({})
  export default class BigEvent extends Vue {
    list = [];
    logo = logo
    rightIcon = rightIcon
    pageSize = 0
    fileType = ''
    getList(){
      $http.memorabiliaList()
        .then((res) => {
          res?.data?.data?.map(el => {
            el.time = this.format(el.memorabiliaDatetime)
            const index = el.memorabiliaImagePathAlls[0].lastIndexOf(".")
            const fileType = el.memorabiliaImagePathAlls[0].substr(index + 1)
            el.fileType = fileType
            return el
          })
        this.list = res.data.data;
        })
        .catch(() => {

        });
    }
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

      var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
      var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      return [`${y}年`, `${m}月${d}日`]
      // return `${y}年${m}月${d}日 ${h}:${mm}:${s}`
    }
    rightBtn(){
      if (this.pageSize >= this.list.length - 1) {
        return
      }
      this.pageSize++
    }
    leftBtn(){
      if (this.pageSize == 0) {
        return
      }
      this.pageSize--
    }
    jump(item){
      if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
          window.open(item.articleVO.articleSuperUrl)
          return
      }
      // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
      this.$router.push({name: 'article', query: {
        item: JSON.stringify(item), 
        name: '大事记', 
        index: 3,
        isHistory: true,
      }})

    }
    detail(){this.$router.push({name: 'bigEventList', query: {value: 'bigEvent'}})}
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
  .bigEvent {
    padding: 26px 0px 30px;
    width: 100vw;
    overflow: hidden;
    .solid{
      width: 100%;
      height: 2px;
      border-top: 8px solid #CBA264;
      border-bottom: 2px solid #CBA264;
      margin-bottom: 26px
    }
    .bigEvent-logo {
      width: 148px;
      height: 54px;
      display: block;
      margin: 0px auto 45px;
    }
    .list_box{
      display: flex;
      position: relative;
      .list{
        width: 100vw;
        flex-shrink: 0;
        transition: .5s;
        .time1{
          font-size: 22px;
          color: #662C00FF;
          text-align: center
        }
        .time2{
          font-size: 14px;
          color: #662C00FF;
          margin-bottom: 6px;
          text-align: center
        }
        .division{
          background: #FFC9C9;
          opacity: 0.43;
          width: 100%;
          height: 6px;
          position: relative;
          margin: 12px 0px 30px;
        }
        .division::before{
          content: '';
          width: 16px;
          height: 16px;
          background: #BA0C00FF;
          border: 2px solid rgba(186, 12, 0, .14);
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%)
        }
        .padding_lf13{
          padding: 0px 13px;
          .img_box{
            position: relative;
          }
          .right_icon{
            width: 32px;
            height: 32px;
            position: absolute;
            right: 5px;
            top: 50%;
            transform: translateY(-50%)
          }
          .left_icon{
            left: 5px;
            transform: translateY(-50%) rotate(180deg)
          }
          .img{
            width: 100%;
            height: 246px;
            display: black;
            margin-bottom: 11px
          }
          .list_title{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
          }
          .list_text{
            font-size: 14px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: '40px'
          }
        }

      }
    }
  }
</style>
