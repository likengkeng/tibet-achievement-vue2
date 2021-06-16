<template>
  <div class="list">
    <my-header @headerNav='headerNav'></my-header>
    <div class='content_box'>
        <div class='content'>
            <div class='list_box'>
                <!--<img @click='leftBtn' :src="left_icon" alt="" class='icon left'>
                <img @click='rightBtn' :src="right_icon" alt="" class='icon right'>

                <div v-for='item in list' :key='item' class='videolist' :style='{transform: `translateX(-${pageSize*100}%)`}'>
                    <video :src="item.materialVO.pathAll" class='video' :ref='`video${index}`' v-if='item.isVideo'>
                        您的浏览器不支持 video 标签。
                    </video>
                    <div class='content'>
                    <div>以习近平为团长的中央代表团抵达日喀则地区，受到各族群众热烈欢迎！</div>
                    <div class='carousel_btn_box'>
                        <div class='carousel_btn' @click='selectChange(index)' :class='{select: index == pageSize}' v-for='(item, index) in list' :key='index'></div>
                    </div>
                    </div>
                </div>-->
                <img v-if='navIndex==3 && queryValue=="leaderCare"' :src="dataList[0].leaderVO.leaderImagePathAlls[0]" alt="">
                <img v-else :src="((dataList[0] || {}).articleVO || {}).articleCoverImagePath" alt="">
            </div>
            <div class='content_bottom'>
                <div class='nav' v-if='dataObj[queryValue]'>
                    <div class='nav_btn' :class='{nav_btn_check: item.index == navIndex}' v-for='(item, index) in dataObj[queryValue].tab' :key='item.name' @click='navCheck(index)'>{{item.name}}</div>
                </div>
                <div class='data_list'>
                    <div v-for='(item, index) in dataList' :key='index' class='data_list_content'>
                        <div v-if='navIndex==3 && queryValue=="leaderCare"' @click='jump(item, "history")'>
                            <img :src="(item.articleVO || {}).leaderImagePathAlls[0]" alt="" class='data_list_img'>
                            <div clas='data_list_title line_clamp1'>{{(item.articleVO || {}).leaderName}}</div>
                            <div class='data_list_text line_clamp1 myhtml' v-html='(item.articleVO || {}).leaderComment'></div>
                            <div class='data_list_time'>{{item.time}}</div>
                        </div>
                        <div v-else @click='jump(item)'>
                            <img :src="(item.articleVO || {}).articleCoverImagePath" alt="" class='data_list_img'>
                            <div clas='data_list_title line_clamp1'>{{(item.articleVO || {}).articleTitle}}</div>
                            <div class='data_list_text line_clamp1 myhtml' v-html='(item.articleVO || {}).articleContent'></div>
                            <div class='data_list_time'>{{item.time}}</div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="left-menu">
        <anchor-navigator @headerNav='headerNav'></anchor-navigator>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/pc/components/MyHeader.vue';
    import right_icon from '@/pc/static/imgs/right_icon.png'
    import left_icon from '@/pc/static/imgs/left_icon.png'
    import $http from '@/pc/api/event';
    import AnchorNavigator from '@/pc/components/AnchorNavigator.vue';

    @Component({
    components: {
        MyHeader,
        AnchorNavigator,
    },
    })
    export default class List extends Vue {
    left_icon = left_icon
    right_icon = right_icon
    playerOptions = {};
    list = [1,2,3,4,5]
    pageSize = 0
    dataList = []
    httpKey = null
    navIndex = 1
    selectChange(index){
        this.pageSize = index
    }
    headerNav(){
        this.getList()
    }
    leftBtn(){
        console.log(this.pageSize)
        if (this.pageSize == 0) {
        return
        }
        this.pageSize -= 1
    }
    rightBtn(){
        console.log(this.pageSize)
        if (this.pageSize == this.list.length-1) {
        return
        }
        this.pageSize += 1
    }
    navCheck(index){
        this.navIndex = index +1
        this.getList()
    }
    jump(item, boo=false){
        this.$router.push({name: 'article', query: {isHistory: boo, item: JSON.stringify(item), name: this.dataObj[this.queryValue].name, index: this.dataObj[this.queryValue].index}})
    }
    queryValue = ''
    dataObj = {
        bigEvent: {
            url: 'memorabiliaList',
            name: '大事记',
            index: 3
        },
        leaderCare: {
            url: 'leaderList',
            name: '领导关怀',
                        index: 2,

            data: {leaderCareType: ''},
            tab: [
                {name: '中央领导关怀', index: 1},
                {name: '自治区党委书记', index: 2},
                {name: '历任组织部部长', index: 3},
            ]
        },
        organizeWork: {
            url: 'powerList',
            name: '组织工作',
                        index: 4,

            data: {
                organizationPowerMeunType: 1,
                organizationPowerType: ''
            },
            tab: [
                {name: '党的政治建设', index: 1},
                {name: '干部工作', index: 2},
                {name: '党的组织建设', index: 3},
                {name: '人才工作', index: 4},
                {name: '干部人才援藏工作', index: 5},
                {name: '自身建设', index: 6},
            ]
        },
        roleModel: {
            url: 'powerList',
                        name: '榜样力量',
            index: 5,

            data: {
                organizationPowerMeunType: 2,
                organizationPowerType: ''
            },
            tab: [
                    {name: '老西藏', index: 1},
                    {name: '优秀共产党员', index: 2},
                    {name: '优秀党务工作者', index: 3},
                    {name: '先进基层党组织', index: 4},
                    {name: '优秀援藏干部人才', index: 5},
                    {name: '优秀组工干部', index: 6},
                    {name: '最美公务员', index: 7},
            ]
        },
        preface: {
            url: 'prefaceList',
                        name: '序言',
            index: 1,

            data: {
                prefaceType: 2
            }
        },
        sevenGroup: {
            url: 'voiceList',
                        name: '七地之声',
            index: 6,

            data: {
                areaVoiceMeunType: '',
                areaVoiceType: 2
            },
            tab: [
                {name: '拉萨', index: 1},
                    {name: '日喀则', index: 2},
                    {name: '山南', index: 3},
                    {name: '林芝', index: 4},
                    {name: '昌都', index: 5},
                    {name: '那曲', index: 6},
                    {name: '阿里', index: 7},
            ]
        }
    }
    format(shijianchuo){
        //shijianchuo是整数，否则要parseInt转换
        var time = new Date(shijianchuo);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        return `${y}-${m}-${d}`
    }
    getList(){
        this.queryValue = this.$route.query.value
        const key = this.dataObj[this.queryValue].url
        const myobj = this.dataObj[this.queryValue].data || {}
        let mydata = {}
        for (const key in myobj) {
            if (Object.prototype.hasOwnProperty.call(myobj, key)) {
                if (sessionStorage.getItem("myqidi")) {
                    this.navIndex = sessionStorage.getItem("myqidi")
                    sessionStorage.removeItem("myqidi")
                }
                mydata[key] = myobj[key] || this.navIndex

            }
        }
            $http[key]({
                ...mydata
            })
            .then(res => {
                res?.data?.data?.map(el => {
                    el.leaderVO && (el.time = this.format(el.leaderVO.updateDatetime))
                    el.articleVO && (el.time = this.format(el.articleVO.createDatetime))
                    return el
                })
                this.dataList = res.data.data
            })
    }
    mounted(){
        this.queryValue = this.$route.query.value
        this.getList()
    }
    updated(){
        const list = Array.from(document.getElementsByClassName('myhtml'))
        list.forEach(el => {
            el.children[0]?.setAttribute('style', 'margin: 0px')
        });
    }
    }
