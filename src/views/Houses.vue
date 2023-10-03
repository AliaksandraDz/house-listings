<template>
    <div class="houses">
      <div class="container">
        <h1>Houses</h1>
        <button class="create-button">+ Create new</button>
      </div>
      <div class="container">
        <div class="input-field-container">
          <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house" @keydown.enter="houseStore.performSearch">
          <button class="search-button" @click="houseStore.performSearch"> <!-- This button will trigger the search -->
            <img src="../assets/ic_search@3x.png" alt="Search" />
          </button>
          <button class="clear-button" @click="houseStore.clearSearch" v-show="houseStore.searchPerformed"> <!-- This button will trigger clearing the search -->
            <img src="../assets/ic_clear@3x.png" alt="Clear" />
          </button>
        </div>
        <div class="btn-group">
            <button class="button-right" :class="{ active: houseStore.isActive === 'size' }" @click="houseStore.toggleActive('size')">Size</button>
            <button class="button-left" :class="{ active: houseStore.isActive === 'price' }" @click="houseStore.toggleActive('price')">Price</button>
        </div>
      </div>
      <div class="search-result" v-show="houseStore.searchPerformed && houseStore.filteredHouses.length > 0">
        <p>{{ houseStore.filteredHouses.length }} results found</p>
      </div>
      <div class="house-listing">
        <div v-for="house in houseStore.filteredHouses" :key="house.id" class="filtered-house">
          <router-link :to="{ name: 'houseDetails', params: { id: house.id}}"> <!--pass a route parameter id - the id of the current house we are iterating. pass as obj-->
            <HouseListing :house="house" /> <!--passing a house as a prop-->
          </router-link>
        </div>
        <div class="no-results-wrapper" v-show="houseStore.filteredHouses.length === 0">
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
  import ModalComponent from '@/components/ModalComponent.vue'
  import { ref, onMounted } from 'vue'
  import { useHouseStore } from '@/stores/HouseStore'
  
  export default {
    name: 'Houses',
    components: {
      HouseListing, ModalComponent
    },
    setup() {
      const houseStore = useHouseStore()

      //fetch houses
      houseStore.getHouses()

      const showModal = ref(false);

      // Stays here, doesn't go to store
      const toggleModal = () => {
        showModal.value = !showModal.value
      }

      // Trigger sorting when the component is mounted
      onMounted(() => {
      houseStore.sortHouses()
      })
  
      return {toggleModal, houseStore};
      },
  }
  </script>