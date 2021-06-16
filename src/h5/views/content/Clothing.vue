<template>
  <div class="Clothing">
    <div class='solid'></div>
    <img :src="logo" alt="" class='Clothing-logo'>
    <div class='list_box'>
      <div class='list' v-for='item in list' :key='item.name' @click='jump(item)'>
        <div class='img'></div>
        <div class='name'>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import logo from '@/h5/static/imgs/title7.png'


  @Component({
    components: {
    }
  })
  export default class SevenGroup extends Vue {
    logo = logo
    list = [
      {img: logo, name: '名字1'},
      {img: logo, name: '名字2'},
      {img: logo, name: '名字3'},
      {img: logo, name: '名字4'},
      {img: logo, name: '名字5'},
      {img: logo, name: '名字6'},
      {img: logo, name: '名字7'},
      {img: logo, name: '名字8'}
    ]
    jump(item){this.$router.push({name: 'photograph1', query: {value: JSON.stringify(item)}})}

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
  .img{
    background: #ccc;
    width: 150px;
    height: 150px;
    display: block;
    border-radius: 50%;
    margin: 0px auto 10px
  }
  .name{
    font-size: 16px;
    font-weight: 600;
    text-align: center
  }
}
</style>
