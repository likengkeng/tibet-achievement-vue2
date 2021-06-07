<template>
  <div class="header tibet-achievement-header">
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
  height: 100px;
  ul {
    height: 100%;
    li.active {
      background: #B01516;
      a {
        color: #fff;
      }
    }
    li {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      width: 25%;
      cursor: pointer;
      a {
        color: #B01516;
        font-size: 15px;
        text-decoration-line: none;
      }
    }
  }
}
</style>
