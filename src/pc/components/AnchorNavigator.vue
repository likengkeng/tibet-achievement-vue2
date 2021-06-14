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
    .navigator {
      margin-top: 80px;
    }
    li.active {
      background: #7A0001;
    }
    li {
      margin: 8px auto;
      height: 52px;
      line-height: 52px;
      width: 136px;
      background: #B01516;
      color: #FFFFFF;
      cursor: pointer;
    }
  }
}
</style>
