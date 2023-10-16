<template>
    <h2>HouseEdit</h2>
    <p>The house id is {{ $route.params.id }}</p> <!--get access to the route obj-->
    <div class="house-edit">
    <router-link to="/">
        <button class="back-button">
            <img src="../assets/ic_back_grey@3x.png" alt="Back" />
        </button>
    </router-link>
    <p>Back to overview</p>
    <h2>Create new listing</h2>

    <form @submit.prevent="handleSubmit"> <!-- modify the default event, prevent in this case -->

    <label>Street name*</label> <!--label: for Screen reader users and to increase the hit area. must be equal to the id attribute of the related element to bind them together.-->
    <input type="text" required v-model="inputData.location.street" placeholder="Enter the street name"> <!--required is a Boolean attribute which, if present, indicates that the user must specify a value for the input -->
    
    <label>House number*</label>
    <input type="number" required v-model="inputData.location.houseNumber" placeholder="Enter the house number"> <!--a two-way binding: the data from input is binded with the data from data() and gets updated in both ways-->
    <!-- <div v-if="passwordError" class="error">{{ passwordError }}</div> -->

    <label>Addition (optional)</label>
    <input type="text" v-model="inputData.location.houseNumberAddition" placeholder="e.g. A">

    <label>Postal code*</label>
    <input type="text" required v-model="inputData.location.zip" placeholder="e.g. 1000 AA">

    <label>City*</label>
    <input type="text" required v-model="inputData.location.city" placeholder="e.g. Utrecht">

    <label>Upload picture (PNG or JPG)*</label>
    <input type="file" required @change="handleImageChange" src="../assets/ic_upload@3x.png">

    <label>Price*</label>
    <input type="number" required v-model="inputData.price" placeholder="e.g. €150.000">

    <label>Size*</label>
    <input type="number" required v-model="inputData.size" placeholder="e.g. 60m2">

    <label>Garage*</label>
    <select v-model="inputData.hasGarage" placeholder="Select"> <!--the value in option is binded with the value in data()-->
      <option value="true">Yes</option>
      <option value="false">No</option>
    </select>

    <label>Bedrooms*</label>
    <input type="number" required v-model="inputData.rooms.bedrooms" placeholder="Enter amount">

    <label>Bathrooms*</label>
    <input type="number" required v-model="inputData.rooms.bathrooms" placeholder="Enter amount">

    <label>Construction date*</label>
    <input type="number" required v-model="inputData.constructionYear" placeholder="e.g. 1990">

    <label>Description*</label>
    <input type="text" required v-model="inputData.description" placeholder="Enter description">

    <div class="submit"> <!--a button inside a form has an event to submit the form by default-->
      <button>Post</button>
    </div>

  </form>

  </div>
</template>

<script>
import { useHouseStore } from '@/stores/HouseStore';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const route = useRoute();  
    const houseStore = useHouseStore()
    const house = houseStore.houses.find((house) => house.id == route.params.id)
    const inputData = ref(house)

    let image = null;
    const handleImageChange = (e) => {
      image = e.target.files[0];
    };

    const handleSubmit = async () => {

      try {
        // Prepare the house data based on the form input values

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

        // Call the addHouse action to submit the form data
        await houseStore.editHouse(editedHouse, imageFormData, house.id);
        //await post image

      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {handleImageChange, inputData, handleSubmit };
  },
  };
</script>