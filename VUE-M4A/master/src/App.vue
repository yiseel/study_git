<script setup>
import { RouterLink, RouterView } from 'vue-router'
import vueFooter from './components/vueFooter.vue'
import vueHeader from './components/vueHeader.vue'
</script>

<template>
  <header id="header" class="header">
    <vueHeader />
  </header>
  <div id="container" class="container" >
    <RouterView />
  </div>
  <footer id="footer" class="footer">
    <vueFooter />
  </footer> 
</template>
