<template>
  <div class="tibet-achievement">
    <div class="cover-logo"></div>
    <menu-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></menu-header>
    <div class="relative">
      <div class="content float-l">
        <component
          v-for="(contenItem, index) in contentList"
          :key="index"
          :class="contenItem.value + '_jump_page'"
          :is="contenItem.content">
        </component>
      </div>
      <div class="left-menu float-l">
        <anchor-navigator
          :menuList="menuList"
          :current="currentMenu"
          @selectMenu="updateCurrentMenu"></anchor-navigator>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MenuHeader from '@/pc/components/MenuHeader.vue';
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
    },
    {
      text: '序言',
      value: 'preface',
      content: Preface,
    },
    {
      text: '领导关怀',
      value: 'leaderCare',
      content: LeaderCare,
    },
    {
      text: '大事件',
      value: 'bigEvent',
      content: BigEvent,
    },
    {
      text: '组织工作',
      value: 'organizeWork',
      content: OrganizeWork,
    },
    {
      text: '榜样力量',
      value: 'roleModel',
      content: RoleModel,
    },
    {
      text: '七地组声',
      value: 'sevenGroup',
      content: SevenGroup,
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
    jumpToContent(`${this.currentMenu.value}_jump_page`);
  }
}
</script>

<style scoped lang="scss">
.tibet-achievement {
  overflow: hidden;
  .content {
    min-height: 3500px;
    padding-left: 360px;
    width: calc(100% - 720px);
  }
  .left-menu {
    min-height: 3500px;
    width: 360px;
  }
}
</style>
