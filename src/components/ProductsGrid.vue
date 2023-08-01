<script setup lang="ts">
import { storeToRefs } from 'pinia'
import products from '../assets/products.json'
import { useCategoryStore } from '@/stores/categories'
import { ref } from 'vue';

const showMore = ref(false)
const { categoryIndex } = storeToRefs(useCategoryStore())
const productsArr = Object.entries(products)
const currentProducts = (categoryIndex: number) =>
  showMore.value ? productsArr[categoryIndex][1] : productsArr[categoryIndex][1].filter((el, i) => i < 5)
const currentProductImage = (imgPath: string) => new URL(imgPath, import.meta.url).href

const loadMore = () => {
  showMore.value = true
}
</script>

<template>
  <div class="container col-md-10">
    <div v-for="rowArr in currentProducts(categoryIndex)" :key="rowArr[0].name" class="row">
      <div v-for="product in rowArr" :key="product.name" class="col-md-3 product">
        <div class="img-name">
          <img :src="currentProductImage(product.image)" alt="" />
          <p>{{ product.name }}</p>
        </div>
        <p class="description">{{ product.description }}</p>
        <div class="prices">
          <p :class="{ 'discount-available': product.discountedPrice }">
            Price: {{ product.price }}
          </p>
          <p v-if="product.discountedPrice">Discounted Price {{ product.discountedPrice }}</p>
        </div>
      </div>
    </div>
    <div class="btn-holder">
      <button
        v-if="!showMore && productsArr[categoryIndex][1].length > 5"
        @click="loadMore()"
        class="btn btn-primary"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
          margin-bottom: 10px;

          & + p {
            font-weight: 600;
          }
        }
      }

      .description {
        font-size: 12px;
      }

      .prices {
        display: flex;
        gap: 20px;
        font-size: 14px;

        p {
          margin: 0;
          font-weight: 600;
        }

        .discount-available {
          text-decoration: line-through;
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
