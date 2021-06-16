<template>
  <div class="Photograph1">
    <my-header class='flex_s0'></my-header>
    <video id="video" ref='video' class='flex_g1 video' autoplay="autoplay" v-if='!img'></video>
    <img :src="img" alt="" class='flex_g1 video' v-else>
    <div class='camera flex_s0'>
      <div class='camera3_box' @click='upload'>
        <img :src="camera3" alt="" class='camera3'>
        <p>相册</p>
      </div>
      <img :src="camera1" alt="" class='camera1' @click='photograph'>
      <img :src="camera2" alt="" class='camera2' @click='select'>
    </div>
    <canvas class='canvas' ref='canvas'></canvas>
    <input class='canvas' type="file" ref='file' accept="image/*" name="image" @change="getFile($event)" >
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';
    import camera1 from '@/h5/static/imgs/camera1.png'
    import camera2 from '@/h5/static/imgs/camera2.png'
    import camera3 from '@/h5/static/imgs/camera3.png'

    @Component({
      components: {
          MyHeader
      },
    })
    export default class Photograph1 extends Vue {
      camera3 = camera3
      camera2 = camera2
      camera1 = camera1
      img = ''
      isdirection = false
      detail(){this.$router.push({name: 'Photograph1', query: {value: 'bigEvent'}})}
      mounted(){
          this.callcamera()
      }
      select(){
        this.isdirection = !this.isdirection
        this.callcamera()
      }
      callcamera(){
          let constraints = {video: true }
        if (this.isdirection) {
          constraints = {video: { facingMode: { exact: "environment" } }}
        }
        navigator.mediaDevices.getUserMedia(constraints)
        .then((success) => {
          var videoTracks = success.getVideoTracks();
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          this.isCameraFlag = false;
          // 实时拍照效果
          this.$refs["video"].play()
        })
        .catch((error) => {
          console.error("摄像头开启失败，请检查摄像头是否可用！");
          this.isCameraFlag = true;
        });
      }
      photograph() {
        // 把当前视频帧内容渲染到canvas上
        let ctx = this.$refs["canvas"].getContext("2d");
        ctx.drawImage(this.$refs["video"], 0, 0, 640, 480);
        /**------------后面是下载功能----------*/
        // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
        let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);
        // 由字节转换为KB 判断大小
        let str = imgBase64.replace("data:image/jpeg;base64,", "");
        this.img = imgBase64
        // let strLength = str.length;
        // let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸 用于判断
        // let size = (fileLength / 1024).toFixed(2);
        console.log(size); // 上传拍照信息 调用接口上传图片 .........
        // 保存到本地
        // let ADOM = document.createElement("a");
        // ADOM.href = this.headImgSrc;
        // ADOM.download = new Date().getTime() + ".jpeg";
        // ADOM.click();
      }
      upload(){
        this.$refs.file.click()
      }
      getFile(file){
        const vm = this
        console.log(file)
        let reader = new FileReader();   //html5读文件
        reader.readAsDataURL(file.target.files[0]); //转BASE64    
        reader.onload=function(e) {    //读取完毕后调用接口
          const base64Image = e.target.result
          // window.open('../static/mergeFace.html')Photograph2

          window.location.href="./static/mergeFace.html"
        }
      }
    }
</script>

<style scoped lang="scss">
    .Photograph1{
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    .flex_g1{
      flex-grow: 1
    }
    .flex_s0{
      flex-shrink: 0
    }
    .video{
      width: 100vw
    }
    .camera{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 115px;
      background: #fff
    }
    .camera3_box{
      font-size: 18px;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      align-items: center;

    }
    .camera3{
      margin-right: 10px;
      display: block;
      width: 28px;
      height: 26px;
    }
    .camera1{
      width: 69px;
      height: 69px;
      display: block;
    }
    .camera2{
      width: 24px;
      height: 22px;
      display: block
    }
    .canvas{
      width: 100vw;
      height: 100vh;
      position: absolute;
      z-index: -99999999;
    }
</style>
