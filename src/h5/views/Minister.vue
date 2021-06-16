<template>
  <div class="Clothing">
    <my-header @headerNav='headerNav'></my-header>
    <div class='list_box'>
      <div class='list' v-for='item in list' :key='item.name' @click='jump(item)'>
        <img :src="item.memorabiliaImagePathAlls[0]" alt="" class='img'>
        <div class='title'>{{item.memorabiliaTitle}}</div>
        <div class='text'>{{item.memorabiliaContent}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MyHeader from '@/h5/components/MyHeader.vue';


  @Component({
    components: {
      MyHeader
    }
  })
  export default class Minister extends Vue {
    
    jump(){

    }
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
  .Minister {
    min-height: 100vh;
    background: #F5F5F5;
    .list_box{
      display: flex;  
      flex-flow:column wrap;
    }
    .list{
      background: #fff;
      padding: 14px 11px;
      margin: 13px 10px;
      width: calc(100vw - 30px);
    }
    .img{
      width: 100%;
      height: 154px;
      display: block;
      margin-bottom: 7px;
    }
    .title{
        font-size: 16px;
        font-weight: 600;
    }
    .text{
        font-size: 14px;
        color: #666;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .list_box .list:nth-child(2n) .text{
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
</style>
