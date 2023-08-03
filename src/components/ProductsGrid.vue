<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import products from '../assets/products.json'
import { useCategoryStore } from '@/stores/categories'

const showMore = ref(false)
const props = defineProps(['filterData'])

let filterDataArr = Object.entries(props.filterData)
filterDataArr = filterDataArr.filter(arr => arr[1] !== null && arr[1] !== '')

let productsArr: any[] = Object.entries(products)
const { categoryIndex } = storeToRefs(useCategoryStore())

const currentProducts = (categoryIndex: number) =>
  showMore.value
    ? productsArr[categoryIndex][1]
    : productsArr[categoryIndex][1].filter((_el: any, i: number) => i < 5)

const currentProductImage = (imgPath: string) => new URL(imgPath, import.meta.url).href
const cartAlert = () => {
  alert('Product added to cart')
}

console.log('grid:', Object.values(props.filterData))
console.log('filter data:', filterDataArr)

// if (filterDataArr.length > 0) {
//   const currentCategoryArr = currentProducts(categoryIndex.value)
//   filterDataArr[0] = `${filterDataArr[0]}$`
//   let productsArrSecond: any = [
//     ['', []],
//     ['', []]
//   ]
//   let rowArr = []
//   let noResult = false

//   for (let i = 0; i < currentCategoryArr.length; i += 1) {
//     for (let y = 0; y < currentCategoryArr[i].length; y += 1) {
//       let checksPassed = true

//       for (let l = 0; l < filterDataArr.length; l += 1) {
//         const platformGenre = categoryIndex.value === 0 ? 'platform' : 'genre'

//         console.log(currentCategoryArr[i][y][currentCharacteristic], filterDataArr[l]);
//         console.log(currentCharacteristic);
        

//         if (currentCategoryArr[i][y][currentCharacteristic] !== filterDataArr[l]) {
//           checksPassed = false
//         }

//         if (checksPassed && l === filterDataArr.length - 1) {
//           rowArr.push(currentCategoryArr[i][y])
//         }
//       }
//     }

//     if (rowArr.length === 3 || i === currentCategoryArr.length - 1) {
//       productsArrSecond[categoryIndex.value][1].push(rowArr)
//       if (rowArr.length > 0) {
//         noResult = true
//       }

//       rowArr = []
//     }
//   }

//   if (noResult) {
//     productsArr = productsArrSecond
//   }
// }

let ratingStars: string[][][] = []

const ratingStarsCreation = () => {
  const currentCategoryArr = currentProducts(categoryIndex.value)
  const decimalCheck = /^[0-9]+\.5$/

  for (let i = 0; i < currentCategoryArr.length; i += 1) {
    const currentNestedArr: string[][] = []

    for (let y = 0; y < currentCategoryArr[i].length; y += 1) {
      let currentRating = currentCategoryArr[i][y].rating
      const iconTypeArr = []

      if (decimalCheck.test(currentRating)) {
        for (let l = 0; l < Number(currentRating.split('.')[0]); l += 1) {
          iconTypeArr.push('fas fa-star')
        }

        iconTypeArr.push('fa-star-half-stroke')
      } else {
        for (let l = 0; l < Number(currentRating); l += 1) {
          iconTypeArr.push('fas fa-star')
        }
      }

      if (iconTypeArr.length < 5) {
        while (iconTypeArr.length < 5) {
          iconTypeArr.push('far fa-star')
        }
      }

      currentNestedArr.push(iconTypeArr)
    }

    ratingStars.push(currentNestedArr)
  }
}
ratingStarsCreation()

const loadMore = () => {
  showMore.value = true
  ratingStars = []
  ratingStarsCreation()
}
</script>

<template>
  <div class="container-fluid col-md-10">
    <div v-for="(rowArr, i) in currentProducts(categoryIndex)" :key="rowArr[0].name" class="row">
      <div v-for="(product, y) in rowArr" :key="product.name" class="col-md-3 product">
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
        <div class="ratings">
          <div class="rating-icons">
            <font-awesome-icon :icon="`${ratingStars[i][y][0]}`" color="orange" />
            <font-awesome-icon :icon="`${ratingStars[i][y][1]}`" color="orange" />
            <font-awesome-icon :icon="`${ratingStars[i][y][2]}`" color="orange" />
            <font-awesome-icon :icon="`${ratingStars[i][y][3]}`" color="orange" />
            <font-awesome-icon :icon="`${ratingStars[i][y][4]}`" color="orange" />
          </div>
          <p>
            <span>{{ product.rating }}</span> of <span>5</span>
          </p>
        </div>

        <div class="shopping-cart-btn">
          <button @click="cartAlert()" class="btn shopping-cart">
            <font-awesome-icon icon="fas fa-cart-shopping" />
          </button>
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
.container-fluid {
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

      .ratings {
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 15px 0 0;

        p {
          margin: 0;
          font-size: 13px;

          span {
            font-weight: 600;
          }
        }
      }

      .shopping-cart-btn {
        display: flex;
        justify-content: flex-end;
        .shopping-cart {
          &:hover {
            background: var(--sky-blue);
          }
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
