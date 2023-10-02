import { defineStore } from 'pinia';

export const useHouseStore = defineStore('houseStore', {
  state: () => ({
    houses: [
      { title: "Stokvisstraat 132", price: 500, address: "1011AA Amsterdam", size: 120, id: 1 },
      { title: "Gokvisstraat 50", price: 1000, address: "2022AA Rotterdam", size: 80, id: 2 },
      { title: "Zokvisstraat 7", price: 300, address: "3033AA Haarlem", size: 30, id: 3 },
    ],
    isActive: 'price',
    searchInput: '',
    searchQuery: '',
    searchPerformed: false,
  }),
  actions: {
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
          house.title.toLowerCase().includes(this.searchQuery) ||
          house.address.toLowerCase().includes(this.searchQuery)
        );
      });
    },
  },
});