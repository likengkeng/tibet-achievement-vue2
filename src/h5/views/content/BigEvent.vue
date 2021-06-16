<template>
  <div class="bigEvent">
    <div class='solid'></div>
    <img :src="logo" alt="" class='bigEvent-logo'>
    <div class='list_box'>

      <div v-for='item in list' :key='item.memorabiliaId' class='list'>
        <div class='time1'>{{item.time[0]}}</div>
        <div class='time2'>{{item.time[0]}}</div>
        <div class='division'></div>
        <div class='padding_lf13'>
          <div class='img_box'>
            <img :src="item.memorabiliaImagePathAlls[0]" alt="" class='img'>
            <img :src="rightIcon" alt="" class='right_icon'>
            <img :src="rightIcon" alt="" class='right_icon left_icon'>

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
  import $http from '@/pc/api/event';
  @Component({})
  export default class BigEvent extends Vue {
    list = [];
    logo = logo
    rightIcon = rightIcon
    getList(){
      $http.memorabiliaList()
        .then((res) => {
          res.data.data.map(el => {
            el.time = this.format(el.memorabiliaDatetime)
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
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
  .bigEvent {
    padding: 26px 0px 30px;
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
            cursor: pointer;
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
            margin-bottom: 10px
          }
          .list_text{
            font-size: 14px;
          }
        }

      }
    }
  }
</style>
