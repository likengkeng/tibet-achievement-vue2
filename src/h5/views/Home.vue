<template>
  <div class="tibet-achievement-H5">
    <div class="cover-logo-h5"></div>
    <div class='mb_25'>
      <menu-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></menu-header>
    </div>
    
    <div class="home-content">
      <preface></preface>
      <leader-care></leader-care>
      <big-event></big-event>
      <organize-work></organize-work>
      <role-model></role-model>
      <seven-group></seven-group>  
      <clothing></clothing>
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
import RoleModel from './content/RoleModel.vue';
import SevenGroup from './content/SevenGroup.vue';
import Clothing from './content/Clothing.vue';

import { MenuItem } from 'CommonTypes';

@Component({
  components: {
    MenuHeader,
    Preface,
    LeaderCare,
    BigEvent,
    OrganizeWork,
    RoleModel,
    SevenGroup,
    Clothing
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
      text: '大事记',
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
  currentMenu: MenuItem = {
      text: '首页',
      value: 'indexPage',
    } as MenuItem;
  updateCurrentMenu(menu) {
    let name = 'list'
    if (menu.value == 'bigEvent') {
      name = 'bigEventList'
    }
    console.log(name)
    // this.currentMenu = menu;
    this.$router.push({name, query: {value: menu.value}})
  }
}
</script>

<style scoped lang="scss">
.tibet-achievement-H5{
  background: rgba(237, 237, 237, 0.9);
  .mb_25{
    margin-bottom: 25px;
  }
}
</style>
