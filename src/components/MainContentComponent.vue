<script setup lang="ts">
import FilterComponent from './FilterComponent.vue'
import ProductsGrid from './ProductsGrid.vue'
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <FilterComponent />
        <ProductsGrid />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  padding: 30px 0;
  flex-grow: 1;
  background: #fffff0;

  .container {
    max-width: 100%;
  }
}
</style>
