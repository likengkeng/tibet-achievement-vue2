<template>
  <div class="RoleModel">
    <div class='solid'></div>
    <img :src="logo" alt="" class='RoleModel-logo'>

    <van-tabs title-active-color="#BA0C00FF" color='#BA0C00FF' @click="navTab">
      <van-tab v-for="item in navList" :title="item.name" :key='item.name'>
        <div class='content'>
          <div>
            <img class='icon' :src="leaderCareIcon" alt="">
            <div class='flex'>
              <img :src="list[0].articleVO.articleCoverImagePath" alt="" class='article_img'>
              <div>
                <div class='title'>{{list[0].articleVO.articleTitle}}</div>
                <div class='text'>{{list[0].articleVO.articleContent}}</div>
              </div>
            </div>
          </div>
          <div>
            <img class='right_icon' :src="leaderCareIcon" alt="">
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import ContentHeader from './ContentHeader.vue';
  import logo from '@/h5/static/imgs/title5.png'
  import $http from '@/pc/api/event';
  import leaderCareIcon from '@/h5/static/imgs/leaderCare_icon.png'

  @Component({
    components: {
      ContentHeader,
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
    navIndex = 1
    navTab(){}
    getList(){
      $http.powerList({
        organizationPowerMeunType: 2,
        organizationPowerType: this.navIndex
      })
      .then(res => {
        this.list = res.data.data
      })
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
    padding: 5px 10px;
  }
  .icon{
    width: 50px;
    height: 38px;
    display: block;
    margin-bottom: 10px;
  }
}
</style>
