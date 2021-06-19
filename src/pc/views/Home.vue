<template>
  <div class="tibet-achievement">
    <div class="cover-logo"></div>
    <menu-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></menu-header>
    <div class="relative">
      <div class="content">
        <component
          v-for="(contenItem, index) in contentList"
          :key="index"
          :class="contenItem.value + '_jump_page'"
          class='mb_25'
          :is="contenItem.content">
        </component>
        <div class="left-menu">
          <anchor-navigator
            :menuList="menuList"
            :current="currentMenu"
            @selectMenu="updateCurrentMenu"></anchor-navigator>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MenuHeader from '@/pc/components/MenuHeader.vue';
import MyFooter from '@/pc/components/MyFooter.vue';

import AnchorNavigator from '@/pc/components/AnchorNavigator.vue';
import { jumpToContent } from '@/common/util/anchor';
import Preface from './content/Preface.vue';
import LeaderCare from './content/LeaderCare.vue';
import BigEvent from './content/BigEvent.vue';
import OrganizeWork from './content/OrganizeWork.vue';
import RoleModel from './content/RoleModel.vue';
import SevenGroup from './content/SevenGroup.vue';
import { MenuItem } from 'CommonTypes';

@Component({
  components: {
    MenuHeader,
    MyFooter,
    AnchorNavigator,
    Preface,
    LeaderCare,
    BigEvent,
    OrganizeWork,
    RoleModel,
    SevenGroup,
  },
})
export default class Home extends Vue {
  menuList: MenuItem[] = [
    {
      text: '首页',
      value: 'indexPage',
      myroute: {name: 'home'}
    },
    {
      text: '序言',
      value: 'preface',
      content: Preface,
      myroute: {name: 'list', query: {value: 'preface'}}
    },
    {
      text: '领导关怀',
      value: 'leaderCare',
      content: LeaderCare,
      myroute: {name: 'list', query: {value: 'leaderCare'}}
    },
    {
      text: '大事记',
      value: 'bigEvent',
      content: BigEvent,
      myroute: {name: 'list', query: {value: 'bigEvent', isBigEvent: true}}
    },
    {
      text: '组织工作',
      value: 'organizeWork',
      content: OrganizeWork,
      myroute: {name: 'list', query: {value: 'organizeWork'}}
    },
    {
      text: '榜样力量',
      value: 'roleModel',
      content: RoleModel,
      myroute: {name: 'list', query: {value: 'roleModel'}}
    },
    {
      text: '七地组声',
      value: 'sevenGroup',
      content: SevenGroup,
      myroute: {name: 'list', query: {value: 'sevenGroup'}}
    },
  ];
  anchorNavStickyOpts = {
    top: '68px',
    width: '362px',
    right: '0px',
    zIndex: '9998',
  };
  currentMenu: MenuItem = {} as MenuItem;

  mounted() {
    this.currentMenu = this.menuList[0];
  }

  get contentList() {
    return this.menuList.slice(1, this.menuList.length);
  }

  updateCurrentMenu(menu) {
    this.currentMenu = menu;
    console.log(menu)
    this.$router.push(menu.myroute)
    // jumpToContent(`${this.currentMenu.value}_jump_page`);
  }
}
</script>

<style scoped lang="scss">
.tibet-achievement {
  overflow: hidden;
  .content {
    // min-height: 3500px;
    width: 100vw;
    // padding-left: 360px;
    // width: calc(100% - 720px);
    // width: 1200px;
  }
  .left-menu {
    // min-height: 3500px;
    // width: 360px;
    position: absolute;
    top: 170px;
    right: 160px;
  }
  .mb_25{
    margin-bottom: 25px;
  }
  
}
</style>
