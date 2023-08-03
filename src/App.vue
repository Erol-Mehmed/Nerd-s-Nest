<script setup lang="ts">
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
import MainContentComponent from './components/MainContentComponent.vue'
import { ref } from 'vue'

const updater = ref(0)
const categoryChange = () => {
  updater.value++
}
</script>

<template>
  <HeaderComponent @category-change="categoryChange" />
  <MainContentComponent :key="updater" />
  <FooterComponent />
</template>

<style scoped lang="scss"></style>
