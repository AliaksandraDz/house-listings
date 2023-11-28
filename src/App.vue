<template>
  <div>
    <MqResponsive :target="['xxl', 'xl', 'lg']">
      <header>
        <nav class="nav-header">
          <router-link to="/">
            <img alt="logo" src="./assets/img_logo@3x.png">
          </router-link>
          <router-link to="/">Houses</router-link>
          <router-link to="/about">About</router-link>
        </nav>
      </header>
    </MqResponsive>
    <router-view/>
    <MqResponsive :target="['xs', 'sm', 'md']">
      <footer>
        <nav class="nav-footer">
          <router-link to="/">
            <img class="btn-home" alt="logo" src="./assets/ic_mobile_navigarion_home@3x.png">
          </router-link>
          <router-link to="/about">
            <img class="btn-about" alt="logo" src="./assets/ic_mobile_navigarion_info@3x.png">
          </router-link>
        </nav>
      </footer>
    </MqResponsive>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";
export default {
    name: 'App',
    components: { MqResponsive },
    setup() {
    onMounted(() => {
      updateBreakpoints({
        preset: "bootstrap5"
      })
    })
    return {
    }
  }
};
</script>