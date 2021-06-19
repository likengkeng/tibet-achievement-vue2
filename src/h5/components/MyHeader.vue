<template>
  <div class="my_header">
    <div class='my_header_top'>
        <div class=' my_header_top_left'>
            <img :src="ghIcon" alt="" class='gh_icon'>
            <div class='title_icon'>西藏组织工作成就展</div>
        </div>
        <div class='icon_2' @click='isShow = !isShow'></div>
    </div>
    <div class='my_header_bottom' v-show='isShow'>
        <div class='list' v-for='(item, index) in myList' :key='item.text' @click='nav(item, index)'>{{item.text}}</div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import ghIcon from '@/pc/static/imgs/gh_icon.png'
    @Component({
    })
    export default class MenuHeader extends Vue {
        ghIcon = ghIcon
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
                text: '大事记',
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
        isShow = false
        nav(item, index){
            if (this.$route.name == 'list') {
                this.selectValue = item.value
                this.$router.push(item.myroute)
                this.$emit('headerNav', item.value)
            } else {
                this.$router.push(item.myroute)
            }
        }
        // getList(){
            

        // }
        mounted(){
            // this.selectValue = this.$route.query.value
            // this.getList()
        }
    }
</script>
<style scoped lang="scss">
    .my_header{
        position: relative;
        background: rgba(148, 7, 8, 1);
        padding: 0px 18px 0px 12px;
        .my_header_top{
            height: 68px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .my_header_top_left{
                display: flex;
                align-items: center;
                .gh_icon{
                    width: 40px;
                    height: 38.5px;
                    display: block;
                    margin-right: 7px;
                }
                .title_icon{
                    color: #EECA82;
                    font-size: 16px;
                }
            }

            .icon_2{
                height: 3px;
                width: 20px;
                background: #fff;
                padding: 3px 0px;
                border-top: 3px solid #fff;
                border-bottom: 3px solid #fff;
                background-clip: content-box;
            }
        }
        .my_header_bottom{
            background: #fff;
            width: 110px;
            box-shadow: 0px 2px 4px 0px rgba(200, 200, 200, 0.5);
            padding: 0px 21px;
            position: absolute;
            right: 0px;
            z-index: 9999;
            .list{
                padding: 12px 0px;
            }
        }
    }
</style>
