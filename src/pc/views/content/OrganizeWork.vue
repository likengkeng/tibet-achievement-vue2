<template>
  <div class="organize-work">
    <organize-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></organize-header>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrganizeHeader from '@/pc/components/OrganizeHeader.vue';
import { MenuItem } from 'CommonTypes';

@Component({
  components: {
    OrganizeHeader,
  }
})
export default class OrganizeWork extends Vue {
  menuList: MenuItem[] = [
    {
      text: '党的政治建设',
      value: 'politicalBuilding',
    },
    {
      text: '干部工作',
      value: 'cadreWork',
    },
    {
      text: '党的组织建设',
      value: 'organizationBuilding',
    },
    {
      text: '人才工作',
      value: 'talentWork',
    },
    {
      text: '干部人才援藏工作',
      value: 'helpTibetWork',
    },
    {
      text: '自身建设',
      value: 'selfConstruction',
    },
  ];
  currentMenu: MenuItem = {} as MenuItem;

  updateCurrentMenu(menu) {
    this.currentMenu = menu;
  }
}
</script>
<style scoped lang="scss">
.organize-work {
  height: 657px;
}
</style>
