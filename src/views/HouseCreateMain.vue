<template>
    <div>
        <MqResponsive :target="['xxl', 'xl', 'lg']">
            <HouseCreateLarge/>
        </MqResponsive>
        <MqResponsive :target="['xs', 'sm', 'md']">
            <HouseCreateSmall/>
        </MqResponsive>
    </div>
</template>

<script>
// @ is an alias to /src
import HouseCreateLarge from '@/components/HouseCreateLarge.vue'
import HouseCreateSmall from '@/components/HouseCreateSmall.vue'
import { onMounted } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";

export default {
    name: 'HouseCreateMain',
    components: {
        HouseCreateLarge,
        HouseCreateSmall,
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