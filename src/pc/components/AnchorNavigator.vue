<template>
  <div class="anchor-nav">
    <ul class="text-center">
      <li
        v-for="(menu, index) in menuList"
        :key="index"
        :class="{active: menu.value==selectValue}"
        @click="selectMenu(menu)">
        <a>{{ menu.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { MenuItem } from 'CommonTypes';

@Component({
  props: {
  },
})
export default class AnchorNavigator extends Vue {
  declare current: MenuItem;
  menuList = [
    {
      text: '首页',
      value: 'indexPage',
      myroute: {name: 'home'}
    },
    {
      text: '序言',
      value: 'preface',
      myroute: {name: 'list', query: {value: 'preface'}}
    },
    {
      text: '领导关怀',
      value: 'leaderCare',
      myroute: {name: 'list', query: {value: 'leaderCare'}}
    },
    {
      text: '大事件',
      value: 'bigEvent',
      myroute: {name: 'list', query: {value: 'bigEvent'}}
    },
    {
      text: '组织工作',
      value: 'organizeWork',
      myroute: {name: 'list', query: {value: 'organizeWork'}}
    },
    {
      text: '榜样力量',
      value: 'roleModel',
      myroute: {name: 'list', query: {value: 'roleModel'}}
    },
    {
      text: '七地组声',
      value: 'sevenGroup',
      myroute: {name: 'list', query: {value: 'sevenGroup'}}
    },
  ];
  selectValue = ''
  isActive(menu) {
    // return this.current.value === menu.value;
  }
  selectMenu(item) {
    if (this.$route.name == 'list') {
      this.selectValue = item.value
      this.$router.push(item.myroute)
      this.$emit('headerNav', item.value)
    } else {
        this.$router.push(item.myroute)
     }
  }
  mounted(){
    this.selectValue = this.$route.query.value
  }
}
</script>
<style scoped lang="scss">
.anchor-nav {
  ul {
    text-align: center;
    overflow: hidden;
    .navigator {
      margin-top: 80px;
    }
    li.active {
      background: #7A0001;
    }
    li {
      margin: 20px auto;
      height: 50px;
      line-height: 52px;
      width: 122px;
      background: #B01516;
      color: #FFFFFF;
      cursor: pointer;
      position: relative;
    }
    li::before{
      content: '';
      display: block;
      position: absolute;
      top: -30px;
      width: 102px;
      height: 20px;
      background: transparent;
      border-bottom: 10px solid rgba(122, 0, 1, 1);
      border-left: 10px solid  transparent;
      border-right: 10px solid  transparent;
    }
    li::after{
      content: '';
      position: absolute;
      background: linear-gradient(90deg, #F07D7D 0%, #D32F2F 100%);
      border-radius: 3px;
      height: 18px;
      width: 6px;
      bottom: -17px;
      right: 22px;
      z-index: 10;
    }
    li a::before{
      content: '';
      position: absolute;
      background: linear-gradient(90deg, #F07D7D 0%, #D32F2F 100%);
      border-radius: 3px;
      height: 18px;
      width: 6px;
      bottom: -17px;
      left: 22px;
      z-index: 10;
    }
  }
  ul li:last-child{
    margin-bottom: 0px
  }
}
</style>
