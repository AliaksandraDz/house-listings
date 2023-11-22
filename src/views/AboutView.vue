<template>
  <div>
    <hr>
    <MqResponsive target="xs">
      <div>This is an XS Screen</div>
    </MqResponsive>
    <MqResponsive target="sm">
      <div>This is an SM Screen</div>
    </MqResponsive>
    <MqResponsive target="md">
      <div>This is an MD Screen</div>
    </MqResponsive>
    <MqResponsive target="lg">
      <div>This is an LG Screen</div>
    </MqResponsive>
    <MqResponsive target="xl">
      <div>This is an XL Screen</div>
    </MqResponsive>
    <MqResponsive target="xxl">
      <div>This is an XXL Screen</div>
    </MqResponsive>

    <!-- Multiple -->
    <MqResponsive :target="['xs', 'lg']">
      <div>This will only show on x-small or large screens</div>
    </MqResponsive>
    <hr>
  </div>
</template>

<script>
import { onMounted, defineComponent } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";
export default defineComponent({
  name: 'About',
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
})
</script>