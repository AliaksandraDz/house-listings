<template>
    <div>
        <MqResponsive :target="['xxl', 'xl', 'lg']">
            <HouseEditLarge/>
        </MqResponsive>
        <MqResponsive :target="['xs', 'sm', 'md']">
            <HouseEditSmall/>
        </MqResponsive>
    </div>
</template>

<script>
// @ is an alias to /src
import HouseEditLarge from '@/components/HouseEditLarge.vue'
import HouseEditSmall from '@/components/HouseEditSmall.vue'
import { onMounted } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";

export default {
    name: 'HouseEditMain',
    components: {
        HouseEditLarge,
        HouseEditSmall,
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