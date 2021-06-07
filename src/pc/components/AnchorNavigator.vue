<template>
  <div class="anchor-nav">
    <ul class="text-center">
      <li
        v-for="(menu, index) in menuList"
        :key="index"
        :class="{active: isActive(menu)}"
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
    menuList: {
      type: Array as MenuItem[],
      default: () => [],
    },
    current: {
      type: Object as MenuItem,
      default: () => ({}),
    }
  },
})
export default class AnchorNavigator extends Vue {
  declare current: MenuItem;
  isActive(menu) {
    return this.current.value === menu.value;
  }
  selectMenu(menu) {
    this.$emit('selectMenu', menu);
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
