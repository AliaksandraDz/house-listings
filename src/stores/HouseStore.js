import { defineStore } from 'pinia';
import { baseUrl } from '../shared/baseUrl';

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
        // headers: {
        //   "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ",
        //   "Content-Type": "application/json"
        // },
      });
      const data = await res.json()
      this.houses = data
      if(res.error) {
        console.log(res.error)
      };
    },
    async deleteHouse(id) {
      const res = await fetch(baseUrl + id, {
        method: "DELETE",
        // headers: {
        //     "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ"
        // },
      });
      if(res.error) {
        console.log(res.error)
      };
    },
    async addHouse(house, image) {
      this.houses.push(house)
      const res = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(house),
        headers: {
          // "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ",
          "Content-Type": "application/json"
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
        // headers: {
        //   "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ"
        // },
      });
      if(resImage.error) {
        console.log(resImage.error)
      };
      return resBody;
    },
    async editHouse(house, image, id) {
      const res = await fetch(baseUrl + id, {
        method: 'PUT',
        body: JSON.stringify(house),
        headers: {
          // "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ",
          "Content-Type": "application/json"
        },
      });
      if (res.error) {
        console.log(res.error)
        return;
      };
      const resImage = await fetch(baseUrl + id + '/upload', {
        method: 'PUT',
        body: image,
        // headers: {
        //   "X-Api-Key": "Kngt62mRHejGYr3N7oPM_wxCOkfTAvXZ"
        // },
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