<template>
    <div class="house-edit">
      <div class="house-edit-wraper-sm">
        <router-link to="/">
          <button class="back-button">
            <img src="../assets/ic_back_grey@3x.png" alt="Back" />
          </button>
        </router-link>
        <h2 class="form-heading-sm">Edit listing</h2>
        <form @submit.prevent="handleSubmit">

          <div class="full-size">
            <label>Street name*</label>
            <input type="text" required v-model="inputData.location.street" placeholder="Enter the street name">
          </div>

          <div class="half-size">
            <label>House number*</label>
            <input type="number" required v-model="inputData.location.houseNumber" placeholder="Enter the house number">
          </div>

          <div class="half-size">
            <label>Addition (optional)</label>
            <input type="text" v-model="inputData.location.houseNumberAddition" placeholder="e.g. A">
          </div>

          <div class="full-size">
            <label>Postal code*</label>
            <input type="text" required v-model="inputData.location.zip" placeholder="e.g. 1000 AA">
          </div>

          <div class="full-size">
            <label>City*</label>
            <input type="text" required v-model="inputData.location.city" placeholder="e.g. Utrecht">
          </div>

          <div class="full-size">
            <label>Upload picture (PNG or JPG)*</label>
            <p>Please note that picture uploading is not implemented and presented for demonstration.</p>
            <input type="file" @change="handleImageChange" src="../assets/ic_upload@3x.png">
            <button class="clear-button-white" @click="image = null" v-show="image != null">
              <img src="../assets/ic_clear_white@3x.png" alt="Clear" />
            </button>
          </div>

          <div class="full-size">
            <label>Price*</label>
            <input type="number" required v-model="inputData.price" placeholder="e.g. €150.000">
          </div>

          <div class="half-size">
            <label>Size*</label>
            <input type="number" required v-model="inputData.size" placeholder="e.g. 60m2">
          </div>

          <div class="half-size">
            <label>Garage*</label>
            <select v-model="inputData.hasGarage">
              <option value="" disabled selected>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div class="half-size">
            <label>Bedrooms*</label>
            <input type="number" required v-model="inputData.rooms.bedrooms" placeholder="Enter amount">
          </div>

          <div class="half-size">
            <label>Bathrooms*</label>
            <input type="number" required v-model="inputData.rooms.bathrooms" placeholder="Enter amount">
          </div>

          <div class="full-size">
            <label>Construction date*</label>
            <input type="number" required v-model="inputData.constructionYear" placeholder="e.g. 1990">
          </div>

          <div class="full-size">
            <label>Description*</label>
            <input type="text" required v-model="inputData.description" placeholder="Enter description">
          </div>

          <div class="submit-form-button-sm">
            <button>Save</button>
          </div>

        </form>
      </div>
    </div>
</template>

<script>
import { useHouseStore } from '@/stores/HouseStore';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const houseStore = useHouseStore()
    const house = houseStore.houses.find((house) => house.id == route.params.id)
    const inputData = ref(house)

    let image = null;
    const handleImageChange = (e) => {
      image = e.target.files[0];
    };

    const handleSubmit = async () => {

      try {

        const editedHouse = new FormData();
        editedHouse.append('price', inputData.value.price);
        editedHouse.append('bedrooms', inputData.value.rooms.bedrooms);
        editedHouse.append('bathrooms', inputData.value.rooms.bathrooms);
        editedHouse.append('size', inputData.value.size);
        editedHouse.append('streetName', inputData.value.location.street);
        editedHouse.append('houseNumber', inputData.value.location.houseNumber);
        editedHouse.append('numberAddition', inputData.value.location.houseNumberAddition);
        editedHouse.append('zip', inputData.value.location.zip);
        editedHouse.append('city', inputData.value.location.city);
        editedHouse.append('constructionYear', inputData.value.constructionYear);
        editedHouse.append('hasGarage', inputData.value.hasGarage ? 'true' : 'false');
        editedHouse.append('description', inputData.value.description);

        const imageFormData = new FormData();
        imageFormData.append('image', image);

        console.log('Edited house data:', editedHouse);

        await houseStore.editHouse(editedHouse, imageFormData, house.id);

        // Redirect to the house details page
        router.push({ name: 'HouseDetailsMain', params: { id: house.id } });

      } catch (error) {
        console.error('Error:', error);
      };
    };

    return { image, inputData, handleSubmit, handleImageChange };
  },

  // Add a backgound image for the components HouseCreate and HouseEdit
  beforeMount() {
    document.getElementById('main').classList.add('background-wrapper');
  },
  unmounted() {
    document.getElementById('main').classList.remove('background-wrapper');
  },
};
</script>