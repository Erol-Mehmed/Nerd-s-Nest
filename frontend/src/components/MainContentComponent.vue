<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FilterComponent from './FilterComponent.vue'
import ProductsGrid from './ProductsGrid.vue'
import axios from 'axios'

const updater = ref(0)
const filterData = ref({})
const filtrationData = (data: object) => {
  filterData.value = data
  updater.value++
}

onMounted(() => {
  axios.get('http://localhost:3000/')
  .then(response => {
    console.log('res:', response)
  })
  .catch(error => {
    console.log('axios error:', error)
  })
})
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <FilterComponent @filtration-data="filtrationData" />
        <ProductsGrid :filter-data="filterData" :key="updater" />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  main {
    padding: 30px 0;
    flex-grow: 1;
    background: #fffff0;
  }
</style>
