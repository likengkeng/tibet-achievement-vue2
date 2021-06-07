<template>
  <div class="organizeWork">
    <div class="organizeWork-logo"></div>
    <content-header :menuList="menuList"></content-header>
    <div class="text-content">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ContentHeader from './ContentHeader.vue';
@Component({
  components: {
    ContentHeader,
  }
})
export default class OrganizeWork extends Vue {
  menuList = [
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
  ]
}
</script>
<style scoped lang="scss">
.organizeWork {
  .organizeWork-logo {
    height: 96px;
    background: url('@/h5/static/imgs/organizeWork-1x.png') no-repeat center center;
  }
}
</style>
