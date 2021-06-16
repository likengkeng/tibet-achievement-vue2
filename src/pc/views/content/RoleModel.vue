<template>
  <div class="role-model">
    <div class='content_header'>
      <div class='img_box'>
          <img :src="roleModel_icon" alt="" class='roleModel_icon'>
          <img :src="content" alt="" class='header_title'>
      </div>
      <img :src="detail" alt="" class='detail' @click='detailBtn'>
    </div>
    <div class='content'>
      <div class='nav_box'>
        <div class='nav' :class='{nav_select: navIndex==index}' v-for='(item, index) in navTitle' :key='item.name' @click='navSelect(item, index)'>
          <div class='nav_name'>{{item.name}}</div>
        </div>
      </div>
      <div class='article'>
        <div class='content1' v-if='list[0]' @click='jump(list[0])'>
          <div class='article_content_header'>{{list[0].articleVO.articleTitle}}</div>
          <div v-html='list[0].articleVO.articleContent'><span class='color'>【详情】</span></div>
        </div>
        <div v-if='list[0]'  @click='jump(list[0])'>
          <img :src="list[0].articleVO.articleCoverImagePath" alt="" class='content2'>
        </div>
        <div>
          <div class='flex'>
            <div class='content3 relative' @mouseover.stop="mouseOver(1)" @mouseleave.stop="mouseLeave(1)" v-if='list[1]' @click='jump(list[1])'>
              <img :src="list[1].articleVO.articleCoverImagePath" alt="" class='content3_img'>
              <div class='modal' v-show='isShow1'>
                <div class='modal_title'>{{list[1].articleVO.articleTitle}}</div>
                <div v-html='list[1].articleVO.articleContent'><span class='color'>【详情】</span></div>
              </div>
            </div>
            <div class='content4 relative' @mouseover.stop="mouseOver(2)" @mouseleave.stop="mouseLeave(2)" v-if='list[2]' @click='jump(list[2])'>
              <img :src="list[2].articleVO.articleCoverImagePath" alt="" class='content4_img'>
              <div class='modal' v-show='isShow2'>
                <div class='modal_title'>{{list[2].articleVO.articleTitle}}</div>
                <div v-html='list[2].articleVO.articleContent'><span class='color'>【详情】</span></div>
              </div>
            </div>
          </div>
          <div class='relative' @mouseover.stop="mouseOver(3)" @mouseleave.stop="mouseLeave(3)" v-if='list[3]' @click='jump(list[3])'>
            <img :src="list[3].articleVO.articleCoverImagePath" alt="" class='content5'>
            <div class='modal' v-show='isShow3'>
              <div class='modal_title'>{{list[3].articleVO.articleTitle}}</div>
              <div v-html='list[3].articleVO.articleContent'><span class='color'>【详情】</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='text_right'><img :src="roleModel_icon" alt="" class='footer_icon'></div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import MyContentHeader from '@/pc/components/MyContentHeader.vue';
import content from '@/pc/static/imgs/title_5.png'
import roleModel_icon from '@/pc/static/imgs/roleModel_icon.png'
import detail from '@/pc/static/imgs/detail.png'
import $http from '@/pc/api/event';

@Component({
  components: {
    MyContentHeader
  }
})
export default class RoleModel extends Vue {
  content: string = content
    detail: string = detail

  roleModel_icon: string = roleModel_icon
  navTitle = [
    {name: '老西藏'},
    {name: '优秀共产党员'},
    {name: '优秀党务工作者'},
    {name: '先进基层党组织'},
    {name: '优秀援藏干部人才'},
    {name: '优秀组工干部'},
    {name: '最美公务员'},
  ]
  navIndex = 0
  list = [{},{},{},{},{},{},{}]
  isShow1 = false
  isShow2 = false
  isShow3 = false
  isShow4 = false
  isShow5 = false
  detailBtn(){
      this.$router.push({name: 'list', query: {value: 'roleModel'}})
  }
  jump(item){
    // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
    this.$router.push({name: 'article', query: {
      isHistory: this.navIndex == 3, 
      item: JSON.stringify(item), 
      name: '榜样力量', 
      index: 5
    }})

  }
  mouseOver(index){
    console.log(index)
    this[`isShow${index}`] = true
  }
  mouseLeave(index){
    this[`isShow${index}`] = false
  }
  navSelect(index){
    
    this.navIndex = index
    this.getList()
  }
  getList(){
    $http.powerList({
      organizationPowerMeunType: 2,
      organizationPowerType: this.navIndex+1
    })
    .then(res => {
      console.log(res)
      this.list = res.data.data
    })
  }
  mounted(){
    this.getList()
  }
}
</script>
<style scoped lang="scss">
.role-model {
  width: 1200px;
  margin: 0px auto 40px;
  .content_header{
      margin-bottom: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img_box{
          display: flex;
          align-items: center;
      }
      .roleModel_icon{
          width: 88px;
          height: 67px;
          display: block;
          margin: 0px 7px 0px -88px;
      }
      .header_title{
          height: 64px;
      }
      .detail{
          width: 90px;
          height: 35px;
          display: block;
      }
  }
  .content{
    border: 8px solid #D6B98F;
    border-top:  0px;
    box-sizing: border-box;
    .nav_box{
      display: flex;
      background: rgba(214, 185, 143, .2);
      overflow: hidden;
      width: calc(100% + 16px);
      margin-left: -8px;
      margin-bottom: 47px;
      border-top: 8px solid rgba(211, 165, 99, 1);
      & .nav:first-child{
        width: 12.5%;
        padding-left: 50px;
        margin-left: -50px;
      }
      & .nav:last-child{
        width: 12.5%;
        padding-right: 50px;
        margin-right: -50px;
      }
      .nav{
        padding: 9px 0px 13px;
        width: 15%;
        transform: skew(-45deg);
        text-align: center;
        margin: 0px 1%;
        cursor: pointer;
        .nav_name{
          transform: skew(45deg);
        }
      }
      .nav_select{
        background: rgba(211, 165, 99, 1);
        color: #fff;
      }
    }

    .article{
      display: flex;
      cursor: pointer;
      padding: 0px 17px 30px;
      .article_content_header{
        font-size: 20px;
        font-weight: bold;
      }
      .color{
        color: rgba(151, 52, 45, 1);
      }
      .content1{
        width: 213px;
        padding-top: 30px;
        height: 310px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .content2{
        width: 516px;
        height: 310px;
        display: block;
        margin: 0px 10px 0px 23px;
      }
      .content3,.content4{
        width: 185px;
        height: 124px;
        margin-right: 9px;
        .content3_img,.content4_img{
          width: 100%;
          height: 100%;
        }
      }
      .content4{
        margin-right: 0px;
      }
      .content5{
        width: 379px;
        height: 170px;
        margin-top: 10px;
        display: block;
      }
      .content5:hover .modal{
        display: block;
      }
    }
  }
  .text_right{
    text-align: right;
  }
  .footer_icon{
    width: 88px;
    height: 67px;
    margin-right: -30px;
  }
  .modal{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background: rgba(0, 0, 0, 0.6);
    padding: 13px 13px 23px;
    color: #fff;
    font-size: 16px;
    z-index: 10;
    box-sizing: border-box;
    .modal_title{
      font-weight: bold;
    }
  }
}
</style>
