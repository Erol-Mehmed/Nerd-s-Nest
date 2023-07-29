<script setup lang="ts">


</script>

<template>
  <footer>
    <div class="row">
      <div class="links col-md-6">
        <p class="links-headers">For Nerd's Nest</p>

        <ul>
          <li><a href="">About Us</a></li>
          <li><a href="">Contact Us</a></li>
          <li><a href="">Privacy Policy</a></li>
          <li><a href="">Terms of Service</a></li>
        </ul>
      </div>
      <div class="links col-md-6">
        <p class="links-headers">Follow us on social media:</p>
        
        <ul>
          <li><a href="">Facebook</a></li>
          <li><a href="">Twitter</a></li>
          <li><a href="">Instagram</a></li>
          <li><a href="">YouTube</a></li>
        </ul>
      </div>
    </div>
      <hr>
    <p class="copyright">Copyright &copy; 2023 Nerd's Nest. All rights reserved.</p>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    background: var(--main-color);
    padding: 50px 0;

    .row {
      margin-right: 0;
      padding: 0 150px;

      .links {
        .links-headers {
          font-size: 18px;
          font-weight: 600;
          color: var(--vt-c-white);
        }

        ul {
          padding: 0;
          list-style-type: none;

          li {
            a {
              font-size: 15px;
              color: var(--vt-c-white-soft);
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }

    .copyright {
      font-size: 14px;
      color: var(--vt-c-white);
      margin: 0 0 0 50px;
    }

    hr {
      color: var(--vt-c-white);
      margin-left: 50px;
      margin-right: 50px;
    }
  }
</style>
