<template>
    <div>
        <MqResponsive :target="['xxl', 'xl', 'lg']">
            <HousesLarge/>
        </MqResponsive>
        <MqResponsive :target="['xs', 'sm', 'md']">
            <HousesSmall/>
        </MqResponsive>
    </div>
</template>

<script>
// @ is an alias to /src
import HousesLarge from '@/views/HousesLarge.vue'
import HousesSmall from '@/views/HousesSmall.vue'
import { onMounted } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";

export default {
    name: 'Main',
    components: {
        HousesLarge,
        HousesSmall,
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
};
</script>