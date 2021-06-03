<template>
  <div class="image-carousel">
    <img class="current-image" :src="imgSrc">
    <div class="carousel-btn">
      <div class="ellipse"></div>
      <div class="ellipse"></div>
      <div class="ellipse"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
  },
})
export default class ImageCarousel extends Vue {}
</script>
<style scoped lang="scss">
.image-carousel {
  padding-top: 20px;
  .current-image {
    width: 589px;
    height: 357px;
  }
  .ellipse {
    width: 50px;
    height: 10px;
    margin-top: 20px;
    background: #FFD900;
    border-radius: 30px;
    float: left;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
