<template>
    <div class='article_box'>
        <my-header></my-header>
        <div class='article'>
            <div class='content'>
                <div class='content_top'>
                    <div>您的位置：首页   | {{name}} | </div>
                    <div>
                       <!-- <audio src="" controls class='audio'>
                            您的浏览器不支持 audio 标签。
                        </audio>-->
                    </div>
                </div>
                <div class='content_center'>
                    <template v-if='isHistory'>
                        <!--<div class='box'>
                            <div>
                                <div v-for='(item, index) in list[0]' class='list left_list'>
                                    <img :src="rocket" alt="" v-if='index== 0' class='rocket'>
                                    <div class='left_box'>
                                        <img :src="item.memorabiliaImagePathAlls[0]" alt="" class='img'>
                                        <div class='title'>{{item.memorabiliaTitle}}</div>
                                        <div class='text'>{{item.memorabiliaContent}}</div>
                                    </div>
                                    <div class='time'>
                                        <div class='time1' :class='{istime1: index==0}'>{{item.memorabiliaDatetime[0]}}</div>
                                        <div class='time2'>{{item.memorabiliaDatetime[1]}}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div v-for='item in list[1]' class='list right_list'>
                                    <div class='right_time'>
                                        <div class='time1'>{{item.memorabiliaDatetime[0]}}</div>
                                        <div class='time2'>{{item.memorabiliaDatetime[1]}}</div>
                                    </div>
                                    <div class='left_box'>
                                        <img :src="item.memorabiliaImagePathAlls[0]" alt="" class='img'>
                                        <div class='title'>{{item.memorabiliaTitle}}</div>
                                        <div class='text'>{{item.memorabiliaContent}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>-->
                        <div class='content_center_title'>{{memorabilia.memorabiliaTitle}}</div>
                        <div>{{memorabilia.memorabiliaContent}}</div>
                    </template>
                    <template v-else>
                        <div class='content_center_title'>{{obj.articleVO.articleTitle}}</div>
                        <div class='myhtml' v-html='obj.articleVO.articleContent'></div>
                    </template>

                </div>
                <div class='comment' v-if='obj.articleVO.articleCanDiscuss'>
                    <div class='comment_top'>
                        <span class='comment_title'>网友评论</span>
                        &nbsp;&nbsp;
                        <span class='tip'>文明上网理性发言，请遵守新闻评论服务协议</span>
                    </div>
                    <div class='comment_center'>
                        <!--<div class='header_img'></div>-->
                        <div class='input_box'>
                            <quill-editor
                                 class='textarea'
                                v-model="touristCommentContent"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                @change="onEditorChange($event)">
                            </quill-editor>
                            <div class='sumbit'>
                                <div>游客</div>
                                <div class='btn' @click='add'>发表</div>
                            </div>
                        </div>
                    </div>
                    <div class='comment_content'>
                        <div class='comment_content_title'>全部评论</div>
                        <div v-for='item in list' :key='item' class='list'>
                            <div class='list_img'></div>
                            <div>
                                <div>
                                    <div class='mb_14'>
                                        <span class='name'>游客{{item.touristId}}</span>&nbsp;&nbsp;<span class='time'>{{item.createDatetime}}</span>
                                    </div>
                                    <div v-html='item.touristCommentContent'></div>
                                </div>
                                <div v-if='item.replyList'>
                                    <div v-for='el in item.replyList' class='replyList'>
                                        <div class='mb_14'>
                                            <span class='name'>小编回复</span>
                                        </div>
                                        <div v-html='el.repContent'></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="left-menu">
    </div>

    <input type="file" id='check' multiple @change='changefile'>
    </div>

</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';
    import rocket from '@/h5/static/imgs/rocket.png'
    import { quillEditor, Quill } from "vue-quill-editor"; //调用编辑器
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { Toast } from 'vant';

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        // ['clean'],                                         // remove formatting button
        ['voice']
    ]
    @Component({
        components: {
            MyHeader,quillEditor, Quill
        },
    })
    export default class Article extends Vue {
        rocket=rocket
        editorOption: any = {
            modules: {
            toolbar: {
                container: toolbarOptions,  // 工具栏
                handlers: {
                'image': function (value) {
                    if (value) {
                    document.getElementById('check').click()
                    } else {
                    this.quill.format('image', false);
                    }
                },
                'video': function (value) {
                    if (value) {
                        document.getElementById('check').click()
                    } else {
                    this.quill.format('video', false);
                    }
                },
                'voice': function(value){ //添加工具方法，即点击时模仿点击上传组件的按钮
                    if (value) {
                    document.getElementById('check').click()
                    } else {
                    this.quill.format('voice', false);
                    }
                }
                }
            }
            },
            initVoiceButton:function(){ //初始化"voice"按钮样式
            // let voiceButton = document.querySelector('.ql-voice'); //"ql-" 是插件自动加的前缀
            // voiceButton.classList.add('fa');
            // voiceButton.classList.add('fa-volume-up');
            // voiceButton.classList.add('fa-lg');
                // 当然，可以直接手写样式，如：
            // voiceButton.style.csstext = "width:80px; border:1px solid #ccc; border-radius:5px;";
            // voiceButton.innertext="上传音频";
            // const sourceEditorButton = document.querySelector('.ql-voice');
            // sourceEditorButton.style.cssText = "width:50px; border:1px solid #ccc; border-radius:5px;";
            // sourceEditorButton.innerText="音频"
            }
        }
        isHistory = false
        get editor() {
            return this.$refs.myQuillEditor.quill
        }
        onEditorReady(editor) { // 准备编辑器

        }
        onEditorBlur(){} // 失去焦点事件
        onEditorFocus(){} // 获得焦点事件
        onEditorChange(){} // 内容改变事件
        list = []
        obj = {articleVO:{}}
        name = ''
        touristCommentContent = ''
        uploadData = {}
        // 类型 1==序言 2==领导关怀 3==大事记 4==组织工作 5==榜样力量 6==七地组声
        idObj = ['', 'prefaceId', 'leaderCareId', 'memorabiliaId', 'organizationPowerId', 'organizationPowerId', 'areaVoiceId']
        add(){
            if (!this.touristCommentContent) {
                return
            }
            if (localStorage.getItem('touristId') || localStorage.getItem('touristId') == 'undefined') {
                this.httpAdd()
            } else {
                 $http.touristCreate()
                .then(res => {
                    localStorage.setItem('touristId', res.data.data.id)
                    this.httpAdd()
                })
            }

        }
        httpAdd(){
            const idKey = this.idObj[this.$route.query.index]
            $http.commentAdd({
                touristId: localStorage.getItem('touristId'),
                touristCommentType: this.$route.query.index,
                articleId: this.obj.articleVO.articleId,
                [idKey]: this.obj[idKey],
                touristCommentContent: this.touristCommentContent
            })
            .then(res => {
                Toast('提交成功');
                this.touristCommentContent = ''
                // this.getList()
            })
        }
        headerNav(){}
        getList(){
            this.obj = JSON.parse(this.$route.query.item)
            this.name = this.$route.query.name
            console.log(222)
            $http.commentList({
                articleId: this.obj.articleId || this.obj.leaderCareId,
                touristCommentType: this.$route.query.index
            })
            .then(res => {
                console.log(res.data.data)
                res.data?.data?.map((el, index) => {
                    el.createDatetime = this.format(el.createDatetime)
                    el.replyList?.map(ele => {
                        ele.createDatetime = this.format(ele.createDatetime)
                        return ele
                    })
                    return el
                })
                console.log(res.data)
                this.list = res.data.data
            })
        }
        memorabilia = {}
        getMemorabiliaList(){
            this.memorabilia = JSON.parse(this.$route.query.item)
            // $http.memorabiliaList()
            // .then(res => {
            //     let arr1 = [], arr2 = []
            //     res.data.data.map((el, index) => {
            //         el.memorabiliaDatetime = this.format1(el.memorabiliaDatetime)
            //         if (index%2==0) {
            //             arr1.push(el)
            //         } else {
            //             arr2.push(el)
            //         }
            //         return el
            //     })

            //     this.list = [arr1, arr2]
            // })
        }
        format(shijianchuo){
            //shijianchuo是整数，否则要parseInt转换
            var time = new Date(shijianchuo);
            var y = time.getFullYear();
            var m = time.getMonth()+1;
            var d = time.getDate();
            var h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
            var mm = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
            var s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
            return `${y}-${m}-${d} ${h}:${mm}:${s}`
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
        mounted(){
            this.editorOption.initVoiceButton();
            this.isHistory = this.$route.query.isHistory
            if (typeof this.isHistory == 'string') {
                this.isHistory = this.$route.query.isHistory != 'false'
            }
            this.name = this.$route.query.name
            if (this.isHistory) {
                this.getMemorabiliaList()
            } else {
                this.getList()
            }
        }
        changefile(e){
            const con = document.getElementById('check')
            console.log(con.files,con.files.length )
            if (con.files.length > 1) {
                this.$message('最多1张')
                return
            }
            if (con.files[0].size  > 5 * 1024 * 1024) {
                 this.$message('文件最大5M')
                return
            }
            if (con.files[0].type.str.match(RegExp(/video/))) {
                if (!con.files[0].type.str.match(RegExp(/mp4/))) {
                    this.$message('视频格式只允许mp4')
                    return
                }
            }
            if (con.files[0].type.str.match(RegExp(/audio/))) {
                if (!con.files[0].type.str.match(RegExp(/mpeg/)) || !con.files[0].type.str.match(RegExp(/mp3/)) ) {
                    this.$message('音频格式只允许mp3')
                    return
                }
            }
            if (con.files[0]) {
                let file = con.files;
                let param = new FormData(); //创建form对象
                param.append("files", file[0]); //通过append向form对象添加数据
                $http.fileUpload(param).then((res) => {
                    this.uploadSuccess(res.data)
                });

            }
        }
        uploadSuccess(res){
            console.log(res)
            let key = 'img'
            if (res.data.stffix == 'mp4') {
            key = 'video'
            }
            if (res.data.stffix == 'mp3') {
            key = 'audio'
            }
            let quill = this.editor
            let length = quill.getSelection().index;  // 获取光标所在位置

            let BlockEmbed = Quill.import('blots/block/embed');
            class AudioBlot extends BlockEmbed {
                static create(value) {
                console.log(value)
                let node = super.create();
                node.setAttribute('src', value.url);      //设置audio的src属性
                node.setAttribute('controls', true);      //设置audio的controls，否则他将不会显示
                node.setAttribute('controlsList', 'nodownload');      //设置audio的下载功能为不能下载
                node.setAttribute('id', 'voice');         //设置一个id
                return node;
                }
            }
            AudioBlot.blotName = key;
            AudioBlot.tagName = key;      //自定义的标签为audio
            Quill.register(AudioBlot);

            // insertEmbed(index: Number(插入的位置), type: String(标签类型), value: any(参数，将传入到create的方法中去), source: String = 'api')
            quill.insertEmbed(length, key,  {url: res.data.pathAll}, "api");
            quill.setSelection(length + 1);  //光标位置向后移动一位

        }
    }
</script>
<style scoped lang="scss">
    .article_box{

        // background: #F1F1F1;
        .left-menu {
            position: fixed;
            top: 400px;
            right: 160px;
        }
    }
    .article{
        // background-image: url('/src/h5/static/imgs/organize-work_background.png');
        // background-size: 100% 1261px;
        // background-repeat: no-repeat;
        padding: 14px;
        .content{
            width: 100%;
            margin: auto;
            padding: 30px 0px;
            .content_top{
                font-size: 16px;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            .content_center{
                border-radius: 10px;
                background: #FFFFFF;
                // padding: 14px;
                margin-bottom: 23px;
                .content_center_title{
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin-bottom: 28px;
                }
            }
            .comment{
                border-radius: 10px;
                background: #FFFFFF;
                padding: 27px 0px;
                .comment_top{
                    margin-bottom: 27px;
                    .comment_title{
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .tip{
                        font-size: 15px;
                    }
                }
                .comment_center{
                    display: flex;
                    margin-bottom: 34px;
                    .header_img{
                        width: 56px;
                        height: 56px;
                        border-radius: 50%;
                        flex-shrink: 0;
                        margin-right: 20px;
                    }
                    .input_box{
                        flex-grow: 1;
                    }
                    .textarea{
                        width: 100%;
                        // height: 106px;
                        padding: 12px;
                        margin-bottom: 27px;
                        box-sizing: border-box;
                    }
                    .sumbit{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .btn{
                            width: 95px;
                            height: 32px;
                            text-align: center;
                            line-height: 32px;
                            background: #D52B2B;
                            border-radius: 4px;
                            font-size: 15px;
                            color: #fff;
                            cursor: pointer;
                        }
                    }
                }
                .comment_content{
                    .comment_content_title{
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 34px;
                    }
                    .list{
                        margin-bottom: 14px;
                        display: flex;
                        .list_img{
                            width: 40px;
                            height: 40px;
                            display: block;
                            margin-right: 11px;
                        }
                        .name{
                            color: #941C1C;
                            font-size: 15px;
                        }
                        .time{
                            color: #999999;
                            font-size: 15px;
                        }
                        .mb_14{
                            margin-bottom: 14px;
                        }
                    }
                }
            }
        }

    }
    
    .replyList{
        display: flex;
        .name{
            flex-shrink: 0
        }
    }
    #check{
        display: none
    }
    ::v-deep .ql-toolbar.ql-snow + .ql-container.ql-snow{
        height:100px
    }
    .box .right_list:first-child{
        margin-top: 180px;
    }
    .box{
        display: flex;
        justify-content: center;
        .istime1.time1::before{
            display: none
        }
        .rocket{
            width: 40px;
            height: 51px;
            position: absolute;
            right: -35px;
            top: 23px
        }
        .list{
            display: flex;
            padding-bottom: 60px;
            position: relative;
        }
        .left_list::before{
            content: '';
            display: block;
            width: 6px;
            height: 100%;
            background: rgba(228, 228, 228, 1);
            position: absolute;
            right: -18px;
            top: 0px
        }
        .right_list{
            // margin-top: 180px;
        }
        .left_box{
            box-shadow: 0px 2px 18px 0px rgba(213, 152, 152, 0.5);
            background: #FFFFFF;
            border-radius: 6px;
            border: 1px solid #F3D9D9;
            padding: 15px 14px;
            .img{
                width: 335px;
                height: 213px;
                display: block
            }
            .title{
                margin: 19px 11px;
                font-size: 20px;
                font-weight: 600;
            }
            .text{
                font-size: 14px
            }
        }
        .time{
            margin: 23px 18px 0px 12px
        }
        .right_time{
            margin: 23px 25px 0px 43px
        }
        .time1{
            font-weight: 600;
            font-size: 28px;
            position: relative;
        }
        .time1::before{
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

        .right_list{
            .time1::before{
                right: 82px
            }
        }

        .time2{
            font-size: 18px;
        }
    }
</style>
<style lang='scss'>
    .myhtml{   
        img{
            max-width: 100%
        }
        video{
            max-width: 100%
        }
        audio{
            max-width: 100%
        }
    }
</style>
