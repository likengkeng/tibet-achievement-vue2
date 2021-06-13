<template>
  <div class='home_footer'>
    <div class='footer_top'>
    <div class='footer_content1'>中共西藏自治区委员会组织部</div>
    <div class='size_14'>
        资料来源于中共西藏自治区委员会宣传部、中共西藏自治区委员会党<br />史研究室、西藏自治区档案馆、西藏日报社及互联网，如有侵权请致<br />电 0891-6198103。
    </div>
    </div>
    <div class='footer_bottom'>
    copy@2021 藏备案
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props: {
    msg: {
      type: String,
      default: 'Hello World!',
    },
  },
})
export default class MyFooter extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home_footer{
    background: rgba(151, 52, 45, 1);
    .footer_top{
      width: 1200px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      padding: 33px 0px;
      color: #EECA82;

      .footer_content1{
        font-size: 28px;
      }
      .size_14{
        font-size: 14px;
      }
    }
    .footer_bottom{
      background: #302B2B;
      color: #EECA82;
      font-size: 18px;
      line-height: 56px;
      height: 56px;
      text-align: center;
    }
  }
</style>
