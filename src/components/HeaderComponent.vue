<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.svg'

let hideNavbar = ref(true)
</script>

<template>
  <header class="row">
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
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="#">Games</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Books</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Movies</a></li>
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
        background: #a2d8e5;
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
    background: #a2d8e5;
    border-radius: 0 5px 5px 5px;
    padding: 40px 20px 20px;

    .navbar-nav .nav-item {
      &:hover {
        background: #FFFFF0;
        border-radius: 5px;
      }

      .nav-link {
        font-family: var(--main-font-family);
        font-size: 14px;
        font-weight: 600;
        color: var(--main-color);
      }
    }
  }
}
</style>
