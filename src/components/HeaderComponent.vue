<script setup lang="ts">
import { useCategoryStore } from '@/stores/categories'

const emit = defineEmits(['category-change'])
const { switchCategory } = useCategoryStore()

const switchCategoryEmit = (categoryIndex: number) => {
  switchCategory(categoryIndex)
  emit('category-change')
}
</script>

<template>
  <header class="sticky-top">
      <h1>Nerd's Nest</h1>
  </header>
</template>

<style scoped lang="scss">
.sticky-top {
  display: flex;
  height: 80px;
  align-items: center;
  border-bottom: 2px solid black;
  background: var(--main-color);
  color: var(--vt-c-white);
  padding: 0 280px;

  h1 {
    font-size: 22px;
    margin: 0;
  }
}
</style>
