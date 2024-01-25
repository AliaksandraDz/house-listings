<template>
    <div>
        <MqResponsive :target="['xxl', 'xl', 'lg']">
            <AboutLarge/>
        </MqResponsive>
        <MqResponsive :target="['xs', 'sm', 'md']">
            <AboutSmall/>
        </MqResponsive>
    </div>
</template>

<script>
import AboutLarge from '@/components/AboutLarge.vue'
import AboutSmall from '@/components/AboutSmall.vue'
import { onMounted, defineComponent } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";

export default defineComponent({
  name: 'About',
  components: { 
    AboutLarge,
    AboutSmall,
    MqResponsive
  },
  setup() {
    onMounted(() => {
      updateBreakpoints({
        preset: "bootstrap5"
      })
    })
    return {
    }
  }
})
</script>