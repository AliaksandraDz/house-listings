<template>
  <!-- <div :class="{ backgroundwrapper: isHouseCreate }"> -->
    <header>
      <nav>
        <img alt="DTT logo" src="./assets/img_logo_dtt@3x.png">
        <router-link to="/">Houses</router-link>
        <router-link to="/about">About</router-link>
      </nav>
    </header>
    <router-view/>
  <!-- </div> -->
</template>

<!-- <script>
export default {
  computed: {
    isHouseCreate() {
      return this.$route.path === '/create';
    }
  }
}
</script> -->

<!-- <style scoped>
.isHouseCreate {
    background-image: url("./assets/img_background@3x.png");
}

</style> -->