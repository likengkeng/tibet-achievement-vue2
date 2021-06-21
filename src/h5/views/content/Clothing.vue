<template>
  <div class="Clothing">
    <div class='solid'></div>
    <img :src="logo" alt="" class='Clothing-logo' @click='jumps'>
    <div class='list_box'>
      <div class='list' v-for='(item, index) in list' :key='item.name' @click='jump(index)'>
        <div class='img_box'><img :src="item.img" class='img' alt=""></div>
        <div class='name'>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import logo from '@/h5/static/imgs/title7.png'
  import template1 from '@/h5/static/imgs/template1.png'
  import template2 from '@/h5/static/imgs/template2.png'
  import template3 from '@/h5/static/imgs/template3.png'
  import template4 from '@/h5/static/imgs/template4.png'
  import template5 from '@/h5/static/imgs/template5.png'
  import template6 from '@/h5/static/imgs/template6.png'
  import template7 from '@/h5/static/imgs/template7.png'


  @Component({
    components: {
    }
  })
  export default class SevenGroup extends Vue {
    logo = logo
    list = [
      {img: template1, name: '雅砻藏族'},
      {img: template2, name: '康区藏装'},
      {img: template3, name: '汉服女'},
      {img: template4, name: '安多藏装'},
      {img: template5, name: '中山装'},
      {img: template6, name: '后藏藏装'},
      {img: template7, name: '拉萨藏装'},
    ]
    jump(index){this.$router.push({name: 'photograph1', query: {img: index}})}
    jumps(){
      this.$router.push({name: 'fuse'})
    }
    mounted() {
    }
  }
</script>
<style scoped lang="scss">
.Clothing {
  .solid{
    width: 100%;
    height: 2px;
    border-top: 8px solid #CBA264;
    border-bottom: 2px solid #CBA264;
  }
  .Clothing-logo{
    width: 268px;
    height: 58px;
    display: block;
    margin: 19px auto 18px
  }
  .list_box{
    display: flex;
    flex-wrap: wrap;
    padding: 0px 25px
  }
  .list_box .list:nth-child(2n){
    margin-right: 0px
  }
  .list{
    width: 47.5%;
    margin: 0px 5% 32px 0px;
  }
  .img_box{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden
  }
  .img{
    background: #ccc;
    width: 150px;
    height: auto;
    display: block;
    margin: 0px auto 10px
  }
  .name{
    font-size: 16px;
    font-weight: 600;
    text-align: center
  }
}
</style>
