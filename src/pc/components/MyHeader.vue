<template>
  <div class="my_header">
    <div class='my_header_top'>
        <div class=' my_header_top_left'>
            <img :src="ghIcon" alt="" class='gh_icon'> 
            <img :src="titleIcon" alt="" class='title_icon'>
        </div>
        <img :src="icon2" alt="" class='icon_2'>
    </div>
    <div class='my_header_bottom'>
        <div class='content'>
            <div class='list' :class='{select: item.value==selectValue}' v-for='(item, index) in myList' :key='item.text' @click='nav(item, index)'>{{item.text}}</div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ghIcon from '@/pc/static/imgs/gh_icon.png'
import titleIcon from '@/pc/static/imgs/title_icon.png'

import icon2 from '@/pc/static/imgs/100_icon.png'
@Component({
  
})
export default class MenuHeader extends Vue {
    ghIcon = ghIcon
    titleIcon = titleIcon
    icon2 = icon2
    myList = [
        {
            text: '首页',
            value: 'indexPage',
            myroute: {name: 'home'}
        },
        {
            text: '序言',
            value: 'preface',
            myroute: {name: 'list', query: {value: 'preface'}}
        },
        {
            text: '领导关怀',
            value: 'leaderCare',
            myroute: {name: 'list', query: {value: 'leaderCare'}}
        },
        {
            text: '大事件',
            value: 'bigEvent',
            myroute: {name: 'list', query: {value: 'bigEvent'}}
        },
        {
            text: '组织工作',
            value: 'organizeWork',
            myroute: {name: 'list', query: {value: 'organizeWork'}}
        },
        {
            text: '榜样力量',
            value: 'roleModel',
            myroute: {name: 'list', query: {value: 'roleModel'}}
        },
        {
            text: '七地组声',
            value: 'sevenGroup',
            myroute: {name: 'list', query: {value: 'sevenGroup'}}
        },
    ]
    selectValue = ''
    nav(item, index){
        if (this.$route.name == 'list') {
            this.selectValue = item.value
            this.$router.push(item.myroute)
            this.$emit('headerNav', item.value)
        } else {
            this.$router.push(item.myroute)
        }
    }
    getList(){
        console.log(this.selectValue)

    }
    mounted(){
        this.selectValue = this.$route.query.value
        this.getList()
    }
}
</script>
<style scoped lang="scss">
    .my_header{
        .my_header_top{
            width: 1200px;
            margin: 10px auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            // padding-top: 10px 0px;
            .my_header_top_left{
                display: flex;
                align-items: center;
                .gh_icon{
                    width: 44px;
                    height: 47px;
                    display: block;
                    margin-right: 17px;
                }
                .title_icon{
                    width: 269px;
                    height: 37px;
                    display: block;
                }
            }
            
            .icon_2{
                width: 100px;
                height: 74px;
                display: block;
            }
        }
        .my_header_bottom{
            background: #940708;
            height: 68px;
            line-height: 68px;
            .content{
                width: 1200px;
                margin: auto;
                display: flex;
                .list{
                    width: 168px;
                    text-align: center;
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                }
                .select{
                    background: #7A0001;
                }
            }
        }
    }
</style>
