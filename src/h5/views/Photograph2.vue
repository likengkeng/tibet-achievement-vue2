<template>
  <div class="list">
    <my-header @headerNav='headerNav'></my-header>
   
  </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import MyHeader from '@/h5/components/MyHeader.vue';
    import $http from '@/h5/api/event';

    @Component({
    components: {
        MyHeader
    },
    })
    export default class Photograph2 extends Vue {
    
        mounted(){
           
        }
    }
</script>

<style scoped lang="scss">
    
</style>
