<template>
  <div class="big-event">
    <MyContentHeader :content='content' @click='detail'></MyContentHeader>

    <div class='content'>
      <img :src="icon" class="icon icon1" @click='right'>
      <img :src="icon" class="icon icon2" @click='left'>
      <div class='list_box'>
        <div v-for='(item, index) in list' :key='item.memorabiliaId' class='list' @click='nav(item, index)' :style='{transform: `translateX(-${pageSize*1200}px)`}'>
          <div class='time_box'>
            <div class='year'>{{item.time[0]}}</div>
            <div class='day'>{{item.time[1]}}</div>
          </div>
          <div class='list_center' :class='{select_list_center: item.check}'>
          </div>
          <div class='list_footer' :class='{select_list_footer: item.check}' @click='jump(item)'>
            <video v-if='item.fileType=="mp4"' :src="(item.memorabiliaImagePathAlls||[])[0]" class='img'>
                  您的浏览器不支持 video 标签。
              </video>
              <audio :src="(item.memorabiliaImagePathAlls||[])[0]" controls class='img' v-else-if='item.fileType=="mp3"'>
              您的浏览器不支持 audio 标签。
            </audio>
            <img :src="(item.memorabiliaImagePathAlls||[])[0]" alt="" class='img' v-else>
            <div class='title line_clamp1'>{{item.memorabiliaTitle}}</div>
            <div class='footer_content line_clamp2'>{{item.memorabiliaContent}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TimeLine from '@/common/components/TimeLine.vue';
import $http from '@/pc/api/event';
import { BigEventItem } from 'CustomerTypes';
import MyContentHeader from '@/pc/components/MyContentHeader.vue';
import content from '@/pc/static/imgs/title_3.png'
import icon from '@/pc/static/imgs/icon1.png'
@Component({
  components: {
    TimeLine,MyContentHeader
  },
})
export default class BigEvent extends Vue {
  list: BigEventItem[] = [];
  content: string = content
  icon = icon
  pageSize = 0
  total = 0
  detail(){this.$router.push({name: 'list', query: {value: 'bigEvent', isBigEvent: true}})}
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
  jump(item){
    if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
          window.open(item.articleVO.articleSuperUrl)
          return
      }
    // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
    this.$router.push({name: 'article', query: {
      isHistory: true,
      item: JSON.stringify(item), 
      name: '大事记', 
      index: 3
    }})

  }
  nav(item, index){
    this.list.map(el => {
      el.check = false
      return el
    })
    item.check = true
    this.list.splice(index, 1, item)
  }
  left(){
    console.log(1)
    if (this.pageSize > 0) {
      this.pageSize--
    }
  }
  right(){
    if (this.pageSize < this.total) {
      this.pageSize++
    }
  }
  fileType = ''
  mounted() {
    $http.memorabiliaList()
      .then((res) => {
        console.log(res)
        res?.data?.data?.map(el => {
          el.time = this.format(el.memorabiliaDatetime)
          el.check = false
          const index = el.memorabiliaImagePathAlls[0].lastIndexOf(".")
            const fileType = el.memorabiliaImagePathAlls[0].substr(index + 1)
            el.fileType = fileType
          return el
        })
        res.data.data[0].check = true
        this.list = res.data.data;
        this.total = Math.floor(res.data.data.length / 5)
      })
      .catch(() => {

      });
  }
}
</script>
<style scoped lang="scss">
.big-event {
  background: #FFFFFF;
  width: 1200px;
  margin: auto;
  .content{
    position: relative;
    display: flex;
    .icon{
      position: absolute;
      width: 32px;
      height: 32px;
      display: block;
      top: 147px;
      cursor: pointer;
    }
    .icon1{
      right: -60px;
    }
    .icon2{
      left: -60px;
      transform: rotate(180deg);
    }
    .list_box{
      width: 1200px;
      overflow: hidden;
      display: flex;
    }
    .list{
      cursor: pointer;
      margin-top: 66px;
      flex-shrink: 0;
    }
    .time_box{
      text-align: center;
      margin-bottom: 27px;
      .year{
        font-size: 30px;
      }
      .day{
        font-size: 20px;
        color: #666;
      }
    }
    .list_center{
      margin-bottom: 28px;
      width: 100%;
      height: 8px;
      background: rgba(216, 216, 216, 1);
      position: relative;
    }
    .list_center::before{
      content: '';
      display: block;
      position: absolute;
      top: 0px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 5px solid rgba(216, 216, 216, 1);
      box-sizing: border-box;
      background: #fff;
    }
    .select_list_center::before{
      width: 30px;
      height: 30px;
      // border: 5px solid rgba(176, 21, 22, 0.2);
      border: 0px;
      box-shadow: 0px 0px 0px 5px rgba(176, 21, 22, 0.2);
      background: rgba(176, 21, 22, 1);
    }
    .list_footer{
      width: 232px;
      box-sizing: border-box;
      border: 8px solid #fff;
      padding: 0px 0px 22px;
      margin-right: 10px;
      .img{
        width: 100%;
        height: 140px;
        display: block;
        margin-bottom: 15px;
      }
      .title{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 9px;
        // width: 220px;
        padding: 0px 12px;
        box-sizing: border-box;
      }
      .footer_content{
        // width: 217px;
        font-size: 16px;
        color: #666;
        padding: 0px 12px;
        box-sizing: border-box;
      }
    }
    .select_list_footer{
      border: 8px solid rgba(255, 188, 102, 1);
    }

  }
  .list_box .list:nth-child(5n) .list_footer{
      margin-right: 0px;
    }
  .line_clamp1 {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.line_clamp2 {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
}
</style>
