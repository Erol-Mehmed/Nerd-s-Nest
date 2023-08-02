<script setup lang="ts">
import { ref } from 'vue'
import FilterComponent from './FilterComponent.vue'
import ProductsGrid from './ProductsGrid.vue'

const counter = ref(0)
const filtrationData = () => {
  counter.value++
}
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <FilterComponent @filtration-data="filtrationData()" />
        <ProductsGrid :key="counter" />
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
