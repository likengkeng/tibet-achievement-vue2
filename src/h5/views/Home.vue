<template>
  <div class="tibet-achievement-H5">
    <div class="cover-logo-h5"></div>
    <menu-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></menu-header>
    <div class="home-content">
      <preface></preface>
      <leader-care></leader-care>
      <big-event></big-event>
      <organize-work></organize-work>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MenuHeader from '@/h5/components/MenuHeader.vue';
import Preface from './content/Preface.vue';
import LeaderCare from './content/LeaderCare.vue';
import BigEvent from './content/BigEvent.vue';
import OrganizeWork from './content/OrganizeWork.vue';
import { MenuItem } from 'CommonTypes';

@Component({
  components: {
    MenuHeader,
    Preface,
    LeaderCare,
    BigEvent,
    OrganizeWork,
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
    },
    {
      text: '领导关怀',
      value: 'leaderCare',
    },
    {
      text: '大事件',
      value: 'bigEvent',
    },
    {
      text: '组织工作',
      value: 'organizeWork',
    },
    {
      text: '榜样力量',
      value: 'roleModel',
    },
    {
      text: '七地组声',
      value: 'sevenGroup',
    },
    {
      text: '互动区',
      value: 'interactiveArea',
    },
  ];
  currentMenu: MenuItem = {} as MenuItem;
  updateCurrentMenu(menu) {
    this.currentMenu = menu;
  }
}
</script>

<style scoped lang="scss">
</style>
