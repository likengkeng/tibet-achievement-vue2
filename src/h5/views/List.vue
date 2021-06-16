<template>
  <div class="list">
    <my-header @headerNav='headerNav'></my-header>
    <div v-if='tab'>
        <van-tabs title-active-color="#BA0C00FF" v-model='navIndex' color='#BA0C00FF' @click="navTab">
        <van-tab v-for="item in tab" :title="item.text" :key='item.text'>
        </van-tab>
        </van-tabs>
    </div>
    
    <div class='data_list'>
        <div v-for='(item, index) in dataList' :key='index' class='data_list_content'>
            <div v-if='navIndex==3 && queryValue=="leaderCare"' @click='jump(item, "history")'>
                <img :src="item.leaderVO.leaderImagePathAlls[0]" alt="" class='data_list_img'>
                <div clas='data_list_title line_clamp1'>{{item.leaderVO.leaderName}}</div>
                <div class='data_list_text line_clamp1 myhtml' v-html='item.leaderVO.leaderComment'></div>
            </div>
            <div v-else @click='jump(item)'>
                <img :src="item.articleVO.articleCoverImagePath" alt="" class='data_list_img'>
                <div clas='data_list_title line_clamp1'>{{item.articleVO.articleTitle}}</div>
                <div class='data_list_text myhtml' v-html='item.articleVO.articleContent'></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';

    @Component({
    components: {
        MyHeader
    },
    })
    export default class List extends Vue {
        list = []
        pageSize = 0
        dataList = []
        httpKey = null
        navIndex = 0
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
        navTab(){
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
                index: 3,
                tab: null
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
                    mydata[key] = myobj[key] || this.navIndex+1

                }
            }
                $http[key]({
                    ...mydata
                })
                .then(res => {
                    res.data.data.map(el => {
                        el.leaderVO && (el.time = this.format(el.leaderVO.updateDatetime))
                        el.articleVO && (el.time = this.format(el.articleVO.createDatetime))
                        return el
                    })
                    this.dataList = res.data.data
                })
        }
        tab = null
        mounted(){
            this.queryValue = this.$route.query.value
            this.getList()
            this.tab = this.dataObj[this.queryValue].tab
        }
        updated(){
            const list = Array.from(document.getElementsByClassName('myhtml'))
            list.forEach(el => {
                el.children[0].setAttribute('style', 'margin: 0px')
            });
        }
    }
</script>

<style scoped lang="scss">
    .data_list{
        padding: 12px 12px 22px;
        min-height: 100vh;
        .data_list_content{
            background: #fff;
        }
        .data_list_title{
            font-size: 16px;
            font-weight: 500;
        }

        .myhtml{
            height: 80px;
            overflow: hidden;
        }
        .line_clamp1 {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
    }
</style>
