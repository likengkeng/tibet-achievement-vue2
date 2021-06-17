<template>
  <div class="BigEventList">
    <my-header @headerNav='headerNav'></my-header>
    <div class='padding8'>
      <div class='list_box'>
        <div class='list' v-for='(item, index) in list' :key='item.name' @click='jump(item)'>
          <div class='time' :class='{color: index==0}'>
            <p class='year'>{{item.time[0]}}</p>
            <p>{{item.time[1]}}</p>
            <img class='rocket' :src="rocket" alt="">
          </div>
          <div class='content'>
            <img :src="(item.memorabiliaImagePathAlls||[])[0]" alt="" class='img'>
            <div class='list_title'>{{item.memorabiliaTitle}}</div>
            <div class='list_text'>{{item.memorabiliaContent}}</div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import $http from '@/h5/api/event';
  import MyHeader from '@/h5/components/MyHeader.vue';
  import rocket from '@/h5/static/imgs/rocket.png'


  @Component({
    components: {
      MyHeader
    }
  })
  export default class Fuse extends Vue {
    list = []
    rocket = rocket
    getList(){
      $http.memorabiliaList()
        .then((res) => {
          res.data.data.map(el => {
            el.time = this.format(el.memorabiliaDatetime)
            return el
          })
          this.list = res.data.data;
        })
        .catch(() => {

        });  
    }
    jump(item){
      this.$router.push({name: 'article', query: {isHistory: true, item: JSON.stringify(item), name: '大事记', index: 3}})
    }
    headerNav(){}
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

      var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
      var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      return [`${y}年`, `${m}月${d}日`]
      // return `${y}年${m}月${d}日 ${h}:${mm}:${s}`
    }
    mounted() {
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.BigEventList{
  background: #F5F5F5;
  min-height: 100vh;
  .padding8{
    padding: 8px;
  }
  .time{
    color: rgba(148, 7, 8, 1);
    font-size: 14px;
    margin-bottom: 12px;
    position: relative;
    display: flex;
    align-items: center;
    margin-right: 10px
  }
  .rocket{
    width: 40px;
    height: 51px;
    position: absolute;
    top: -7px;
    left: -45px;
  }
  
  .list_box{
    padding-bottom: 20px;
    padding: 10px 8px 10px 44px;
  }
  .list_box .list:first-child{
    padding-top: 30px
  }
  .list{
    padding-top: 27px;
    position: relative;
  }
  .list::before{
    content: '';
    display: block;
    width: 4px;
    background: #E3E3E3;
    height: 100%;
    position: absolute;
    top: 0px;
    left: -26.5px
  }
  .color{
    color:#333
  }
  .year{
    margin-right: 7px;
    font-size: 18px;
    font-weight: 600;
    color: #940708;
    display: flex;
    align-items: center;
  }
  .content{
    box-shadow: 0px 2px 18px 0px rgba(202, 202, 202, 0.5);
    background: #FFFFFF;
    border-radius: 6px;
    padding: 14px;
  }
  .img{
    width: 233px;
    height: 142px;
    display: block;
    margin-bottom: 11px;
  }
  .list_title{
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  .list_text{
    color: #666666;
    font-size: 14px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: '40px'
  }
}
</style>
