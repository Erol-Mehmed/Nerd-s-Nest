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
      <div class="add-ad">
        <router-link class="links" to="/messages">Add ad</router-link>
      </div>
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

    &:hover {
      color: #7f9799;
    }
  }

  .name {
    font-size: 22px;
  }
  .second-group {
    .links {
      font-size: 16px;
      font-weight: 600;
      margin-right: 30px;
    }

    .add-ad {
      display: inline-flex;
      width: 140px;
      height: 45px;
      border-radius: 5px;
      background: var(--vt-c-white);
      padding: 5px 4px;

      .links {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        color: var(--main-color);
        margin: 0;

        &:hover {
          color: var(--vt-c-white);
          background: var(--main-color);
        }
      }
    }
  }
}
</style>
