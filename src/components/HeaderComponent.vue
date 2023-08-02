<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.svg'
import { useCategoryStore } from '@/stores/categories'

const hideNavbar = ref(true)
const { switchCategory } = useCategoryStore()
</script>

<template>
  <header class="row sticky-top">
    <nav class="navbar navbar-light col-md-1">
      <button
        @mouseover="hideNavbar = false"
        @mouseleave="hideNavbar = true"
        class="navbar-toggler"
        :class="{ 'nav-open': !hideNavbar }"
      >
        <span class="navbar-toggler-icon" />
      </button>
    </nav>

    <div class="logo-name col-md-3">
      <img :src="logo" alt="" />
      <h1>Nerd's Nest</h1>
    </div>

    <div
      @mouseover="hideNavbar = false"
      @mouseleave="hideNavbar = true"
      class="navbar-collapse"
      :class="{ collapse: hideNavbar }"
      id="n_bar"
    >
      <p>Categories</p>
      <hr />
      <ul class="navbar-nav">
        <li class="nav-item"><button class="nav-link" @click="switchCategory(0)">Games</button></li>
        <li class="nav-item">
          <button class="nav-link" @click="switchCategory(1)">Movies</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
.row {
  height: 80px;
  border-bottom: 2px solid black;
  background: var(--main-color);
  color: var(--vt-c-white);
  margin-right: 0;
  padding: 0 50px;

  .navbar {
    width: 50px;

    .navbar-toggler {
      background: var(--vt-c-white);
      padding: 0 7px;

      &.nav-open {
        background: var(--light-sky-blue);
        border-bottom-left-radius: unset;
        border-bottom-right-radius: unset;
      }

      .navbar-toggler-icon {
        width: 18px;
      }
    }
  }

  .logo-name {
    display: flex;
    align-items: center;

    h1 {
      font-size: 22px;
      margin: 0;
    }

    img {
      width: 20px;
      margin-right: 10px;
    }
  }

  .navbar-collapse {
    width: 150px;
    position: absolute;
    top: 54px;
    background: var(--light-sky-blue);
    border-radius: 0 5px 5px 5px;
    padding: 20px;

    p {
      font-size: 14px;
      font-weight: 600;
      color: var(--main-color);
      margin: 0;
    }

    hr {
      height: 3px;
      margin: 5px 0 10px;
      color: black;
    }

    .navbar-nav .nav-item {
      .nav-link {
        font-family: var(--main-font-family);
        font-size: 13px;
        font-weight: 600;
        color: var(--main-color);
        padding: 5px;

        &:hover {
          background: #fffff0;
          border-radius: 5px;
        }

        &:active {
          background: #b3b3a4;
        }
      }
    }
  }
}
</style>
