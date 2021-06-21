<template>
  <div class="list">
    <my-header @headerNav='headerNav'></my-header>
    <div class='content_box'>
        <div class='adress'>
            <div>您的位置：首页  | {{name}} | </div>
            <div>
                <!-- <audio src="" controls class='audio'>
                    您的浏览器不支持 audio 标签。
                </audio>-->
            </div>
        </div>
        <div v-if='isBigEvent' class='bigEvent_box'>
            
            <div class='content_center'>
                <div class='big_box'>
                    <div>
                        <div v-for='(item, index) in bigEventList[0]' class='big_list big_left_list' @click='bigjump(item)'>
                            <img :src="rocket" alt="" v-if='index== 0' class='big_rocket'>
                            <div class='big_left_box'>
                                <video v-if='item.fileType=="mp4"' :src="(item.memorabiliaImagePathAlls||[])[0]" class='big_img'>
                                    您的浏览器不支持 video 标签。
                                </video>
                                <audio :src="(item.memorabiliaImagePathAlls||[])[0]" controls class='big_img' v-else-if='item.fileType=="mp3"'>
                                您的浏览器不支持 audio 标签。
                                </audio>
                                <img :src="(item.memorabiliaImagePathAlls||[])[0]" alt="" class='big_img' v-else>
                                <div class='big_title'>{{item.memorabiliaTitle}}</div>
                                <div class='big_text'>{{item.memorabiliaContent}}</div>
                            </div>
                            <div class='big_time'>
                                <div class='big_time1' :class='{big_istime1: index==0}'>{{item.memorabiliaDatetime[0]}}</div>
                                <div class='big_time2'>{{item.memorabiliaDatetime[1]}}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div v-for='item in bigEventList[1]' class='big_list big_right_list' @click='bigjump(item)'>
                            <div class='big_right_time'>
                                <div class='big_time1'>{{item.memorabiliaDatetime[0]}}</div>
                                <div class='big_time2'>{{item.memorabiliaDatetime[1]}}</div>
                            </div>
                            <div class='big_left_box'>
                                <video v-if='item.fileType=="mp4"' :src="(item.memorabiliaImagePathAlls||[])[0]" class='big_img'>
                                    您的浏览器不支持 video 标签。
                                </video>
                                <audio :src="(item.memorabiliaImagePathAlls||[])[0]" controls class='big_img' v-else-if='item.fileType=="mp3"'>
                                您的浏览器不支持 audio 标签。
                                </audio>
                                <img :src="(item.memorabiliaImagePathAlls||[])[0]" alt="" class='big_img' v-else>
                                <div class='big_title'>{{item.memorabiliaTitle}}</div>
                                <div class='big_text'>{{item.memorabiliaContent}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='content' v-else>
            <div class='list_box'>
                <img class='img' v-if='navIndex==3 && queryValue=="leaderCare"' :src="(dataList[0].leaderVO||{}).leaderImagePathAlls[0]" alt="">
                <img class='img' v-else :src="((dataList[0] || {}).articleVO || {}).articleCoverImagePath" alt="">
            </div>
            <div class='content_bottom'>
                <div class='nav' v-if='(dataObj[queryValue]||{}).tab'>
                    <div class='nav_btn' :class='{nav_btn_check: item.index == navIndex}' v-for='(item, index) in (dataObj[queryValue].tab||[])' :key='item.name' @click='navCheck(index)'>{{item.name}}</div>
                </div>
                <div class='data_list'>
                    <div v-for='(item, index) in dataList' :key='index' class='data_list_content'>
                        <div v-if='navIndex==3 && queryValue=="leaderCare"' @click='jump(item, "history")'>
                            <img :src="(item.leaderVO || {}).leaderImagePathAlls[0]" alt="" class='data_list_img'>
                            <div clas='data_list_title line_clamp1'>{{(item.leaderVO || {}).leaderName}}</div>
                            <div class='data_list_text line_clamp1 myhtml' v-html='(item.leaderVO || {}).leaderComment'></div>
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
    import rocket from '@/pc/static/imgs/rocket.png'

    @Component({
    components: {
        MyHeader,
        AnchorNavigator,
    },
    })
    export default class List extends Vue {
        rocket = rocket
        left_icon = left_icon
        right_icon = right_icon
        playerOptions = {};
        list = [1,2,3,4,5]
        pageSize = 0
        dataList = []
        httpKey = null
        navIndex = 1
        isBigEvent = false
        name = ''
        selectChange(index){
            this.pageSize = index
        }
        headerNav(){
            this.queryValue = this.$route.query.value
            console.log(this.$route.query)
            this.isBigEvent = this.$route.query.isBigEvent
            this.name = this.dataObj[this.queryValue].name
            if (this.isBigEvent) {
                this.getBigEvent()
            } else {
                this.getList()
            }
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
            if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
                window.open(item.articleVO.articleSuperUrl)
                return
            }
            this.$router.push({name: 'article', query: {isHistory: boo, item: JSON.stringify(item), name: this.dataObj[this.queryValue].name, index: this.dataObj[this.queryValue].index}})
        }
        bigjump(item){
            if (item.articleVO?.articleType == 2 && item.articleVO?.articleSuperUrl) {
                window.open(item.articleVO.articleSuperUrl)
                return
            }
            this.$router.push({name: 'article', query: {
                isHistory: true,
                item: JSON.stringify(item), 
                name: '大事记', 
                index: 3
            }})
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
                    console.log(res)
                    res?.data?.data?.map(el => {
                        el.leaderVO && (el.time = this.format(el.leaderVO.updateDatetime))
                        el.articleVO && (el.time = this.format(el.articleVO.createDatetime))
                        return el
                    })
                    this.dataList = res.data.data
                })
        }
        format1(shijianchuo){
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
            var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
            var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
            return [`${y}`, `${m}月${d}日`]
        }
        bigEventList = []
        getBigEvent(){
            $http.memorabiliaList()
            .then(res => {
                let arr1 = [], arr2 = []
                res?.data?.data?.map((el, index) => {
                    el.memorabiliaDatetime = this.format1(el.memorabiliaDatetime)
                    const i = el.memorabiliaImagePathAlls[0].lastIndexOf(".")
                    console.log(i)
                    const fileType = el.memorabiliaImagePathAlls[0].substr(i + 1)
                    console.log(fileType)
                    el.fileType = fileType
                    if (index%2==0) {
                        arr1.push(el)
                    } else {
                        arr2.push(el)
                    }
                    return el
                })

                this.bigEventList = [arr1, arr2]
            })
        }
        mounted(){
            this.queryValue = this.$route.query.value
            console.log(this.$route.query)
            this.isBigEvent = this.$route.query.isBigEvent
            this.name = this.dataObj[this.queryValue].name
            if (this.isBigEvent) {
                this.getBigEvent()
            } else {
                this.getList()
            }
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
    .bigEvent_box{
        width: 1200px;
        margin: auto;
    }
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
                box-sizing: border-box;
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
                            padding: 12px 30px 14px;
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
                            width: 259px;
                            box-sizing: border-box;
                            cursor: pointer;
                            .data_list_img{
                                width: 100%;
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
    .big_box .big_right_list:first-child{
        margin-top: 180px;
    }
    .adress{
        font-size: 16px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0px;
        width: 1200px;
        margin: auto;
    }
    .content_center{
        border-radius: 10px;
        background: #FFFFFF;
        padding: 44px 159px 64px 147px;
        width: 1200px;
        box-sizing: border-box;
        margin: auto;
        .content_center_title{
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 28px;
        }
    }
    .big_box{
        display: flex;
        justify-content: center;
        .big_istime1.big_time1::before{
            display: none
        }
        .big_rocket{
            width: 40px;
            height: 51px;
            position: absolute;
            right: -35px;
            top: 23px
        }
        .big_list{
            display: flex;
            padding-bottom: 60px;
            position: relative;
        }
        .big_left_list::before{
            content: '';
            display: block;
            width: 6px;
            height: 100%;
            background: rgba(228, 228, 228, 1);
            position: absolute;
            right: -18px;
            top: 0px
        }
        .big_right_list{
            // margin-top: 180px;
        }
        .big_left_box{
            box-shadow: 0px 2px 18px 0px rgba(213, 152, 152, 0.5);
            background: #FFFFFF;
            border-radius: 6px;
            border: 1px solid #F3D9D9;
            padding: 15px 14px;
            .big_img{
                width: 335px;
                height: 213px;
                display: block
            }
            .big_title{
                margin: 19px 11px;
                font-size: 20px;
                font-weight: 600;
            }
            .big_text{
                font-size: 14px
            }
        }
        .big_time{
            margin: 23px 18px 0px 12px
        }
        .big_right_time{
            margin: 23px 25px 0px 43px
        }
        .big_time1{
            font-weight: 600;
            font-size: 28px;
            position: relative;
        }
        .big_time1::before{
            content: '';
            display: block;
            position: absolute;
            top: 50%;
            right: -48px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            box-sizing: border-box;
            background: rgba(163, 163, 163, 0.75);
            box-shadow: 0px 2px 18px 0px rgba(163, 163, 163, 0.75);
            border: 5px solid #fff;
            transform: translateY(-50%)
        }

        .big_right_list{
            .big_time1::before{
                right: 82px
            }
        }

        .big_time2{
            font-size: 18px;
        }
    }
</style>
