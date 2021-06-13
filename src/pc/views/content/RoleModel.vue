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
        <div class='nav' :class='{nav_select: item.check}' v-for='(item, index) in navTitle' :key='item.name' @click='navSelect(item, index)'>
          <div class='nav_name'>{{item.name}}</div>
        </div>
      </div>
      <div class='article'>
        <div class='content1'>
          <div class='article_content_header'>大标题大标题大标题大大标题标题</div>
          <div>步区便斗造何同把律接必接调广之历界的装众究阶那铁始每志相意见型前决指经影此界少较连被酸置张离。术从线候子历回一口省度验斗术术保变土思们先装技基老方回<span class='color'>【详情】</span></div>
        </div>
        <div>
          <img :src="roleModel_icon" alt="" class='content2'>
        </div>
        <div>
          <div class='flex'>
            <div class='content3'>
              <img :src="roleModel_icon" alt="" class='content3_img'>
            </div>
            <div class='content4'>
              <img :src="roleModel_icon" alt="" class='content4_img'>
            </div>
          </div>
          <div>
            <img :src="roleModel_icon" alt="" class='content5'>
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
    {name: '老西藏', check: true},
    {name: '优秀共产党员', check: false},
    {name: '优秀党务工作者', check: false},
    {name: '先进基层党组织', check: false},
    {name: '优秀援藏干部人才', check: false},
    {name: '优秀组工干部', check: false},
    {name: '最美公务员', check: false},
  ]
  detailBtn(){
      this.$router.push({name: 'list', query: {value: 'roleModel'}})
  }
  navSelect(item, index){
    this.navTitle.map(el => {
      el.check = false
      return el
    })
    item.check = true
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
}
</style>