</script>

<style scoped lang="scss">
    .list{
        padding: 25px 0px;
        min-height: 100vh;
        .content_box{
            background-image: url('/src/pc/static/imgs/detail-background.png');
            background-size: 100% 1154px;
            min-height: 1154px;
            background-repeat: no-repeat;
            .content{
                width: 1200px;
                margin: auto;
                padding: 25px 32px;
                background: #fff;
                .list_box{
                    width: 100%;
                    overflow: hidden;
                    display: flex;
                    position: relative;
                    .img{
                        height: 540px;
                        width: 100%
                    }
                    .icon{
                        width: 46px;
                        height: 36px;
                        display: block;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        z-index: 10;
                    }
                    .right{
                        right: 0px;
                    }
                    .left{
                        left: 0px;
                    }
                    .videolist{
                    width: 100%;
                    flex-shrink: 0;
                    position: relative;
                    transition: .5s;

                    .content{
                        position: absolute;
                        z-index: 9;
                        bottom: 0px;
                        width: 100%;
                        padding: 13px 24px;
                        box-sizing: border-box;
                        background: rgba(0, 0, 0, 0.5);
                        font-size: 18px;
                        color: #fff;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .carousel_btn_box{
                        display: flex;
                        .carousel_btn{
                            display: flex;
                            margin-left: 10px;
                            border-radius: 10px;
                            width: 10px;
                            height: 10px;
                            background: rgba(255, 255, 255, 0.6);
                        }
                        .select{
                            width: 20px;
                            background: #fff;
                        }
                        }

                    }
                    }
                }
                .content_bottom{
                    .nav{
                        display: flex;
                        border-top: 8px solid rgba(176, 21, 22, 1);
                        background: rgba(239, 208, 208, 1);
                        margin-top: 30px;
                        .nav_btn{
                            padding: 12px 38px 14px;
                            color: rgba(176, 21, 22, 1);
                            font-size: 16px;
                            font-weight: bold;
                            cursor: pointer;
                        }
                        .nav_btn_check{
                            color: #fff;
                            background: rgba(176, 21, 22, 1);
                        }
                    }
                    .data_list .data_list_content:nth-child(4n){
                        margin-right: 0px;
                    }
                    .data_list{
                        display: flex;
                        flex-wrap: wrap;
                        padding: 38px 32px;
                        .data_list_content{
                            padding: 10px 10px 29px;
                            box-shadow: 0px 2px 18px 0px rgba(211, 211, 211, 0.5);
                            background: #FFFFFF;
                            border-radius: 4px;
                            margin: 0px 12px 14px 0px;
                            width: 275px;
                            box-sizing: border-box;
                            cursor: pointer;
                            .data_list_img{
                                width: 255px;
                                height: 176px;
                                display: block;
                            }
                            .data_list_title{
                                font-size: 18px;
                                font-weight: bold;
                                color: #666;
                                margin: 6px 0px 10px;
                            }
                            .data_list_text{
                                font-size: 14px;
                                color: #666;
                                margin-bottom: 13px;
                                height: 20px;
                                p{
                                    margin: 0px!important;
                                }
                            }
                            .data_list_time{
                                font-size: 14px;
                                color: #666;
                            }
                        }
                    }
                }

            }
        }
        .line_clamp1 {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
        .left-menu {
            position: fixed;
            top: 400px;
            right: 160px;
        }
    }
</style>
