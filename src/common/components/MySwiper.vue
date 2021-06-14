<template>
  <swiper
    ref="mySwiper"
    :options="swiperOptions"
    class="swiper"
    :style="{width: width, height: height}"
    @slideChange="slideChanged">
    <swiper-slide v-for="(slide, index) in list" :key="index">
      <slot name="content" :slide="slide"><img :src="slide.src"></slot>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css';

@Component({
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    width: {
      type: String,
      default: '400px',
    },
    height: {
      type: String,
      default: '300px',
    },
  },
})
export default class MySwiper extends Vue {
  swiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }
    // Some Swiper option/callback...
  };
  get swiper() {
    return this.$refs.mySwiper.swiper;
  }
  mounted() {
    this.swiper.slideTo(0, 1000, false);
  }
  updateOption(options) {
    this.swiperOptions = {
      ...this.swiperOptions,
      ...options,
    };
    this.swiper.pagination.update();
  }
  slideChanged() {
    this.$emit('slideChanged', this.swiper.activeIndex);
  }
}
</script>
<style scoped lang="scss">
.swiper {
  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
