<template>
  <div class="Photograph1">
    <my-header class='flex_s0'></my-header>
    <div class='video_box'>
      <input type="file" class='filecamera' ref='filecamera' @change='change' accept="image/*" capture="camera">
      <canvas ref='canvas' class='canvas'></canvas>
    </div>
    <div class='camera flex_s0'>
      <div class='camera3_box flex_g1' @click='upload'>
        <img :src="camera3" alt="" class='camera3'>
        <p>相册</p>
      </div>
      <div class='flex_g1'> <img :src="camera1" alt="" class='camera1' @click='photograph'></div>
      <div class='flex_g1'></div>
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
    @Component({
      components: {
          MyHeader
      },
    })
    export default class Photograph1 extends Vue {

      camera3 = camera3
      camera2 = camera2
      camera1 = camera1
      index = -1
      mounted(){
        this.index = this.$route.query.img
        this.$nextTick(() => {
          this.$refs.filecamera.click()
        })
      }
      select(){
        
      }
      photograph(){
                  this.$refs.filecamera.click()
      }
      change(e){
        const vm = this
        let img=e.srcElement.files[0]; //获取到上传文件的对象
        var reader = new FileReader();
        reader.readAsDataURL(img);//参数为上传的文件对象 传值进去就会触发以下onload方法
        reader.onload = function (e) {
          vm.$router.push({name: 'photograph2', query: {src: e.target.result, index: vm.index}})
        }
      }
      upload(){
        this.$refs.file.click()
      }
      getFile(file){
        const vm = this
        let reader = new FileReader();   //html5读文件
        reader.readAsDataURL(file.target.files[0]); //转BASE64    
        reader.onload=function(e) {    //读取完毕后调用接口
          const base64Image = e.target.result;

          vm.$router.push({name: 'photograph2', query: {src: base64Image, index: vm.index}})
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
    .filecamera{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
      opacity: 0;
    }
    .video_box{
      width: 100vw;
      position: relative;
      flex-grow: 1;
      overflow: hidden;
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
      width: 33.33%
    }
    .flex_g1{
      // flex-grow: 1;
      width: 33%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: -0.5%
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
    .selectImg{
      width: 375px;
      height: 515px;
    }
</style>
