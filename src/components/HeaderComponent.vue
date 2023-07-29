<script setup lang="ts">
import { ref } from 'vue'
import logo from '../assets/logo.svg'

let hideNavbar = ref(true);
</script>

<template>
  <header class="row">
    <nav class="navbar navbar-light col-md-1">
      <button @click="hideNavbar = !hideNavbar" class="navbar-toggler bg-light" data-toggle="collapse">
        <span class="navbar-toggler-icon" />
      </button>
      <div class="navbar-collapse" :class="{ collapse: hideNavbar }" id="n_bar">
        <ul class="navbar-nav">
          <li class="nav-item active"><a class="nav-link" href="#">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#">About</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Careers</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Blog</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Links</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Membership</a></li>
          <li class="nav-item"><a class="nav-link" href="#">Join Us</a></li>
        </ul>
      </div>
    </nav>

    <div class="logo-name col-md-3">
      <img :src="logo" alt="" />
      <h1>Nerd's Nest</h1>
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
      padding: 0 7px;

      .navbar-toggler-icon {
        width: 25px;
      }
    }

    .navbar-collapse {
      background: red;
    }
  }

  .logo-name {
    display: flex;
    align-items: center;

    h1 {
      font-size: 30px;
      margin: 0;
    }

    img {
      width: 20px;
      margin-right: 10px;
    }
  }
}
</style>
