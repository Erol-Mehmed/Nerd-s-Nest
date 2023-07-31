<script setup lang="ts">
import { ref } from 'vue'
import products from '../assets/products.json'

let showMore = ref(false)
const currentProducts = showMore.value ? products.games : products.games.filter((el, i) => i < 5)
const currentProductImage = (imgPath: string) => new URL(imgPath, import.meta.url).href



console.log(products, currentProducts, showMore)
</script>

<template>
  <main>
    <div class="container">
      <div v-for="rowArr in currentProducts" :key="rowArr[0].name" class="row">
        <div v-for="product in rowArr" :key="product.name" class="col-md-3 product">
          <div class="img-name">
            <img :src="currentProductImage(product.image)" alt="" />
            <p>{{ product.name }}</p>
          </div>
          <p class="description">{{ product.description }}</p>
          <p>{{ product.price }}</p>
        </div>
      </div>
    </div>
    <div class="btn-holder">
      <button @click="showMore = true" class="btn btn-primary">Load More</button>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  margin: 30px 0;
  flex-grow: 1;
  background: #fffff0;

  .container { 
    .row {
      justify-content: center;
      gap: 30px;
      
      &:not(:last-of-type) {
        margin-bottom: 30px;
      }

      .product {
        padding: 12px;
        background: #dfdfb9;
        border-radius: 5px;
        box-shadow: 0 0 10px #898585;

        .img-name {
          text-align: center;

          img {
            width: 140px;
            height: 174px;
          }
        }

        .description {
          font-size: 12px;
        }
      }
    }
  }

  .btn-holder {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .btn-primary {
      width: 200px;
      background: var(--light-sky-blue);
      color: var(--main-color);
      border: 2px solid var(--main-color);
      font-weight: 600;

      &:hover {
        background: var(--sky-blue);
      }

      &:active {
        background: var(--dark-sky-blue);
      }
    }
  }
}
</style>
