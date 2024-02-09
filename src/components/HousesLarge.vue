<template>
    <div class="houses">
      <div class="container">
        <h1 class="h1-lg">Houses</h1>
        <router-link :to="{ name: 'HouseCreateMain' }">
          <button class="create-button btn-lg">+ Create new</button>
        </router-link>
      </div>
      <div class="container">
        <div class="input-field-container">
          <!-- <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house" @keydown.enter="houseStore.performSearch"> -->
          <!-- <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house" @keydown="houseStore.performSearch"> -->
          <!-- <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house" @oninput="houseStore.performSearch"> -->
          <input type="text" class="input-field" v-model="houseStore.searchInput" placeholder="Search for a house">
<!-- 
          <button class="search-button" @click="houseStore.performSearch">
            <img src="../assets/ic_search@3x.png" alt="Search" />
          </button> -->
          <img class="search-button" src="../assets/ic_search@3x.png" alt="Search" />

          <button class="clear-button" @click="houseStore.clearSearch" v-show="houseStore.searchInput.length > 0">
            <img src="../assets/ic_clear@3x.png" alt="Clear" />
          </button>
        </div>
        <div class="btn-group">
          <button class="button-right btn-lg" :class="{ active: houseStore.isActive === 'size' }" @click="houseStore.toggleActive('size')">Size</button>
          <button class="button-left btn-lg" :class="{ active: houseStore.isActive === 'price' }" @click="houseStore.toggleActive('price')">Price</button>
        </div>
      </div>
      <!-- <div class="search-result" v-show="houseStore.searchPerformed && houseStore.filteredHouses.length > 0"> -->
      <div class="search-result" v-show="houseStore.searchInput.length > 0">  
        <p>{{ houseStore.filteredHouses.length }} results found</p>
      </div>
      <div class="house-listing">
        <div v-for="house in houseStore.filteredHouses" :key="house.id" class="filtered-house">
            <HouseListing :house="house" />
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
  </template>
  
  <script>
  // @ is an alias to /src
  import HouseListing from '@/components/HouseListing.vue'
  import { useHouseStore } from '@/stores/HouseStore'
  import { watchEffect } from 'vue';
  
  export default {
    name: 'Houses',
    components: {
      HouseListing
    },
    setup() {
      const houseStore = useHouseStore()

      // houseStore.getHouses()

      watchEffect(() => {
        houseStore.getHouses(houseStore.searchInput)
      })
  
      return { houseStore };
    },
  };
  </script>