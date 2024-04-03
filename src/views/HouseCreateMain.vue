<template>
  <div class="house-create">
    <div class="house-create-wrapper">
      <router-link to="/">
        <button class="back-button">
            <img src="../assets/ic_back_grey@3x.png" alt="Back" />
        </button>
      </router-link>
      <p class="back-label">Back to overview</p>
      <h1>Create new listing</h1>
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
          <p>It is possible to upload an image, but it will not be sent to the server because it is a JSON server.</p>
          <div class="input-wrapper" id="img">
            <input type="file" @change="handleImageChange">
            <button class="clear-button-white" @click="clearImage($event)" v-show="image !== null">
              <img src="../assets/ic_clear_white@3x.png" alt="Clear" />
            </button>
          </div>
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
          <textarea id="description" required v-model="inputData.description" name="description" rows="4" cols="50" placeholder="Enter description"></textarea>
        </div>

        <div class="form-btn-wrapper">
          <button class="submit-form-button">Post</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { useHouseStore } from '@/stores/HouseStore';
import { ref } from 'vue';

export default {
    name: 'HouseCreateMain',
    setup() {
    const houseStore = useHouseStore();

    const inputData = ref({
      location: {
        street: '',
        houseNumber: '',
        houseNumberAddition: '',
        zip: '',
        city: '',
      },
      price: '',
      size: '',
      hasGarage: '',
      rooms: {
        bedrooms: '',
        bathrooms: '',
      },
      constructionYear: '',
      description: ''
    });

    const image = ref (null);
    let previousBackgroundImage;

    const handleImageChange = (e) => {
      image.value = e.target.files[0];
      if (image.value) {
        previousBackgroundImage = document.getElementById('img').style.backgroundImage;
        const imageUrl = URL.createObjectURL(image.value); // Convert the File object to a URL
        document.getElementById('img').style.backgroundImage = `url(${imageUrl})`; // Set the background image
      }
    };

    const clearImage = (event) => {
      event.preventDefault()
      image.value = null;
      document.getElementById('img').style.backgroundImage = previousBackgroundImage;
    };

    const handleSubmit = async () => {

      try {
        // Prepare the house data based on the form input value

        // my server
        const newHouse = {
          price: inputData.value.price,
          rooms: {
            bedrooms: inputData.value.rooms.bedrooms,
            bathrooms: inputData.value.rooms.bathrooms,
          },
          size: inputData.value.size,
          location: {
            street: inputData.value.location.street,
            houseNumber: inputData.value.location.houseNumber,
            houseNumberAddition: inputData.value.location.houseNumberAddition,
            zip: inputData.value.location.zip,
            city: inputData.value.location.city,
          },
          constructionYear: inputData.value.constructionYear,
          hasGarage: inputData.value.hasGarage ? true : false,
          description: inputData.value.description
        };

        //DDT server:
        // const newHouse = new FormData();
        // newHouse.append('price', inputData.value.price);
        // newHouse.append('bedrooms', inputData.value.rooms.bedrooms);
        // newHouse.append('bathrooms', inputData.value.rooms.bathrooms);
        // newHouse.append('size', inputData.value.size);
        // newHouse.append('streetName', inputData.value.location.street);
        // newHouse.append('houseNumber', inputData.value.location.houseNumber);
        // newHouse.append('numberAddition', inputData.value.location.houseNumberAddition);
        // newHouse.append('zip', inputData.value.location.zip);
        // newHouse.append('city', inputData.value.location.city);
        // newHouse.append('constructionYear', inputData.value.constructionYear);
        // newHouse.append('hasGarage', inputData.value.hasGarage ? 'true' : 'false');
        // newHouse.append('description', inputData.value.description);
        
        const imageFormData = new FormData();
        imageFormData.append('image', image);

        await houseStore.addHouse(newHouse, imageFormData);

      } catch (error) {
        console.error('Error:', error);
      };
    };

    return { inputData, handleSubmit, image, handleImageChange, clearImage };

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