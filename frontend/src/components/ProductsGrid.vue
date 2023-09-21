<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import products from '../assets/products.json'
import { useCategoryStore } from '@/stores/categories'
import useDetectOutsideClick from '@/composables/clickOutside'
import { nextTick } from 'vue'

const showMore = ref(false)
const productRowCounts = reactive({
  displayedRows: 0,
  displayedProducts: 0,
  allProducts: 0
})
const props = defineProps(['filterData'])
let noResult = true
let filterDataArr = Object.values(props.filterData)
let productsArr: any[] = Object.entries(products)
const { categoryIndex } = storeToRefs(useCategoryStore())
const dropdownRef = ref(null)
const openClose = ref(false)
const sortingMethod = ref('Sort')
let sortedArray: any[] = []
const completeOriginalArray = productsArr[categoryIndex.value][1]
const displayedProductsPlusFive = ref(5)

const getCurrentDisplayedProducts = () => {
  productRowCounts.displayedProducts = document.getElementsByClassName('product').length
  productRowCounts.displayedRows = document.getElementsByClassName('product-row').length
}

const getAllProductsCount = (currentArr: Array<Array<{ [key: string]: any }>>) => {
  return currentArr.reduce((acc: number, el: object[]) => acc + el.length, 0)
}

onMounted(() => {
  getCurrentDisplayedProducts()
})

productRowCounts.allProducts = getAllProductsCount(productsArr[categoryIndex.value][1])

// Function to get products to display
const currentProducts = (categoryIndex: number, allValues?: boolean) => {
  if (allValues) {
    return productsArr[categoryIndex][1]
  } else {
    return productsArr[categoryIndex][1].filter(
      (_el: any, i: number) => i < displayedProductsPlusFive.value
    )
  }
}

useDetectOutsideClick(dropdownRef, () => {
  openClose.value = false
})

// Creating rating stars
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

const openCloseDropdown = (currentMethod?: string) => {
  openClose.value = !openClose.value

  // Sorting mechanism
  if (currentMethod) {
    sortingMethod.value = currentMethod

    // Leveling the nested arrays
    sortedArray = currentProducts(categoryIndex.value, true).reduce((acc: any[], cur: any) => {
      acc.push(...cur)
      return acc
    }, [])

    // Give price the discounted price where available
    let secondSortedArray = sortedArray.slice()
    const discountedItemsArr: any = {}

    for (let i = 0; i < secondSortedArray.length; i += 1) {
      if (secondSortedArray[i].discountedPrice) {
        discountedItemsArr[secondSortedArray[i].name] = secondSortedArray[i].price
        secondSortedArray[i].price = secondSortedArray[i].discountedPrice
      }
    }

    // Sorting according to dropdown choice
    if (currentMethod === 'Sort') {
      productsArr[categoryIndex.value][1] = completeOriginalArray
      ratingStars = []
      ratingStarsCreation()

      return
    } else if (currentMethod === 'Alphabetical a-z') {
      sortedArray = sortedArray.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      )
    } else if (currentMethod === 'Alphabetical z-a') {
      sortedArray = sortedArray.sort((a, b) =>
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      )
    } else if (currentMethod === 'Price ascending') {
      secondSortedArray = secondSortedArray.sort(
        (a, b) => a.price.split('$')[0] - b.price.split('$')[0]
      )
    } else if (currentMethod === 'Price descending') {
      secondSortedArray = secondSortedArray.sort(
        (a, b) => b.price.split('$')[0] - a.price.split('$')[0]
      )
    }

    if (['Price ascending', 'Price descending'].includes(currentMethod)) {
      for (let i = 0; i < secondSortedArray.length; i += 1) {
        if (discountedItemsArr[secondSortedArray[i].name]) {
          secondSortedArray[i].price = discountedItemsArr[secondSortedArray[i].name]
        }
      }

      sortedArray = secondSortedArray.slice()
    }

    // Preparing the array for productArr
    const sortedValuesRowsArr: any[] = []
    let counter = 0
    let nestedArr = []

    for (let i = 0; i < sortedArray.length; i += 1) {
      counter++

      if (counter < 4) {
        nestedArr.push(sortedArray[i])
      }

      if (counter === 3 || i === sortedArray.length - 1) {
        sortedValuesRowsArr.push(nestedArr)
        nestedArr = []
        counter = 0
      }
    }

    productsArr[categoryIndex.value][1] = sortedValuesRowsArr
    ratingStars = []
    ratingStarsCreation()
  }
}

const currentProductImage = (imgPath: string) => new URL(imgPath, import.meta.url).href
const cartAlert = () => {
  alert('Product added to cart')
}

