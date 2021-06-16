<template>
  <div class="seven-group">
    <MyContentHeader :content='content' @click='detail'></MyContentHeader>
    <div class='content flex' @mouseleave='mouseleave'  @mouseenter='mouseenter'>
      <div v-for='(item, index) in list' :key='item.name' @mouseenter='item.check = true' @mouseleave='item.check = false' @click='nav(item, index)' class='list'>
        <img :src="item.areaVoiceCoverImagePath" alt="" class='nav_img' :class='{hover_width: item.check}'>
        <img :src="nameList[item.areaVoiceMeunType].icon" alt="" class='name_icon'>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyContentHeader from '@/pc/components/MyContentHeader.vue';
import content from '@/pc/static/imgs/title_6.png'
import al from '@/pc/static/imgs/al.png'
import cd from '@/pc/static/imgs/cd.png'
import ls from '@/pc/static/imgs/ls.png'
import lz from '@/pc/static/imgs/lz.png'
import nq from '@/pc/static/imgs/nq.png'
import rkz from '@/pc/static/imgs/rkz.png'
import sn from '@/pc/static/imgs/sn.png'
import $http from '@/pc/api/event';

@Component({
  components: {
    MyContentHeader
  }
})
export default class SevenGroup extends Vue {
    content: string = content
    nameList = [
      {},
      {name: '拉萨', icon: ls, check: true, path: ''},
      {name: '日喀则', icon: rkz, check: false, path: ''},
      {name: '山南', icon: sn, check: false, path: ''},
      {name: '林芝', icon: lz, check: false, path: ''},
      {name: '昌都', icon: cd, check: false, path: ''},
      {name: '那曲', icon: nq, check: false, path: ''},
      {name: '阿里', icon: al, check: false, path: ''},
    ]
    list = []
    detail(){this.$router.push({name: 'list', query: {value: 'sevenGroup'}})}
    nav(item, index){
      sessionStorage.setItem("myqidi",index+1)
      this.$router.push({name: 'list', query: {value: 'sevenGroup', index: index+1}})
    }
    mouseleave(){
      this.list[0].check = true
    }
    mouseenter(){
      this.list[0].check = false
    }
    getList(){
      $http.voiceList({
        areaVoiceType: 1
      })
      .then(res => {
        console.log(res)
        res?.data?.data?.map(el => {
          el.check = false
          return el
        })
        res.data.data[0].check = true
        this.list = res.data.data
      })
    }
    mounted() {
      // this.list.forEach((el, index) => {
      //   this.getList(index)
      // });
      this.getList()
    }
}
</script>
<style scoped lang="scss">
.seven-group {
  width: 1200px;
  margin: auto;
  .content{
    margin-top: 30px;
    .list{
      margin-right: 9px;
      // width: 137px;
      .nav_img{
        width: 137px;
        height: 337px;
        display: block;
        margin-bottom: 28px;
        cursor: pointer;
      }
      .hover_width{
        width: 324px;
      }
      .name_icon{
        height: 37px;
        margin: 0px auto 140px;
        display: block;
      }
    }

  }
}
</style>
