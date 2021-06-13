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
            <div class='article_left'>
              <div>
                <img class='left_img' :src="content" alt="">
              </div>
              <div class='copywriting'>
                <div class='line_clamp2 title'>大标题大标题大标题大大标题标题</div>
                <div class='copywriting_content'>
                  步区便斗造何同把律接接调广之历界的装众究阶那铁始每志相意见型前决指经影此界少较连万内别被酸置步张离。术从线候子历回一口省度验斗术术保变土思们先装技基则马很直老方回
                  <span class='color'>【详情】</span>
                </div>
              </div>
            </div>
            <div class='article_right'>
              <div class='article_right_content mb_15'>
                <div><img class='right_img' :src="content" alt=""></div>
                <div class='content1'>
                  <div class='line_clamp2 title'>大标题大标题大标题大大标题标题</div>
                  <div class='copywriting_content'>
                    步区便斗造何同把律接接调广之历界的装众究阶那铁始每志相意见型前决指经影此界少较连万内别被酸置步张离。术从线候子历回一口省度验斗术术保变土思们先装技基则马很直老方回
                    <span class='color'>【详情】</span>
                  </div>
                </div>
              </div>
              <div class='article_right_content'>
                <div><img class='right_img' :src="content" alt=""></div>
                <div class='content1'>
                  <div class='line_clamp2 title'>大标题大标题大标题大大标题标题</div>
                  <div class='copywriting_content'>
                    步区便斗造何同把律接接调广之历界的装众究阶那铁始每志相意见型前决指经影此界少较连万内别被酸置步张离。术从线候子历回一口省度验斗术术保变土思们先装技基则马很直老方回
                    <span class='color'>【详情】</span>
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

  detail(){this.$router.push({name: 'list', query: {value: 'organizeWork'}})}
  leftBtn(){}
  rightBtn(){}
  getList(){
    $http.powerList({
      organizationPowerMeunType: 1,
      organizationPowerType: this.currentMenu.index
    })
    .then(res => {
      console.log(res)
    })
  }
  mounted() {
    this.currentMenu = this.menuList[0];
    this.getList()
  }

  updateCurrentMenu(menu) {
    this.currentMenu = menu;
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
      border-radius: 10px;
      width: 709px;
      background: #fff;
      padding: 16px 18px;
      display: flex;
      margin-right: 15px;
      flex-shrink: 0;
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
