<template>
  <div class='content_header'>
      <div class='img_box'>
          <img :src="logo" alt="" class='header_icon'>
          <img :src="content" alt="" class='header_title'>
      </div>
      <img :src="detail" alt="" class='detail' @click='detailBtn'>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { MenuItem } from 'CommonTypes';
import logo from '@/pc/static/imgs/header_icon.png'
import detail from '@/pc/static/imgs/detail.png'

// import detailIcon from '@/pc/static/imgs/detail_icon.png'

@Component({
  props: {
    content: {
      type: String,
      default: () => '',
    }
  },
})
export default class MenuHeader extends Vue {
  logo: String = logo
  detail: string = detail
//   detailIcon: String = detailIcon
  detailBtn(){
      this.$emit("click")
  }
}
</script>
<style scoped lang="scss">
    .content_header{
        margin: 0px 0px 24px;
        padding: 23px 0px 12px;
        border-bottom: 8px solid #B01516;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .img_box{
            display: flex;
            align-items: center;
        }
        .header_icon{
            width: 60px;
            height: 60px;
            display: block;
            margin-right: 21px;
        }
        .header_title{
            height: 38px;
        }
        .detail{
            width: 90px;
            height: 35px;
            display: block;
            cursor: pointer;
        }
    }
</style>
