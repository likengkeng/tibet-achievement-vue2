<template>
  <div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
    import $http from '@/pc/api/event';

@Component({})
export default class App extends Vue {
  mounted(){
    if (!localStorage.getItem('touristId') || localStorage.getItem('touristId') == 'undefined') {
      $http.touristCreate()
        .then(res => {
          console.log(res)
          localStorage.setItem('touristId', res.data.data.id)
        })
    }

  }
}
</script>

<style scoped>
#app {
  color: #2c3e50;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform: rotate(0deg);
}
.router a {
  padding-right: 20px;
}
</style>
