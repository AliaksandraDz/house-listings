<template>
  <div>
      <header>
        <nav class="nav-header">
          <router-link to="/">
            <img alt="logo" src="./assets/img_logo@3x.png">
          </router-link>
          <router-link to="/">Houses</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </header>
    <router-view></router-view>
      <footer>
        <nav class="nav-footer">
          <router-link to="/">
            <img class="btn-home" alt="btn-home">
          </router-link>
          <router-link to="/about">
            <img class="btn-about" alt="btn-about">
          </router-link>
        </nav>
      </footer>
  </div>
</template>

<script>

export default {
    name: 'App',
};
</script>