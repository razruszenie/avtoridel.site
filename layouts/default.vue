<template>
  <v-app style="background-color: rgb(252, 252, 252)!important">
    <Drawer></Drawer>
    <Navbar></Navbar>
    <noscript>Для корректной работы сайта включите Javascript в настройках Вашего браузера</noscript>
    <v-content>
      <v-container
              fluid
      >
        <transition
                name="fade"
                mode="out-in"
        >
          <nuxt></nuxt>
        </transition>

      </v-container>
    </v-content>
    <Snackbar></Snackbar>
    <Footer></Footer>
  </v-app>
</template>
<script>
  import Navbar from '~/components/Navbar'
  import Drawer from '~/components/Drawer'
  import Footer from '~/components/Footer'
  import Snackbar from '~/components/Snackbar'

  export default {

    components: {
      Snackbar,
      Drawer,
      Navbar,
      Footer
    }
  }
</script>
<style lang="scss">
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>