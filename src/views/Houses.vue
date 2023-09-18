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
        <button class="clear-button" @click="clearSearch" v-show="searchPerformed"> <!-- This button will trigger clearing the search -->
          <img src="../assets/ic_clear@3x.png" alt="Clear" />
        </button>
      </div>
      <div class="btn-group">
          <button class="button-right" :class="{ active: isActive === 'size' }" @click="toggleActive('size')">Size</button>
          <button class="button-left" :class="{ active: isActive === 'price' }" @click="toggleActive('price')">Price</button>
      </div>
    </div>
    <div class="search-result" v-show="searchPerformed && filteredHouses.length > 0">
      <p>{{ filteredHouses.length }} results found</p>
    </div>
    <div class="house-listing">
      <div v-for="house in filteredHouses" :key="house" class="filtered-house">
        <router-link :to="{ name: 'houseDetails', params: { id: house.id}}"> <!--pass a route parameter id - the id of the current house we are iterating. pass as obj-->
          <HouseListing :house="house" /> <!--passing a house as a prop-->
        </router-link>
      </div>
      <div class="no-results-wrapper" v-show="filteredHouses.length === 0">
        <div class="no-results">
          <img src="../assets/img_empty_houses@3x.png" alt="No results" />
          <p class="no-results-text">No results found.</p>
          <p class="no-results-text">Please try another keyword.</p>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal">
    <ModalComponent @closeModal="toggleModal" @deleteListing="toggleModal"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HouseListing from '@/components/HouseListing.vue'
import ModalComponent from './components/ModalComponent.vue'
import { ref, computed } from 'vue'

export default {
  name: 'Houses',
  components: {
    HouseListing, ModalComponent
  },
  setup() {
    const searchInput = ref('');
    const searchQuery = ref('');
    const isActive = ref('price');
    const searchPerformed = ref(false);
    const showModal = ref(false);

    const houses = [
      { title: "Stokvisstraat 132", price: 500, address: "1011AA Amsterdam", size: 120, id: 1 },
      { title: "Gokvisstraat 50", price: 1000, address: "2022AA Rotterdam", size: 80, id: 2 },
      { title: "Zokvisstraat 7", price: 300, address: "3033AA Haarlem", size: 30, id: 3 },
    ];

    const filteredHouses = ref([...houses]);

    const toggleActive = (buttonType) => {
      isActive.value = buttonType;
      sortHouses();
    };

    const performSearch = () => {
    searchQuery.value = searchInput.value.toLowerCase().trim(); // Update searchQuery
    filteredHouses.value = houses.filter((house) => {
      return (
        house.title.toLowerCase().includes(searchQuery.value) ||
        house.address.toLowerCase().includes(searchQuery.value)
      );
    });
    sortHouses();

    // Set searchPerformed to true when a search is performed
    searchPerformed.value = true;
    };

    const clearSearch = () => {
      searchInput.value = ''; // Clear the search input text
      searchQuery.value = ''; // Clear the search query
      filteredHouses.value = houses; // Reset filteredHouses to the initial list of houses
      searchPerformed.value = false; // Hide the search result
      sortHouses(); // Sort the houses again
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

    //Modal
    const toggleModal = () => {
      showModal.value = !showModal.value
    }

    return { houses, isActive, searchQuery, searchInput, filteredHouses, toggleActive, performSearch, searchPerformed, clearSearch, toggleModal};
    },
}
</script>
