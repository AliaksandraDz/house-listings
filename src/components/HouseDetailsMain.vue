<template>
    <div>
        <MqResponsive :target="['xxl', 'xl', 'lg']">
            <HouseDetailsLarge/>
        </MqResponsive>
        <MqResponsive :target="['xs', 'sm', 'md']">
            <HouseDetailsSmall/>
        </MqResponsive>
    </div>
</template>

<script>
// @ is an alias to /src
import HouseDetailsLarge from '@/components/HouseDetailsLarge.vue'
import HouseDetailsSmall from '@/components/HouseDetailsSmall.vue'
import { onMounted } from "vue";
import { MqResponsive } from "vue3-mq";
import { updateBreakpoints } from "vue3-mq";

export default {
    name: 'HouseDetailsMain',
    components: {
        HouseDetailsLarge,
        HouseDetailsSmall,
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