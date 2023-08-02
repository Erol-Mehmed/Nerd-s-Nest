<script setup lang="ts">
import { ref } from 'vue'
import useDetectOutsideClick from '../composables/clickOutside'
import { useCategoryStore } from '@/stores/categories'

const emit = defineEmits(['filtration-data'])

const { addFiltrationData } = useCategoryStore()
const openClose = ref(false)
const price = ref(null)
const rating = ref(null)
let selectedPlatform = 'Select an option'
const dropdownRef = ref(null)
const formSubmit = (e: any) => {
  addFiltrationData({
    price: price.value,
    rating: rating.value,
    selectedPlatform
  })

  emit('filtration-data', {
    price: price.value,
    rating: rating.value,
    selectedPlatform
  })

  e.preventDefault()
}
const clearFilter = (e: any) => {
  addFiltrationData({
  })

  e.preventDefault()
}

useDetectOutsideClick(dropdownRef, () => {
  openClose.value = false
})

const openCloseDropdown = (platform?: string) => {
  openClose.value = !openClose.value
  if (platform) {
    selectedPlatform = platform
  }
}
</script>

<template>
  <div class="container-fluid col-md-2">
    <h2>Filter</h2>
    <form>
      <div class="form-input">
        <label class="form-input-label">Price:</label>
        <input v-model="price" name="price" placeholder="number" type="text" />
      </div>

      <div class="form-input">
        <label class="form-input-label">Rating:</label>
        <input v-model="rating" name="rating" placeholder="number between 0 and 5" type="text" />
      </div>

      <label>Platform:</label>
      <div ref="dropdownRef" class="dropdown">
        <button
          @click="openCloseDropdown()"
          class="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          {{ selectedPlatform }}
        </button>
        <ul class="dropdown-menu" :class="{ 'dropdown-open': openClose }">
          <li>
            <span @click="openCloseDropdown('Select an option')" class="dropdown-item"
              >Select an option</span
            >
          </li>
          <li>
            <span @click="openCloseDropdown('Playstation 4')" class="dropdown-item"
              >Playstation 4</span
            >
          </li>
          <li>
            <span @click="openCloseDropdown('Playstation 5')" class="dropdown-item"
              >Playstation 5</span
            >
          </li>
        </ul>
      </div>

      <div class="filter-btn">
        <button @click="clearFilter" type="submit" class="btn btn-primary">Clear</button>
        <button @click="formSubmit" type="submit" class="btn btn-primary">Filter</button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
.container-fluid {
  height: 500px;
  padding: 20px;
  background: #dfdfb9;
  border: 1px solid black;
  border-left: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow: 0 0 10px #898585;

  h2 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  form {
    .form-input {
      padding: 0;

      &:not(:last-child) {
        margin-bottom: 15px;
      }

      label {
        font-size: 14px;
      }

      input {
        width: 100%;
        font-size: 14px;

        &::placeholder {
          font-size: 12px;
        }
      }
    }

    .dropdown {
      margin-bottom: 20px;

      .btn {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: white;
        font-size: 14px;
      }

      .dropdown-menu {
        &.dropdown-open {
          display: block;
          width: 100%;

          li {
            cursor: pointer;
          }

          .dropdown-item {
            font-size: 14px;

            &:hover {
              background: var(--light-sky-blue);
            }

            &:active {
              background: var(--dark-sky-blue);
            }
          }
        }
      }
    }

    .filter-btn {
      display: flex;
      justify-content: flex-end;
      margin-top: 50px;

      .btn-primary {
        font-size: 14px;
        font-weight: 600;
        color: var(--main-color);
        background: var(--light-sky-blue);
        padding: 3px 18px;

        &:hover {
          background: var(--sky-blue);
        }

        &:active {
          background: var(--dark-sky-blue);
        }
      }
    }
  }
}
</style>
