<template>
  <div class="organizeWork">
    <div class='solid'></div>
    <img :src="logo" alt="" class='organizeWork-logo'>

    <van-tabs title-active-color="#BA0C00FF" color='#BA0C00FF' @click="navTab">
      <van-tab v-for="item in navList" :title="item.text" :key='item.text'>
        <div class='content'>
           <div class='content_top'>
            <div class='left' v-if='list[0]'>
              <img :src="(list[0].articleVO || {}).articleCoverImagePath" alt="" class='img'>
              <div class='pd'>
                <div class='title line_clamp1'>{{ (list[0].articleVO || {}).articleTitle }}</div>
                <div class='text line_clamp2' v-html='(list[0].articleVO || {}).articleContent'>{{(list[1].articleVO || {}).articleContent}}</div>
              </div>
            </div>
            <div class='right' v-if='list[1]'>
              <img :src="(list[1].articleVO || {}).articleCoverImagePath" alt="" class='img'>
              <div class='pd'>
                <div class='title line_clamp1'>{{ (list[1].articleVO || {}).articleTitle }}</div>
                <div class='text line_clamp2' v-html='(list[1].articleVO || {}).articleContent'>{{(list[1].articleVO || {}).articleContent}}</div>
              </div>
            </div>
          </div>
          <div class='content_bottom' v-if='list[2]'>
            <img :src="(list[2].articleVO || {}).articleCoverImagePath" alt="" class='img'>
            <div class='title line_clamp1'>{{ (list[2].articleVO || {}).articleTitle }}</div>
            <div class='text line_clamp2' v-html='(list[2].articleVO || {}).articleContent'>{{(list[2].articleVO || {}).articleContent}}</div>
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
import logo from '@/h5/static/imgs/title4.png'
import $http from '@/pc/api/event';
@Component({
  components: {
    ContentHeader,
  }
})
export default class OrganizeWork extends Vue {
  logo = logo
  navList = [
    {
      text: '党的政治建设',
      value: 'politicalBuilding',
      index: 1
    },
    {
      text: '干部工作',
      value: 'cadreWork',
      index: 2
    },
    {
      text: '党的组织建设',
      value: 'organizationBuilding',
      index: 3
    },
    {
      text: '人才工作',
      value: 'talentWork',
      index: 4
    },
    {
      text: '干部人才援藏工作',
      value: 'helpTibetWork',
      index: 5
    },
    {
      text: '自身建设',
      value: 'selfConstruction',
      index: 6
    },
  ]
  list = []
  navIndex = 1
  navTab(){}
  getList(){
    $http.powerList({
      organizationPowerMeunType: 1,
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
.organizeWork {
  .solid{
    width: 100%;
    height: 2px;
    border-top: 8px solid #CBA264;
    border-bottom: 2px solid #CBA264;
  }
  .organizeWork-logo {
    width: 180px;
    height: 56px;
    display: block;
    margin: 16px auto 23px;
  }
  .content{
    padding: 22px 7px 12px
  }
  .content_top{
    display: flex;
    margin-bottom: 7px
  }
  .left{
    margin-right: 12px;
    background: #fff;
    width: 50%;
    border-radius: 4px;
  }
  .right{
    background: #fff;
    width: 50%;
    border-radius: 4px;
  }
  .img{
    width: 100%;
    height: 140px;
    display: block;
    margin-bottom: 14px
  }
  .pd{
    padding: 0px 11px 13px
  }
  .title{
    font-size: 16px;
    font-weight: 600;
  }
  .text{
    font-size: 14px;
  }
  .content_bottom{
    padding: 9px;
    background: #fff;
    border-radius: 4px;
  }
}
</style>
