<template>
  <div class="preface">
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
      :playsinline="true"
      customEventName="customstatechangedeventname"
      @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)"
      @statechanged="playerStateChanged($event)"
      @ready="playerReadied">
  </video-player>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import 'video.js/dist/video-js.css';
import '/static/styles/video-custom.css';
import { videoPlayer } from 'vue-video-player';
@Component({
  components: {
    videoPlayer,
  }
})
export default class Preface extends Vue {
  playerOptionsDefault = {
    // videojs options
    muted: true,
    language: 'en',
    height: '600',
    width: '100%',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [{
      type: 'video/mp4',
      src: 'http://vjs.zencdn.net/v/oceans.mp4',
    }],
    // poster: '/static/imgs/author.jpg',
  }

  playerOptions = {};

  get player() {
    return this.$refs.videoPlayer.player;
  }

  getData() {
    this.playerOptions = { ...this.playerOptionsDefault };
  }

  mounted() {
    this.$nextTick(() => {
      this.getData();
    })
  }

  onPlayerPlay(player) {
    // console.log('player play!', player)
  }
  onPlayerPause(player) {
    // console.log('player pause!', player)
  }
  // ...player event

  // or listen state event
  playerStateChanged(playerCurrentState) {
    // console.log('player current update state', playerCurrentState)
  }

  // player is ready
  playerReadied(player) {
    console.log('the player is readied', player)
    // you can use it to do something...
    // player.[methods]
  }
}
</script>
<style scoped lang="scss">
.preface {
  height: 657px;
}
</style>
