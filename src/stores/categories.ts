import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('categoriesStore', () => {
  const categoryIndex = ref(0)

  const switchCategory = (newCategory: number) => {
    categoryIndex.value = newCategory
  }

  return {
    categoryIndex,
    switchCategory
  }
})
