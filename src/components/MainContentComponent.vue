<script setup lang="ts">
import products from '../assets/products.json'
console.log(products)

const currentProductImage = (imgPath: string) => new URL(imgPath, import.meta.url).href
</script>

<template>
<main>
  <div class="container">
    <div v-for="product in currentCategory" :key="product" class="row">
      <div class="row">
        <div class="col-md-4">
          <img :src="currentProductImage(product.image)" alt="">
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<style scoped lang="scss">
  main {
    flex-grow: 1;
    background: #FFFFF0;
  }
</style>
