import { defineStore } from 'pinia';
import { baseUrl } from '../shared/baseUrl';
import { apiKey } from '../shared/apiKey';

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
      const res = await fetch(baseUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey
        },
      });
      const data = await res.json()
      this.houses = data
      if(res.error) {
        console.log(res.error)
      };
    },
    async deleteHouse(id) {
      console.log('delete clicked')
      const res = await fetch(baseUrl + id, {
        method: "DELETE",
        headers: {
          "X-Api-Key": apiKey
        },
      },
      console.log('deleted house with id: ', id)
      );
      console.log('deleting completed')
      if(res.error) {
        console.log(res.error)
      };
    },
    async addHouse(house, image) {
      this.houses.push(house)
      const res = await fetch(baseUrl, {
        method: 'POST',
        body: house,
        headers: {
          "X-Api-Key": apiKey
        },
      });
      const resBody = await res.json();
      if (res.error) {
        console.log(res.error)
        return;
      };
      const resImage = await fetch(baseUrl + resBody.id + '/upload', {
        method: 'POST',
        body: image,
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if(resImage.error) {
        console.log(resImage.error)
      };

      // //TEST ROUTER PUSH:
      // this.$router.push({ name: 'HouseDetailsMain', params: { id: resBody.id } });
    },
    async editHouse(house, image, id) {
      const res = await fetch(baseUrl + id, {
        method: 'PUT',
        body: house,
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if (res.error) {
        console.log(res.error)
        return;
      };
      const resImage = await fetch(baseUrl + id + '/upload', {
        method: 'PUT',
        body: image,
        headers: {
          "X-Api-Key": apiKey
        },
      });
      if(resImage.error) {
        console.log(resImage.error)
      };
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
      };
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
      this.sortHouses();
      return this.houses.filter((house) => {
        return (
          house.location.street.toLowerCase().includes(this.searchQuery) ||
          house.location.city.toLowerCase().includes(this.searchQuery)
        );
      });
    },
  },
});