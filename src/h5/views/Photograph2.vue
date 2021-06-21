<template>
  <div class="photo">
    <!--<my-header></my-header>-->
    <img :src="dowload" class='icon'  @click='mycanvas' alt="" crossOrigin='anonymous'>
    <div class='showimg'>
      <img :src="showSrc" ref='rhimg' alt="" class='img'>
      <img class='canvasimg' ref='canvasimg' :src="canvas1" alt="">
    </div>
    
    <div class='list_box'>
      <div class='list'>
        <div v-for='item in list' :key='item.name'>
          <div class='img_box'>
            <img class='list_img' :src="item.img" alt="" @click='chang(item)'>
          </div>
          <div class='name'>{{item.name}}</div>
        </div>
      </div>
    </div>
    <canvas v-show='false' ref='myCanvas' class='myCanvas'></canvas>
    <img :src="code" alt="" ref='code' v-show='false'>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';
    import dowload from '@/h5/static/imgs/dowload.png'
    import canvas1 from '@/h5/static/imgs/canvas.png'
    // import ceshi from '@/h5/static/imgs/ceshi.jpg'

    import template1 from '@/h5/static/imgs/template1.png'
    import template2 from '@/h5/static/imgs/template2.png'
    import template3 from '@/h5/static/imgs/template3.png'
    import template4 from '@/h5/static/imgs/template4.png'
    import template5 from '@/h5/static/imgs/template5.png'
    import template6 from '@/h5/static/imgs/template6.png'
    import template7 from '@/h5/static/imgs/template7.png'
    import code from '@/h5/static/imgs/code.png'
    import '@/h5/static/facepp_sdk/jquery.min.js'
    import '@/h5/static/facepp_sdk/exif.js'
    import FACEPP from '@/h5/static/facepp_sdk/facepp_sdk.js'
    import { Notify } from 'vant';
    import { Toast } from 'vant';
    @Component({
    components: {
        MyHeader
    },
    })
    export default class Photograph2 extends Vue {
        facepp = new FACEPP('ZZB6CifNdU01PxaPobUM1-DxmqoykgVv','Gx4MwKDPHzjYXulPcfG5LFGxShF1ptr6',1);
        routeSrc = ''
        templateImg = ''
        showSrc = ''
        canvas1 = canvas1
        dowload = dowload
        code = code
        list = [
          {img: template1, name: '雅砻藏族'},
          {img: template2, name: '康区藏装'},
          {img: template3, name: '汉服女'},
          {img: template4, name: '安多藏装'},
          {img: template5, name: '中山装'},
          {img: template6, name: '后藏藏装'},
          {img: template7, name: '拉萨藏装'},
        ]
        chang(item){
          this.templateImg = item.img
          this.fuse()
        }
        mycanvas(){
          var c=this.$refs.myCanvas
          var ctx=c.getContext("2d");
          var showimg=this.$refs.rhimg
          const canvasimg = this.$refs.canvasimg
          ctx.drawImage(showimg,0,0, c.width, c.height - 350);
          ctx.drawImage(canvasimg,0,0, c.width, c.height - 350);

          const code = this.$refs.code
          ctx.drawImage(code,0, c.height - 350, c.width, 350);

          this.download()
        }
        imgType(ty) {
            let type = ty.toLowerCase().replace(/jpg/i, 'jpeg');
            var r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/' + r;
        }
        download() {
          const cans = this.$refs.myCanvas
          let type = 'png';   //设置下载图片的格式
          let img_png_src = cans.toDataURL("image/png");  //将canvas保存为图片
          let imgData = img_png_src.replace(this.imgType(type),'image/octet-stream');
          let filename = '图片' + '.' + type; //下载图片的文件名
          this.saveFile(imgData,filename);
        }
        saveFile(data, fileName){
            let save_link = document.createElement('a');
            save_link.href = data;
            save_link.download = fileName;
    
            let event = document.createEvent('MouseEvents');
            event.initEvent("click", true, false);
            save_link.dispatchEvent(event);
        }
        image2Base64(img) {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL;
        }
        // 融合
        fuse(){
          Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '加载中...',
          });
          const vm = this
          var img = new Image();
          img.src= this.templateImg;
          img.onload=function(){
              const base64 = vm.image2Base64(img);
              console.log(base64)
              const mergePara = {"template_base64": base64, "merge_base64" : vm.routeSrc  };
              vm.facepp.mergeFace(mergePara,vm.handleSuccess,vm.handleError);
          }
        }
        handleSuccess(e) {
          Toast.clear()
          console.log(e)
          const base64Image  = 'data:image/jpg;base64,' + e.result;
          this.showSrc = base64Image
        }
        handleError(){
          Toast.clear()
          Notify('失败');
        }

        mounted(){
          this.routeSrc = this.$route.query.src
          console.log(this.$route.query)
          this.templateImg = this.list[this.$route.query.index].img
          if (this.routeSrc) {
            this.fuse()
          }
          this.$nextTick(() => {
            this.$refs.myCanvas.width = window.innerWidth * 2;
			      this.$refs.myCanvas.height = window.innerHeight * 2;
          })
          
          
          
        }

        afuse(){
          const params = {
            Action: 'FaceFusion',
            Version: '2018-12-01',
            ProjectId: '306673',
            ModelId: 'qc_306673_360696_4',
            Image: '',
            RspImgType: 'url'
          };
          Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '加载中...',
          });
          const vm = this
          var img = new Image();
          img.src= this.templateImg;
          img.onload=function(){
              params.Image = vm.image2Base64(img);
              client.FaceFusion(params).then(
                (data) => {
                  console.log(data);
                },
                (err) => {
                  console.error("error", err);
                }
              );
          }
        }
    }
</script>

<style scoped lang="scss">
    .photo{
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    .showimg{
      width: 100vw;
      flex-grow: 1;
      position: relative
    }
    .img{
      width: 100%;
      display: block;
    }
    .canvasimg{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
    .list_box{
      width: 100vw;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .list{
      height: 158px;
      padding-top: 11px;
      box-sizing: border-box;
      background: #fff;
      display: flex;
    }
    .img_box{
      width: 60px;
      height: 60px;
      border-radius: 50%;
      overflow: hidden;
            margin: 0px 18px 9px; 
                  flex-shrink: 0;


    }
    .list_img{
      width: 60px;
      height: auto;
      display: block
    }
    .name{
      font-size: 14px;
      text-align: center
    }
    .icon{
      font-size: 30px;
      position: fixed;
      right: 30px;
      top: 30px;
      z-index: 9999
    }
</style>