// Filtering mechanism
if (filterDataArr.length > 0) {
  const currentCategoryArr = productsArr[categoryIndex.value][1]
  let productsArrSecond: any = [
    ['', []],
    ['', []]
  ]
  let rowArr = []
  noResult = false

  for (let i = 0; i < currentCategoryArr.length; i += 1) {
    for (let y = 0; y < currentCategoryArr[i].length; y += 1) {
      let checksPassed = true

      for (let l = 0; l < filterDataArr.length; l += 1) {
        const platformGenre = categoryIndex.value === 0 ? 'platform' : 'genre'
        const currentCharacteristic = ['price', 'rating', platformGenre][l]
        let currentFilterValue = currentCategoryArr[i][y][currentCharacteristic]

        if (currentCategoryArr[i][y].discountedPrice && currentCharacteristic === 'price') {
          currentFilterValue = currentCategoryArr[i][y].discountedPrice
        }

        if (currentFilterValue !== filterDataArr[l] && filterDataArr[l] !== '') {
          checksPassed = false
        }

        if (checksPassed && l === filterDataArr.length - 1) {
          rowArr.push(currentCategoryArr[i][y])
        }

        if (rowArr.length === 3 || i === currentCategoryArr.length - 1) {
          if (
            rowArr !==
            productsArrSecond[categoryIndex.value][1][
              productsArrSecond[categoryIndex.value][1].length - 1
            ]
          ) {
            if (rowArr.length > 0) {
              productsArrSecond[categoryIndex.value][1].push(rowArr)
            }

            if (rowArr.length > 0) {
              noResult = true
            }

            if (rowArr.length === 3) {
              rowArr = []
            }
          }
        }
      }
    }
  }

  if (noResult) {
    productsArr[categoryIndex.value][1] = productsArrSecond[categoryIndex.value][1]

    ratingStars = []
    ratingStarsCreation()
  }
}

// Load more products function
const loadMore = () => {
  displayedProductsPlusFive.value = productRowCounts.displayedRows + 5

  nextTick(() => {
    getCurrentDisplayedProducts()

    if (
      productRowCounts.allProducts === productRowCounts.displayedProducts ||
      productRowCounts.displayedProducts ===
        productsArr[categoryIndex.value][1].reduce((acc: any[], cur: any) => {
          acc.push(...cur)
          return acc
        }, []).length
    ) {
      showMore.value = true
    }
  })

  ratingStars = []
  ratingStarsCreation()
}
</script>

<template>
  <div class="container-fluid col-md-10">
    <div class="row category-name-sort">
      <div class="category col-md-7">
        <h5>{{ categoryIndex === 0 ? 'Games' : 'Books' }}</h5>
        <p v-if="categoryIndex === 0">Search and buy the hit games of Sony</p>
        <p v-else>Search and buy great books of various genres</p>
      </div>

      <div ref="dropdownRef" class="dropdown col-md-5">
        <button
          @click="openCloseDropdown()"
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          {{ sortingMethod }}
        </button>
        <ul class="dropdown-menu" :class="{ 'dropdown-open': openClose }">
          <li>
            <span @click="openCloseDropdown('Sort')" class="dropdown-item">--Select--</span>
          </li>
          <li>
            <span @click="openCloseDropdown('Alphabetical a-z')" class="dropdown-item"
              >Alphabetical a-z</span
            >
          </li>
          <li>
            <span @click="openCloseDropdown('Alphabetical z-a')" class="dropdown-item"
              >Alphabetical z-a</span
            >
          </li>
          <li>
            <span @click="openCloseDropdown('Price ascending')" class="dropdown-item"
              >Price ascending</span
            >
          </li>
          <li>
            <span @click="openCloseDropdown('Price descending')" class="dropdown-item"
              >Price descending</span
            >
          </li>
        </ul>
      </div>

      <div class="counter col-md-10">
        <p>
          Products <span>{{ productRowCounts.displayedProducts }}</span> out of
          <span>{{ productRowCounts.allProducts }}</span>
        </p>
      </div>
    </div>

    <div v-if="noResult">
      <div
        v-for="(rowArr, i) in currentProducts(categoryIndex)"
        :key="rowArr[0].name"
        class="row product-row"
      >
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
            <p v-if="product.discountedPrice">Discounted Price: {{ product.discountedPrice }}</p>
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

    <div v-else class="no-result">
      <h2>No Results</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-fluid {
  .row .category-name-sort {
    align-items: center;
    gap: 0;
    margin-bottom: 20px !important;

    .category {
      text-align: center;

      h5 {
        font-weight: 600;
      }

      p {
        font-size: 12px;
        margin: 0;
      }
    }

    .dropdown {
      width: 200px;
      padding: 0;

      .btn {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: var(--light-sky-blue);
        color: var(--main-color);
        font-size: 14px;
        font-weight: 600;

        &:after {
          color: var(--main-color);
        }
      }

      .dropdown-menu {
        &.dropdown-open {
          display: block;
          width: 100%;
          background: var(--light-sky-blue);

          li {
            cursor: pointer;
          }

          .dropdown-item {
            color: var(--main-color);
            font-size: 14px;

            &:hover {
              font-weight: 600;
              background: white;
            }

            &:active {
              background: rgb(248, 244, 244);
            }
          }
        }
      }
    }

    .counter {
      p {
        font-size: 14px;
        padding-left: 11px;
        margin: 12px 0 0;

        span {
          font-weight: 600;
        }
      }
    }
  }

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

  .no-result {
    text-align: center;

    h2 {
      font-size: 32px;
      font-weight: 600;
    }
  }
}

@media (max-width: 767px) {
  .container-fluid {
    .row .category-name-sort {
      align-items: center;
      gap: 0;
      margin-bottom: 20px !important;

      .category {
        margin-top: 20px;
      }
    }
  }
}
</style>
