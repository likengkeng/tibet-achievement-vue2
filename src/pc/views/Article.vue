<template>
    <div class='article_box'>
        <my-header></my-header>
        <div class='article'>
            <div class='content'>
                <div class='content_top'>
                    <div>您的位置：首页   | 七地组声 | </div>
                    <div>
                        <audio src="" controls class='audio'>
                            您的浏览器不支持 audio 标签。
                        </audio>
                    </div>
                </div>
                <div class='content_center'>
                    <div class='content_center_title'>「拉萨」党的十八大以来拉萨市组织工作综述</div>
                    <div></div>
                </div>
                <div class='comment'>
                    <div class='comment_top'>
                        <span class='comment_title'>网友评论</span>
                        &nbsp;&nbsp;
                        <span class='tip'>文明上网理性发言，请遵守新闻评论服务协议</span>
                    </div>
                    <div class='comment_center'>
                        <div class='header_img'></div>
                        <div class='input_box'>
                            <textarea class='textarea' name="" id="" placeholder="说两句吧"></textarea>
                            <div class='sumbit'>
                                <div>游客</div>
                                <div class='btn'>发表</div>
                            </div>
                        </div>
                    </div>
                    <div class='comment_content'>
                        <div class='comment_content_title'>全部评论</div>
                        <div v-for='item in list' :key='item' class='list'>
                            <div class='list_img'></div>
                            <div>
                                <div class='mb_14'>
                                    <span class='name'>游客1</span>&nbsp;&nbsp;<span class='time'>2020.06.29 13:00</span>
                                </div>
                                <div>
                                    确石林六立件劳必精斗眼料部比众认路民声况京须意九西上白第想度级自并体按油。增民都并物在来需几机般写确记面龙育价果律严出群地意平队议族九见按适学物情备最间内层专热中重接人规设感应。华或行志量低越期期采反京红业极收术报型采是称今低达广越许研证车体音得何口细千权题将 
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
    import MyHeader from '@/pc/components/MyHeader.vue';
    @Component({
        components: {
            MyHeader
        },
    })
    export default class Article extends Vue {
        list = [1,21,11,111,1111,11111,111111,1111111]
    }
</script>
<style scoped lang="scss">
.article_box{
    
background: #F1F1F1;
}
    .article{
        background-image: url('/src/pc/static/imgs/organize-work_background.png');
        background-size: 100% 1261px;
        background-repeat: no-repeat;
        .content{
            width: 1200px;
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
                padding: 44px 159px 64px 147px;
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
                padding: 27px 32px;
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
                        height: 106px;
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
                            width: 50px;
                            height: 50px;
                            display: block;
                            margin-right: 22px;
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
</style>