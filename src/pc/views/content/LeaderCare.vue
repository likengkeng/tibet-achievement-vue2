<template>
  <div class="leader-care">
    <div class="content">
      <MyContentHeader :content='content' @click='detail'></MyContentHeader>
      <div class='my_flex'>
        <div class='img_box'>
          <div class='img_list'>
            <img :style='{transform: `translateX(-${imgListIndex*100}%)`}' v-for='item in imgList' :src="item" :key='item' alt="" class='img'>
          </div>
          <div class='img_list_btn_box'>
            <div @click='imgListIndex=index-1' v-for='index in imgList.length' :key='index' class='select_btn' :class='{select_check: imgListIndex==index-1}'></div>
          </div>
        </div>
        <div class='content_right'>
          <div class='nav'>
            <div class='btn' :class='{select_nav: navIndex==1}' @click='navSelect(1)'>中央领导关怀</div>
            <div class='btn' :class='{select_nav: navIndex==2}' @click='navSelect(2)'>自治区党委书记</div>
            <div class='btn' :class='{select_nav: navIndex==3}' @click='navSelect(3)'>历任组织部部长</div>
          </div>
          <div class='list_box'>
            <div v-for='item in list' :key='item.articleId' class='list' @click='jump(item)'>
              <div class='my_flex list_left'>
                <img :src="leaderCare_icon" alt="" class='icon'>
                <div class='line_clamp1' v-if='navIndex==3'>第{{(item.leaderVO || {}).leaderSort}}任-{{(item.leaderVO || {}).leaderName}} </div>
                <div v-else class='line_clamp1'>{{(item.articleVO || {}).articleTitle}}</div>
              </div>
              <div class='createDatetime'>{{item.createDatetime}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  // import ImageSwiper from '@/common/components/MySwiper.vue';
  import MyContentHeader from '@/pc/components/MyContentHeader.vue';
  import leaderCare_icon from '@/pc/static/imgs/leaderCare_icon.png'
  import content from '@/pc/static/imgs/title_2.png'
  import $http from '@/pc/api/event';

  @Component({
    components: {
      MyContentHeader
    }
  })
  export default class LeaderCare extends Vue {
    currentImage: string = '/static/imgs/test01.jpg';
    leaderCare_icon: String = leaderCare_icon
    content: string = content
    imgList = [];
    imgListIndex = 0
    navIndex: Number = 1
    list = []
    jump(item){
      if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
          window.open(item.articleVO.articleSuperUrl)
          return
      }
      // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
      this.$router.push({name: 'article', query: {
        isHistory: this.navIndex == 3,
        item: JSON.stringify(item),
        name: '领导关怀',
        index: 2
      }})

    }
    detail(){this.$router.push({name: 'list', query: {value: 'leaderCare'}})}
    navSelect(index){
      this.navIndex = index
      this.imgListIndex = 0
      this.getList()
    }
    getList(){
      $http.leaderList({leaderCareType: this.navIndex})
      .then(res => {
        console.log(res)
        this.imgList = []
        res?.data?.data?.map(el => {
          el.articleVO?.createDatetime && (el.createDatetime = this.format(el.articleVO.createDatetime))
          el.leaderVO?.createDatetime && (el.createDatetime = this.format(el.leaderVO.createDatetime))
          if (this.navIndex == 3) {
            this.imgList = [...el.leaderVO.leaderImagePathAlls, ...this.imgList]
          } else {
            this.imgList.push(el.articleVO.articleCoverImagePath)
          }
          return el
        })
        this.list = res.data.data
      })
    }
    format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();

      var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
      var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
      return `${y}-${m}-${d} ${h}:${mm}:${s}`
    }
    mounted(){
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.leader-care {
  background-image: url('/src/pc/static/imgs/leader_care_background.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 602px;
  padding-top: 27px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 66px;
  .image {
    width: 40%;
    height: 100%;
    float: left;
    margin-top: 40px;
  }
  .content {
    width: 1200px;
    height: 100%;
    margin: auto;
    .my_flex{
      display: flex;
    }
    .img_box{
      width: 590px;
      display: block;
      margin-right: 20px;
      flex-shrink: 0;
      overflow: hidden;
      .select_btn{
        width: 30px;
        height: 14px;
        border-radius: 14px;
        cursor: pointer;
        background: #fff;
        margin-right: 15px;
      }
      .select_check{
        width: 60px;
        background: rgba(105, 8, 20, 1);
      }
      .img_list_btn_box{
        display: flex;
      }
      .img_list{
        display: flex;
        margin-bottom: 40px;
        .img{
          width: 100%;
          height: 357px;
          flex-shrink: 0;
          transition: .4s;
        }
      }
    }
    .content_right{
      flex-grow: 1;
      padding: 17px 34px 11px 17px;
      background: #fff;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      height: 357px;
      box-sizing: border-box;
      overflow: hidden;
      .nav{
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 18px;
        flex-shrink: 0;
        margin-bottom: 42px;
        .btn{
          padding: 0px 12px;
          border-radius: 48px;
          height: 48px;
          line-height: 48px;
          cursor: pointer;
        }
      }
      .select_nav{
        color: #fff;
        background: #B01516;
      }
      .list_box{
        &::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
      }
      .list{
        font-size: 16px;
            cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 18px;
        .list_left{
          align-items: center;
          overflow: hidden
        }
        .createDatetime{
          flex-shrink: 0;
          margin-left: 10px
        }
        .icon{
          width: 50px;
          height: 38px;
          display: block;
          margin-right: 12px;
        }
      }
    }
  }
  .line_clamp1{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
  
}
</style>
