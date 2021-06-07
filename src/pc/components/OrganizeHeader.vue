<template>
  <div class="header text-center">
    <ul>
      <li
        class="text-center"
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
      type: Array,
      default: () => [],
    },
    current: {
      type: Object,
      default: () => ({}),
    }
  },
})
export default class MenuHeader extends Vue {
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
.header {
  height: 68px;
  background: #EFD0D0;
  ul {
    height: 100%;
    li.active {
      background: #7A0001;
      a {
        color: #FFFFFF;
      }
    }
    li {
      display: inline-block;
      height: 100%;
      line-height: 68px;
      width: 168px;
      cursor: pointer;
      a {
        color: #B01516;
        font-size: 16px;
        text-decoration-line: none;
      }
    }
  }
}
</style>
