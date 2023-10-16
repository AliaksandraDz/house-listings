<template>
    <div class="house-details">
        <div class="wrapper">
            <router-link to="/">
            <button class="back-button">
                <img src="../assets/ic_back_grey@3x.png" alt="Back" />
            </button>
            </router-link>
            <p>Back to overview</p>
        </div>
        <div class="wrapper">
            <span class="house-card">
                <div class="house-card-info">
                    <img :src="houseDetails.image" alt="house-image" />
                    <div class="house-card-text">
                        <p>{{ houseDetails.location.street }} {{ houseDetails.location.houseNumber }}</p>
                        <p>{{ houseDetails.location.zip }} {{ houseDetails.location.city }}</p>
                        <p>{{ houseDetails.price }} {{ houseDetails.size }} Built in {{ houseDetails.constructionYear }}</p>
                        <p>{{ houseDetails.rooms.bedrooms }} {{ houseDetails.rooms.bathrooms }} {{ houseDetails.hasGarage ? 'yes' : 'no' }}</p>
                        <p>{{ houseDetails.description }}</p>
                        <p>The house id is {{ $route.params.id }}</p> <!--get access to the route obj-->
                        <div class="house-card-actions">
                            <router-link :to="{ name: 'houseEdit', params: { id: $route.params.id}}"> 
                                <button class="edit-button">
                                    <img src="../assets/ic_edit@3x.png" alt="Edit" />
                                </button>
                            </router-link>
                            <button class="delete-button" @click="showModal = true">
                                <img src="../assets/ic_delete@3x.png" alt="Delete" />
                            </button>
                        </div>
                    </div>
                </div>
            </span>
            <span class="recommended">
                Recommended for you
                <p v-for="recommendedHouse in recommendations" :key="recommendedHouse.id" class="recommended-house">
                    <span>
                        <span class="recommended-card-info">
                            <img :src="recommendedHouse.image" alt="house-image" />
                            <p>{{ recommendedHouse.location.street }} {{ recommendedHouse.location.houseNumber }}</p>
                            <p>{{ recommendedHouse.price }} </p>
                            <p>{{ recommendedHouse.location.zip }} {{ recommendedHouse.location.city }}</p>
                            <p>{{ recommendedHouse.rooms.bedrooms }} {{ recommendedHouse.rooms.bathrooms }} {{ recommendedHouse.size }}</p>
                        </span>
                    </span>
                </p>
            </span>
        </div>
    </div>
    <!-- <div v-if="showModal"> -->
      <ModalComponent v-if="showModal" :house="houseDetails" @close="showModal = false"/>
    <!-- </div> -->
  </template>

<script>
import { useRoute } from 'vue-router';
import { useHouseStore } from '@/stores/HouseStore'
import { ref } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue'


export default {
    components: {
      ModalComponent
    },
    setup(props) {
        const route = useRoute();  
        const houseStore = useHouseStore();
        const houseDetails = ref(houseStore.houses.find((house) => house.id == route.params.id));
        const recommendations = ref(houseStore.houses.slice(0, 3));
        const showModal = ref(route.query.delete === "true");

        return {showModal, houseDetails, recommendations, houseStore}
    }
}
</script>