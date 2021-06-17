<template>
  <div class="photo">
    <my-header></my-header>
    <div>
      <img :src="rocket" class='icon'  @click='mycanvas' alt="" crossOrigin='anonymous'>
    </div>
    <img :src="src" ref='img1' alt="" class='img'>
    <canvas ref='myCanvas' class='myCanvas'></canvas>
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';
    import rocket from '@/h5/static/imgs/rocket.png'

    import canvas from '@/h5/static/imgs/canvas.png'
    @Component({
    components: {
        MyHeader
    },
    })
    export default class Photograph2 extends Vue {
        src = ''
        url = ''
        rocket=rocket
        mycanvas(){
          const vm = this
          // 在Canvas画布 添加图片
          let myCanvas = this.$refs.myCanvas
          var ctx = myCanvas.getContext('2d')
          var img = this.$refs.img1
          ctx.drawImage(img, 640, 480)

          var bark = new Image(); 
          bark.src = canvas;   // 图片加载完成后，将其显示在canvas上 

          bark.onload = function () { 
            ctx.drawImage(bark, 50, 50);

          
            // vm.url = myCanvas.toDataURL()
            // vm.upload()  
          }
          
        }
        
        upload(){
                    console.log(111)

          let aLink = document.createElement('a');
          let blob = this.base64ToBlob(this.src); //new Blob([content]);
      
          let evt = document.createEvent("HTMLEvents");
          evt.initEvent("click", true, true);//initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
          aLink.download = '融合.png';
          aLink.href = URL.createObjectURL(blob);
      
          // aLink.dispatchEvent(evt);
          //aLink.click()
          aLink.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));//兼容火狐
        }
         base64ToBlob(code) {
          let parts = code.split(';base64,');
          let contentType = parts[0].split(':')[1];
          let raw = window.atob(parts[1]);
          let rawLength = raw.length;

          let uInt8Array = new Uint8Array(rawLength);

          for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
          }
          return new Blob([uInt8Array], {type: contentType});
        }
        mounted(){
           this.src= this.$route.query.src
        }
    }
</script>

<style scoped lang="scss">
    .photo{
      
    }
    .icon{
      font-size: 30px;
      position: fixed;
      right: 30px;
      top: 30px;
    }
    .img{
      width: 100%;
      height: calc(100vh - 175px)
    }
    .myCanvas{
      width: 100vw;
      height: 100vh
      // position: absolute;
      // z-index: -100
    }
</style>
