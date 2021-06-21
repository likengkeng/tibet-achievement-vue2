<template>
  <div class="organize-work">
      <div class='content'>
        <MyContentHeader :content='content' @click='detail'></MyContentHeader>
        <div class='organize_header'>
          <organize-header
          class='mb_35'
          :menuList="menuList"
          :current="currentMenu"
          @selectMenu="updateCurrentMenu"></organize-header>

          <div class='article'>
            <img @click='leftBtn' :src="left_icon" alt="" class='icon left'>
            <img @click='rightBtn' :src="right_icon" alt="" class='icon right'>
            <div class='article_list_box'>
              <div v-for='item in list' :key='item.organizationPowerId' class='article_list' :style='{transform: `translateX(-${pageSize*100}%)`}'>
                <div class='article_left' v-if='item[0]' @click='jump(item[0])'>
                  <div>
                    <img class='left_img' :src="(item[0].articleVO || {}).articleCoverImagePath" alt="">
                  </div>
                  <div class='copywriting'>
                    <div class='line_clamp2 title'>{{(item[0].articleVO || {}).articleTitle}}</div>
                    <div class='copywriting_content' v-html='(item[0].articleVO || {}).articleContent'>
                      <!-- {{item[0].articleVO.articleTitle}} -->
                      <!-- <span class='color'>【详情】</span> -->
                    </div>
                  </div>
                </div>
                <div class='article_right'>
                  <div class='article_right_content mb_15' v-if='item[1]' @click='jump(item[1])'>
                    <div><img class='right_img' :src="(item[1].articleVO || {}).articleCoverImagePath" alt=""></div>
                    <div class='content1'>
                      <div class='line_clamp2 title'>{{(item[1].articleVO || {}).articleTitle}}</div>
                      <div class='copywriting_content' v-html='(item[1].articleVO || {}).articleContent'>
                        <!-- <span class='color'>【详情】</span> -->
                      </div>
                    </div>
                  </div>
                  <div class='article_right_content' v-if='item[2]' @click='jump(item[2])'>
                    <div><img class='right_img' :src="(item[2].articleVO || {}).articleCoverImagePath" alt=""></div>
                    <div class='content1'>
                      <div class='line_clamp2 title'>{{(item[2].articleVO || {}).articleTitle}}</div>
                      <div class='copywriting_content' v-html='(item[2].articleVO || {}).articleContent'>
                        <!-- <span class='color'>【详情】</span> -->
                      </div>
                    </div>
                  </div>
                </div>
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
  import OrganizeHeader from '@/pc/components/OrganizeHeader.vue';
  import WorkSwiper from '@/common/components/MySwiper.vue';
  import { MenuItem } from 'CommonTypes';
  import MyContentHeader from '@/pc/components/MyContentHeader.vue';
  import content from '@/pc/static/imgs/title_4.png'
  import right_icon from '@/pc/static/imgs/right_icon.png'
  import left_icon from '@/pc/static/imgs/left_icon.png'
  import $http from '@/pc/api/event';

  @Component({
    components: {
      OrganizeHeader,
      WorkSwiper,
      MyContentHeader
    }
  })
  export default class OrganizeWork extends Vue {
    content: string = content
    left_icon = left_icon
    right_icon = right_icon
    menuList: MenuItem[] = [
      {
        text: '党的政治建设',
        value: 'politicalBuilding',
        index: 1
      },
      {
        text: '干部工作',
        value: 'cadreWork',
        index: 2
      },
      {
        text: '党的组织建设',
        value: 'organizationBuilding',
        index: 3
      },
      {
        text: '人才工作',
        value: 'talentWork',
        index: 4
      },
      {
        text: '干部人才援藏工作',
        value: 'helpTibetWork',
        index: 5
      },
      {
        text: '自身建设',
        value: 'selfConstruction',
        index: 6
      },
    ];
    currentMenu: MenuItem = {} as MenuItem;
    list = []
    pageSize = 0
    detail(){this.$router.push({name: 'list', query: {value: 'organizeWork'}})}
    leftBtn(){
      if (this.pageSize == 0) {
        return
      }
      this.pageSize -= 1
    }
    jump(item){
      if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
          window.open(item.articleVO.articleSuperUrl)
          return
      }
      // this.$router.push({name: 'Article', query: {value: 'leaderCare'}})
      this.$router.push({name: 'article', query: {
        item: JSON.stringify(item),
        name: '组织工作',
        index: 4
      }})

    }
    rightBtn(){
      if (this.pageSize == this.list.length-1) {
        return
      }
      this.pageSize += 1
    }
    getList(){
      $http.powerList({
        organizationPowerMeunType: 1,
        organizationPowerType: this.currentMenu.index
      })
      .then(res => {
        let arr = []
        res.data.data.forEach((el,index) => {
          if (arr[Math.ceil((index+1)/3)-1]) {
            arr[Math.ceil((index+1)/3)-1].push(el)
          } else {
            arr[Math.ceil((index+1)/3)-1] = [el]
          }
        });
        console.log(res)
        this.list = arr
      })
    }
    mounted() {
      this.currentMenu = this.menuList[0];
      this.getList()
    }

    updateCurrentMenu(menu) {
      this.currentMenu = menu;
      this.pageSize = 0
      this.getList()
    }
  }
</script>
<style scoped lang="scss">
.organize-work {
  // height: 657px;
  background-image: url('/src/pc/static/imgs/organize-work_background.png');
  background-size: cover;
  background-repeat: no-repeat;
  padding-bottom: 30px;
  margin-bottom: 53px;
  .content{
    width: 1200px;
    margin: auto;
    .organize_header{
      margin-top: -24px;
    }
  }
  .mb_35{
    margin-bottom: 35px;
  }
  .article{
    display: flex;
    position: relative;
    .article_list_box{
      width: 1200px;
      overflow: hidden;
      display: flex;
    }
    .article_list{
      display: flex;
      position: relative;
      flex-shrink: 0;
      transition: .5s;
    }
    .icon{
      width: 46px;
      height: 36px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .left{
      left: -86px;
    }
    .right{
      right: -86px;
    }
    .article_left{
      cursor: pointer;
      border-radius: 10px;
      width: 709px;
      background: #fff;
      padding: 16px 18px;
      display: flex;
      margin-right: 15px;
      flex-shrink: 0;
      box-sizing: border-box;
      .left_img{
        width: 452px;
        height: 410px;
        margin-right: 15px;
        flex-shrink: 0;
      }
      .copywriting{
        flex-grow: 1;
        padding: 35px 0px;
        height: 410px;
        box-sizing: border-box;
        overflow: hidden;
      }
    }
    .content1{
      padding-top: 6px;
      height: 183px;
      overflow: hidden;
    }
    .article_right{
      display: flex;
      flex-direction: column;
      width: 476px;
      flex-shrink: 0;
      .mb_15{
        margin-bottom: 15px;
      }
      .right_img{
        width: 190px;
        height: 190px;
        display: block;
        margin-right: 15px;
      }
      .article_right_content{
        cursor: pointer;
        display: flex;
        flex-grow: 1;
        background: #fff;
        padding: 12px;
        border-radius: 10px;
        height: 213px;
        box-sizing: border-box;
      }
    }
    .title{
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 12px;
      color: #4C4C4C;
    }
    .copywriting_content{
      color: #4C4C4C;
      font-size: 20px;
      // height: ;
    }
    .color{
      color: #B41F20;
    }
  }
  .line_clamp2 {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

}
</style>
