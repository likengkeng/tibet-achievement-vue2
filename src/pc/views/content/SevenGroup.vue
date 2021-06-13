<template>
  <div class="seven-group">
    <MyContentHeader :content='content' @click='detail'></MyContentHeader>
    <div class='content flex' @mouseleave='mouseleave'  @mouseenter='mouseenter'>
      <div v-for='(item, index) in list' :key='item.name' @mouseenter='item.check = true' @mouseleave='item.check = false' @click='nav(item, index)' class='list'>
        <img :src="item.path" alt="" class='nav_img' :class='{hover_width: item.check}'>
        <img :src="item.icon" alt="" class='name_icon'>
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
    list = [
      {name: '拉萨', icon: ls, check: true, path: ''},
      {name: '日喀则', icon: rkz, check: false, path: ''},
      {name: '山南', icon: sn, check: false, path: ''},
      {name: '林芝', icon: lz, check: false, path: ''},
      {name: '昌都', icon: cd, check: false, path: ''},
      {name: '那曲', icon: nq, check: false, path: ''},
      {name: '阿里', icon: al, check: false, path: ''},
    ]
    detail(){this.$router.push({name: 'list', query: {value: 'sevenGroup'}})}
    nav(item, index){}
    mouseleave(){
      this.list[0].check = true
    }
    mouseenter(){
      this.list[0].check = false
    }
    getList(index){
      $http.voiceList({
        areaVoiceType: 1,
        areaVoiceMeunType: index
      })
      .then(res => {
        console.log(res)
        this.list[index].path = res.data.areaVoiceCoverImagePath
      })
    }
    mounted() {
      this.list.forEach((el, index) => {
        this.getList(index)
      });
      // this.getList()
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
