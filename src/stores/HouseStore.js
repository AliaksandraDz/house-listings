import { defineStore } from 'pinia';

export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    houses: [],
    isActive: 'price',
    searchInput: '',
    searchQuery: '',
    searchPerformed: false,
  }),
  actions: {
    async getHouses() {
        const res = await fetch('https://api.intern.d-tt.nl/api/houses', {
            method: "GET",
            headers: {
                "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ",
                "Content-Type": "application/json"
                }
        })
        console.log("houses fetched")
        const data = await res.json()
        this.houses = data
    },
    toggleActive(buttonType) {
      this.isActive = buttonType;
      this.sortHouses();
    },
    sortHouses() {
      if (this.isActive === 'price') {
        this.houses.sort((a, b) => a.price - b.price);
      } else if (this.isActive === 'size') {
        this.houses.sort((a, b) => a.size - b.size);
      }
    },
    performSearch() {
      this.searchQuery = this.searchInput.toLowerCase().trim();
      this.searchPerformed = true;
    },
    clearSearch() {
      this.searchInput = '';
      this.searchQuery = '';
      this.searchPerformed = false;
      this.sortHouses();
    },
  },
  getters: {
    filteredHouses() {
      return this.houses.filter((house) => {
        return (
            house.location.street.toLowerCase().includes(this.searchQuery) ||
            house.location.city.toLowerCase().includes(this.searchQuery)
        );
      });
    },
  },
});