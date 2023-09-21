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
    <router-link class="name" to="/">Nerd's Nest</router-link>
    <div class="second-group">
      <router-link class="links" to="/messages">Messages</router-link>
      <router-link class="links" to="/my">Your Account</router-link>
      <router-link class="links" to="/messages">Add ad</router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.sticky-top {
  display: flex;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid black;
  background: var(--main-color);
  color: var(--vt-c-white);
  padding: 0 280px;

  a {
    text-decoration: none;
    color: var(--vt-c-white);
    background: none;
  }

  .name {
    font-size: 22px;

    &:hover {
      color: rgb(228, 255, 255);
    }
  }
  .second-group {
    .links {
      font-size: 16px;
      
      &:nth-of-type(-n+2) {
        margin-right: 10px;
      }
    }
  }
}
</style>
