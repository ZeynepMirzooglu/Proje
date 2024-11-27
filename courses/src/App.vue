<template>
  <div class="text-center m-5" v-if="loading">
    <v-progress-circular
    color="primary"
    indeterminate/>
  </div>
  <div v-else>
  <HeaderVue></HeaderVue>
  <router-view></router-view>
</div>
</template>
<script setup>
import HeaderVue from "./components/navigation/Header.vue";
import {firstLoad} from '@/composables/auth.js'


const {loading}= firstLoad();
</script>
<style scoped>

</style>
