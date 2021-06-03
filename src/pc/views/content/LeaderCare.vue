<template>
  <div class="leader-care flex">
    <div class="image">
      <image-carousel :imgSrc="currentImage"></image-carousel>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ImageCarousel from '@/common/components/ImageCarousel.vue';

@Component({
  components: {
    ImageCarousel,
  }
})
export default class LeaderCare extends Vue {
  currentImage: string = '/static/imgs/test01.jpg';
}
</script>
<style scoped lang="scss">
.leader-care {
  background: #b9b6e2;
  height: 657px;
  .image {
    width: 50%;
    height: 100%;
  }
  .content {
    display: flex;
    flex: 1;
    height: 100%;
  }
}
</style>
