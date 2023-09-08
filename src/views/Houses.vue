<template>
  <div class="houses">
    <div class="container">
      <h1>Houses</h1>
      <button class="create-button">+ Create new</button>
    </div>
    <div class="container">
      <input type="text" class="input-field" placeholder="Search for a house">
      <div class="btn-group">
          <button class="button-right" :class="{ active: isActive === 'size' }" @click="toggleActive('size')">Size</button>
          <button class="button-left" :class="{ active: isActive === 'price' }" @click="toggleActive('price')">Price</button>
      </div>
    </div>
    <div class="house-listing">
      <div v-for="house in sortedHouses" :key="house">
        <HouseListing :house="house" /> <!--passing a house as a prop-->
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HouseListing from '@/components/HouseListing.vue'
import { ref, computed } from 'vue'

export default {
  name: 'Houses',
  components: {
    HouseListing
  },
  setup() {
    const isActive = ref('size');

    const houses = [
      { title: "Stokvisstraat 132", price: 500, address: "1011AA Amsterdam", size: 120 },
      { title: "Stokvisstraat 132", price: 1000, address: "1011AA Rotterdam", size: 80 },
      { title: "Stokvisstraat 132", price: 300, address: "1011AA Harlem", size: 30 },
    ];

    const sortedHouses = computed(() => {
      if (isActive.value === 'price') {
        // Sort houses by price in ascending order
        return [...houses].sort((a, b) => a.price - b.price);
      } else if (isActive.value === 'size') {
        // Sort houses by size in ascending order
        return [...houses].sort((a, b) => a.size - b.size);
      }
    });

    const toggleActive = (buttonType) => {
      isActive.value = buttonType;
    };

    return { houses, isActive, sortedHouses, toggleActive };
  },
}
</script>
