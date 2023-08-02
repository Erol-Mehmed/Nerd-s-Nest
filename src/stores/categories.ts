import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoriesStore', () => {
  const categoryIndex = ref(0)
  const filtrationData = ref({
  })

  const switchCategory = (newCategory: number) => {
    categoryIndex.value = newCategory
  }

  const addFiltrationData = (data: object) => {
    filtrationData.value = data
    console.log('store:', filtrationData.value);
  }

  return {
    categoryIndex,
    filtrationData,
    switchCategory,
    addFiltrationData
  }
})
