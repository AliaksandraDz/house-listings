<template>
  <div class="house-create">
    <div class="house-create-wrapper">
      <router-link to="/">
        <button class="back-button">
            <img src="../assets/ic_back_grey@3x.png" alt="Back" />
        </button>
      </router-link>
      <p>Back to overview</p>
      <h2>Create new listing</h2>

      <form @submit.prevent="handleSubmit"> <!-- modify the default event, prevent in this case -->

        <div class="full-size">
          <label>Street name*</label> <!--label: for Screen reader users and to increase the hit area. must be equal to the id attribute of the related element to bind them together.-->
          <input type="text" required v-model="inputData.location.street" placeholder="Enter the street name"> <!--required is a Boolean attribute which, if present, indicates that the user must specify a value for the input -->
        </div>

        <div class="half-size">
          <label>House number*</label>
          <input type="number" required v-model="inputData.location.houseNumber" placeholder="Enter the house number"> <!--a two-way binding: the data from input is binded with the data from data() and gets updated in both ways-->
          <!-- <div v-if="passwordError" class="error">{{ passwordError }}</div> -->
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
          <input type="file" required @change="handleImageChange" src="../assets/ic_upload@3x.png">
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
          <select v-model="inputData.hasGarage" placeholder="Select"> <!--the value in option is binded with the value in data()-->
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

        <div class="submit-form-button"> <!--a button inside a form has an event to submit the form by default-->
          <button>Post</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
import { useHouseStore } from '@/stores/HouseStore';
import { ref } from 'vue';

export default {
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


    let image = null;
    const handleImageChange = (e) => {
      image = e.target.files[0];
    };

    const handleSubmit = async () => {

      try {
        // Prepare the house data based on the form input values

        const newHouse = new FormData();
        newHouse.append('price', inputData.value.price);
        newHouse.append('bedrooms', inputData.value.rooms.bedrooms);
        newHouse.append('bathrooms', inputData.value.rooms.bathrooms);
        newHouse.append('size', inputData.value.size);
        newHouse.append('streetName', inputData.value.location.street);
        newHouse.append('houseNumber', inputData.value.location.houseNumber);
        newHouse.append('numberAddition', inputData.value.location.houseNumberAddition);
        newHouse.append('zip', inputData.value.location.zip);
        newHouse.append('city', inputData.value.location.city);
        newHouse.append('constructionYear', inputData.value.constructionYear);
        newHouse.append('hasGarage', inputData.value.hasGarage ? 'true' : 'false');
        newHouse.append('description', inputData.value.description);
        
        const imageFormData = new FormData();
        imageFormData.append('image', image);

        console.log('New house data:', newHouse);

        // Call the addHouse action to submit the form data
        await houseStore.addHouse(newHouse, imageFormData);
        //await post image

      } catch (error) {
        console.error('Error:', error);
      }
    };

    return {inputData, handleSubmit, handleImageChange};
  },
  };
  </script>

<!-- const handleSubmit = async () => {

  try {
    // Prepare the house data based on the form input values
    const newHouse = {
      location: { ...inputData.value.location },
      price: inputData.value.price,
      size: inputData.value.size,
      hasGarage: inputData.value.hasGarage, // Convert to boolean
      rooms: { ...inputData.value.rooms },
      constructionYear: inputData.value.constructionYear,
      description: inputData.value.description,
    };

    console.log('New house data:', newHouse);

    // Call the addHouse action to submit the form data
    await houseStore.addHouse(newHouse);

    console.log('Data successfully posted:', newHouse)

  } catch (error) {
    console.error('Error:', error);
  }
};

return { houseStore, inputData, handleSubmit };
},
}; -->

<!-- setup() {
  const houseStore = useHouseStore()

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
  description: '',
}); -->

<!-- try {
  // Prepare the house data based on the form input values

  const newHouse = new FormData();
  newHouse.append('price', inputData.value.price);
  newHouse.append('rooms[bedrooms]', inputData.value.rooms.bedrooms);
  newHouse.append('rooms[bathrooms]', inputData.value.rooms.bathrooms);
  newHouse.append('size', inputData.value.size);
  newHouse.append('location[streetName]', inputData.value.location.street);
  newHouse.append('location[houseNumber]', inputData.value.location.houseNumber);
  newHouse.append('location[numberAddition]', inputData.value.location.houseNumberAddition);
  newHouse.append('location[zip]', inputData.value.location.zip);
  newHouse.append('location[city]', inputData.value.location.city);
  newHouse.append('constructionYear', inputData.value.constructionYear);
  newHouse.append('hasGarage', inputData.value.hasGarage ? 'true' : 'false');
  newHouse.append('description', inputData.value.description);

  console.log('New house data:', newHouse);

  // Call the addHouse action to submit the form data
  await houseStore.addHouse(newHouse);

  console.log('Data successfully posted:', newHouse)

} catch (error) {
  console.error('Error:', error);
}
}; -->