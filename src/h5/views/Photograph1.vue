<template>
  <div class="Photograph1">
    <my-header class='flex_s0'></my-header>
    <div class='video_box'>
      <video id="video" ref='video' class='flex_g1 video' autoplay="autoplay"></video>
      <canvas class='canvas' ref='canvas'></canvas>

    </div>
    <div class='camera flex_s0'>
      <div class='camera3_box' @click='upload'>
        <img :src="camera3" alt="" class='camera3'>
        <p>相册</p>
      </div>
      <img :src="camera1" alt="" class='camera1' @click='photograph'>
      <img :src="camera2" alt="" class='camera2' @click='select'>
    </div>
    <input class='fileinput' type="file" ref='file' accept="image/*" name="image" @change="getFile($event)" >
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
    import '@/h5/static/facepp_sdk/jquery.min.js'
    import '@/h5/static/facepp_sdk/exif.js'
    import FACEPP from '@/h5/static/facepp_sdk/facepp_sdk.js'
    import str from '@/h5/static/imgs/module1.js'
    import { Notify } from 'vant';
    @Component({
      components: {
          MyHeader
      },
    })
    export default class Photograph1 extends Vue {
            facepp = new FACEPP('ZZB6CifNdU01PxaPobUM1-DxmqoykgVv','Gx4MwKDPHzjYXulPcfG5LFGxShF1ptr6',1);

      camera3 = camera3
      camera2 = camera2
      camera1 = camera1
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
        console.log(1111)
        const vm = this
        // 把当前视频帧内容渲染到canvas上
        let ctx = this.$refs["canvas"].getContext("2d");
        ctx.drawImage(this.$refs["video"], 0, 0, 640, 480);
        /**------------后面是下载功能----------*/
        // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
        let imgBase64 = this.$refs["canvas"].toDataURL("image/jpeg", 0.7);
        const mergePara = {"template_base64": imgBase64, "merge_base64" : str,  };
        vm.facepp.mergeFace(mergePara,vm.handleSuccess,vm.handleError);
        
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
          const base64Image = e.target.result;
          console.log(base64Image)
          const mergePara = {"template_base64": base64Image, "merge_base64" : str,  };
          vm.facepp.mergeFace(mergePara,vm.handleSuccess,vm.handleError);
        }
      }
      handleSuccess(e) {
        const base64Image  = 'data:image/jpg;base64,' + e.result;
        this.$router.push({name: 'photograph2', query: {src: base64Image}})
      }
      handleError(){
        Notify('失败');
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
    .video_box{
      width: 100vw;
      position: relative;
      .video{
        width:100%;
        height: 100%;
        position: relative;
        z-index: 100
      }
      .canvas{
        width:100%;
        height: 100%;
        position: relative;
        z-index: -100
      }
    }
    .camera{
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 115px;
      background: #fff;
      position: relative;
    z-index: 9999999;
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
    .fileinput{
      width: 0px;
      height: 0px;
      overflow: hidden;
      position: absolute;
      z-index: -99999999;
    }
</style>
