<template>
  <div class="houses">
    <div class="container">
      <h1>Houses</h1>
      <button class="create-button">+ Create new</button>
    </div>
    <div class="container">
      <div class="input-field-container">
        <input type="text" class="input-field" v-model="searchInput" placeholder="Search for a house" @keydown.enter="performSearch">
        <button class="search-button" @click="performSearch"> <!-- This button will trigger the search -->
          <img src="../assets/ic_search@3x.png" alt="Search" />
        </button>
      </div>
      <div class="btn-group">
          <button class="button-right" :class="{ active: isActive === 'size' }" @click="toggleActive('size')">Size</button>
          <button class="button-left" :class="{ active: isActive === 'price' }" @click="toggleActive('price')">Price</button>
      </div>
    </div>
    <div class="house-listing">
      <div v-for="house in filteredHouses" :key="house">
        <HouseListing :house="house" /> <!--passing a house as a prop-->
      </div>
    </div>
  </div>
  <div class="search-result">
    <p>{{ filteredHouses.length }} houses found</p>
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
    const searchInput = ref('');
    const searchQuery = ref('');
    const isActive = ref('price');

    const houses = [
      { title: "Stokvisstraat 132", price: 500, address: "1011AA Amsterdam", size: 120 },
      { title: "Gokvisstraat 50", price: 1000, address: "2022AA Rotterdam", size: 80 },
      { title: "Zokvisstraat 7", price: 300, address: "3033AA Haarlem", size: 30 },
    ];

    const filteredHouses = ref([...houses]);

    const toggleActive = (buttonType) => {
      isActive.value = buttonType;
      sortHouses();
    };

    const performSearch = () => {
    searchQuery.value = searchInput.value.toLowerCase().trim(); // Update searchQuery
    console.log(searchInput.value);
    filteredHouses.value = houses.filter((house) => {
      return (
        house.title.toLowerCase().includes(searchQuery.value) ||
        house.address.toLowerCase().includes(searchQuery.value)
      );
    });
    sortHouses();
  };

    const sortHouses = () => {
      if (isActive.value === 'price') {
        filteredHouses.value.sort((a, b) => a.price - b.price);
      } else if (isActive.value === 'size') {
        filteredHouses.value.sort((a, b) => a.size - b.size);
      }
    };

    // Initially, sort the houses
    sortHouses();

    return { houses, isActive, searchQuery, searchInput, filteredHouses, toggleActive, performSearch };
    },
}
</script>
