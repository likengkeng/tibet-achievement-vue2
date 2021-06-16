<template>
  <div class="leaderCare">
    <img :src="logo" alt="" class='leaderCare-logo' @click='detail'>
    <van-tabs title-active-color="#BA0C00FF" color='#BA0C00FF' v-model='navIndex' @click="navTab">
      <van-tab v-for="item in navList" :title="item.name" :key='item.name'>
        <van-swipe>
          <van-swipe-item v-for='(item, index) in imgList' :key="index">
            <img :src="item" class='img' alt="图片">
          </van-swipe-item>
          <template #indicator>
            <div class="custom_indicator">
              <div v-for='(item, index) in imgList' class='page' :class='{current_page: navIndex == index}'></div>
            </div>
          </template>
        </van-swipe>
        <div class='article_list' v-for='item in list' :key='item[key].articleId || item[key].leaderCareId' @click='jump(item)'>
          <div class='article_list_header line_clamp1'>
            <span v-if='navIndex==3'>{{item[key].leaderName}}</span>
            <span v-else>{{item[key].articleTitle}}</span>
          </div>
          <div class='article_list_time'>{{item[key].createDatetime}}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import $http from '@/h5/api/event';
  import logo from '@/h5/static/imgs/title2.png'

  @Component({
    components: {
    }
  })
  export default class LeaderCare extends Vue {
    logo = logo
    imgList = [];
    navList = [
      {name: '中央领导关怀', index: 0},
      {name: '自治区党委书记', index: 1},
      {name: '历任组织部部长', index: 2},
    ]
    navIndex = 0
    list = []
    key = 'articleVO'
    navTab(item){
      if (item == 2) {
        this.key = 'leaderVO'
      } else {
        this.key = 'articleVO'
      }
      this.getList()
    }
    getList(){
      $http.leaderList({leaderCareType: this.navIndex+1})
      .then(res => {
        res.data.data.map(el => {
          this.imgList.push(el[this.key].articleCoverImagePath)
          el[this.key].createDatetime = this.format(el[this.key].createDatetime)
          return el
        })
        this.list = res.data.data
      })
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
      return `${y}-${m}-${d} ${h}:${mm}:${s}`
    }
    detail(){this.$router.push({name: 'list', query: {value: 'leaderCare'}})}

    jump(item){
      if (this.navIndex == 3) {
        this.$router.push({name: 'minister'})
      } else {
        this.$router.push({name: 'article', query: {
          isHistory: this.navIndex == 3, 
          item: JSON.stringify(item), 
          name: '领导关怀', 
          index: 2
        }})
      }
  }
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.leaderCare {
  background: #fff;
  padding-top: 23px;
  margin-bottom: 13px;
  .leaderCare-logo {
    width: 212px;
    height: 60px;
    display: block;
    margin: 0px auto 16px;
  }
  .img{
    width: 100%;
    height: 199px;
    margin: 9px 0px 2px
  }
  .article_list{
    padding: 11px 20px 11px 0px;
    border-bottom: 1px solid #EEEEEEFF;

    .article_list_header{
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 6px;
      position: relative;
      padding-left: 36px
    }
    .article_list_time{
      font-size: 14px;
      color:#999;
      padding-left: 36px
    }
  }
  .article_list_header::before{
    content: '';
    width:7px;
    height: 7px;
    border-radius: 50%;
    background: #BA0C00FF;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 17px
  }

}
</style>
