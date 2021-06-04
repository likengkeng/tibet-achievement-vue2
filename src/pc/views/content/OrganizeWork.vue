<template>
  <div class="organize-work">
    <organize-header
      :menuList="menuList"
      :current="currentMenu"
      @selectMenu="updateCurrentMenu"></organize-header>
    <div class="work-content">
      <work-swiper :list="workList" width="100%" height="400px">
        <template v-slot:content="slotProps">
          <div class="content-item1">{{ slotProps.slide.title }}</div>
        </template>
      </work-swiper>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import OrganizeHeader from '@/pc/components/OrganizeHeader.vue';
import WorkSwiper from '@/common/components/MySwiper.vue';
import { MenuItem } from 'CommonTypes';

@Component({
  components: {
    OrganizeHeader,
    WorkSwiper,
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
  workList = [
    {
      title: '测试测试001',
      desc: '',
      img: '/static/imgs/test01.jpg',
    },
    {
      title: '测试测试002',
      desc: '',
      img: '/static/imgs/test02.jpg',
    },
    {
      title: '测试测试003',
      desc: '',
      img: '/static/imgs/test03.jpg',
    },
  ];

  mounted() {
    this.currentMenu = this.menuList[0];
  }

  updateCurrentMenu(menu) {
    this.currentMenu = menu;
  }
}
</script>
<style scoped lang="scss">
.organize-work {
  height: 657px;
  .work-content {
    width: 60%;
    height: 100%;
  }
}
</style>
