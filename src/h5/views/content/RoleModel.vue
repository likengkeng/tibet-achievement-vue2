<template>
  <div class="RoleModel">
    <div class='solid'></div>
    <img :src="logo" alt="" class='RoleModel-logo' @click='detail'>

    <van-tabs title-active-color="#BA0C00FF" v-model='navIndex' color='#BA0C00FF' @click="navTab">
      <van-tab v-for="item in navList" :title="item.name" :key='item.name'>
        <div class='content'>
          <div class='mb_50 content_ovh' v-if='list[0]' @click='jump(list[0])'>
            <img class='icon' :src="leaderCareIcon" alt="">
            <div class='flex before_img'>
              <img :src="list[0].articleVO.articleCoverImagePath" alt="" class='article_img'>
              <div>
                <div class='title'>{{list[0].articleVO.articleTitle}}</div>
                <div class='text' v-html='list[0].articleVO.articleContent'>{{}}</div>
              </div>
            </div>
          </div>
          <div class='content_ovh' v-if='list[1]' @click='jump(list[1])'>
            <div class='flex before_img_right'>
              <div class='flex_g1'>
                <div class='title'>{{list[0].articleVO.articleTitle}}</div>
                <div class='text' v-html='list[0].articleVO.articleContent'>{{}}</div>
              </div>
              <img :src="list[0].articleVO.articleCoverImagePath" alt="" class='article_img'>
            </div>
            <div class='icon_right_box'> <img class='icon_right' :src="leaderCareIcon" alt=""></div>
          </div>
          
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import logo from '@/h5/static/imgs/title5.png'
  import $http from '@/h5/api/event';
  import leaderCareIcon from '@/h5/static/imgs/leaderCare_icon.png'

  @Component({
    components: {
    }
  })
  export default class RoleModel extends Vue {
    logo = logo
    leaderCareIcon = leaderCareIcon
    navList = [
      {name: '老西藏', index: 1},
      {name: '优秀共产党员', index: 2},
      {name: '优秀党务工作者', index: 3},
      {name: '先进基层党组织', index: 4},
      {name: '优秀援藏干部人才', index: 5},
      {name: '优秀组工干部', index: 6},
      {name: '最美公务员', index: 7},
    ]
    list = []
    navIndex = 0
    navTab(){
      this.getList()
    }
    getList(){
      $http.powerList({
        organizationPowerMeunType: 2,
        organizationPowerType: this.navIndex + 1
      })
      .then(res => {
        this.list = res.data.data
      })
    }
    detail(){
      this.$router.push({name: 'list', query: {value: 'roleModel'}})
    }
    jump(item){
      // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
      this.$router.push({name: 'article', query: {
        isHistory: this.navIndex == 3,
        item: JSON.stringify(item),
        name: '榜样力量',
        index: 5
      }})

    }
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.RoleModel {
  .solid{
    width: 100%;
    height: 2px;
    border-top: 8px solid #CBA264;
    border-bottom: 2px solid #CBA264;
  }
  .RoleModel-logo {
    width: 180px;
    height: 56px;
    display: block;
    margin: 16px auto 23px;
  }
  .content{
    padding: 5px 15px 45px 10px;
  }
  .content_ovh{
    overflow: hidden;
  }
  .icon{
    width: 50px;
    height: 38px;
    display: block;
    margin-bottom: 10px;
  }
  .icon_right{
    width: 50px;
    height: 38px;
    display: block;

  }
  .icon_right_box{
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-end;
  }
  .article_img{
    width: 174px;
    height: 136px;
    display: block;
    margin: 0px 10px;
    flex-shrink: 0;
  }
  .flex_g1{
    flex-grow: 1;
    text-align: right
  }
  .before_img{
      position: relative;
      height: 146px;
      overflow: hidden;
      padding: 10px 0px 0px 10px
  }
  .before_img::before{
    content: '';
    width: 137px;
    height: 118px;
    position: absolute;
    left: 0px;
    top: 0px;
    border-radius: 4px;
    border-top: 10px solid rgba(254, 157, 10, .3);
    border-left: 10px solid rgba(254, 157, 10, .3);
  }
  .before_img_right{
    position: relative;
    height: 146px;
    overflow: hidden;
    padding: 0px 10px 10px 0px
  }
  .before_img_right::before{
    content: '';
    width: 137px;
    height: 118px;
    position: absolute;
    right: 0px;
    bottom: 0px;
    border-radius: 4px;
    border-bottom: 10px solid rgba(254, 157, 10, .3);
    border-right: 10px solid rgba(254, 157, 10, .3);
  }
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .text{
    font-size: 14px;
  }
  .mb_50{
    margin-bottom: 50px;
  }

}
</style>
