<template>
  <div>
    <div class="house-details">
        <div class="wrapper-house-details">
            <router-link to="/">
                <button class="back-button">
                    <picture>
                        <!-- Small devices -->
                        <source srcset="../assets/ic_back_white@3x.png" media="(max-width: 1000px)">
                        <!-- Large devices -->
                        <source srcset="../assets/ic_back_grey@3x.png">
                        <img src="../assets/ic_back_grey@3x.png" alt="Back">
                    </picture> 
                </button>
            </router-link>
            <p class="back-label">Back to overview</p>
        </div>
        <!-- Small devices -->
        <div class="wrapper-house-card-sm">
            <button class="delete-button-sm" @click="showModal = true">
                <img src="../assets/ic_delete_white@3x.png" alt="Delete" />
            </button>
            <router-link :to="{ name: 'HouseEditMain', params: { id: $route.params.id}}"> 
                <button class="edit-button-sm">
                    <img src="../assets/ic_edit_white@3x.png" alt="Edit" />
                </button>
            </router-link>
            <img src="../assets/house10.jpg" class="house-card-info-img-sm" alt="House Image" />
            <!--DDT server:-->
            <!-- <img v-if="houseDetails.image" :src="houseDetails.image" class="house-card-info-img-sm" alt="House Image" />
            <img v-else src="../assets/house10.jpg" class="house-card-info-img-sm" alt="House Image" /> -->
        </div>
        <!--large starts-->
        <div class="wrapper-house-card">
                <div class="house-card">
                    <div class="house-card-info">
                        <img src="../assets/house10.jpg" class="house-card-info-img" alt="House Image" />
                            <!--DDT server:-->
                            <!-- <img v-if="houseDetails.image" :src="houseDetails.image" class="house-card-info-img" alt="House Image" /> -->
                            <!-- <img v-else src="../assets/house10.jpg" class="house-card-info-img" alt="House Image" /> -->
        <!--large ends-->
                        <div class="house-card-text">
                            <h3>{{ houseDetails.location.street }} {{ houseDetails.location.houseNumber }}</h3>
                            <h1>{{ houseDetails.location.street }} {{ houseDetails.location.houseNumber }}</h1>
                            <div class="house-card-icons">
                                <p><img src="../assets/ic_location@3x.png" alt="Location" /> {{ houseDetails.location.zip }} {{ houseDetails.location.city }}</p>
                                <p><img src="../assets/ic_price@3x.png" alt="Price" /> {{ houseDetails.price }} <img src="../assets/ic_size@3x.png" alt="Size" /> {{ houseDetails.size }} <img src="../assets/ic_construction_date@3x.png" alt="Date" /> Built in {{ houseDetails.constructionYear }}</p>
                                <p><img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ houseDetails.rooms.bedrooms }} <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ houseDetails.rooms.bathrooms }} <img src="../assets/ic_garage@3x.png" alt="Garage" /> {{ houseDetails.hasGarage ? 'yes' : 'no' }}</p>
                            </div>
                            <p>{{ houseDetails.description }}</p>
                            <!--large starts-->
                            <div class="house-card-actions">
                                <router-link :to="{ name: 'HouseEditMain', params: { id: $route.params.id}}"> 
                                    <button class="edit-button">
                                        <img src="../assets/ic_edit@3x.png" alt="Edit" />
                                    </button>
                                </router-link>
                                <button class="delete-button" @click="showModal = true">
                                    <img src="../assets/ic_delete@3x.png" alt="Delete" />
                                </button>
                            </div>
                            <!--large ends-->
                        </div>
                    </div>
                </div>
                <div class="recommended">
                    <h2>Recommended for you</h2>
                    <div v-for="recommendedHouse in recommendations" :key="recommendedHouse.id" class="recommended-house">
                        <div class="recommended-card-info">
                            <!--DDT server:-->
                            <!-- <img :src="recommendedHouse.image" class="recommended-card-info-img" alt="House Image" /> -->
                            <img src="../assets/house10.jpg" class="recommended-card-info-img" alt="House Image" />
                            <div class="recommended-card-text">
                                <h3>{{ recommendedHouse.location.street }} {{ recommendedHouse.location.houseNumber }}</h3>
                                <p>€ {{ recommendedHouse.price }} </p>
                                <p>{{ recommendedHouse.location.zip }} {{ recommendedHouse.location.city }}</p>
                                <p><img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ recommendedHouse.rooms.bedrooms }} <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ recommendedHouse.rooms.bathrooms }} <img src="../assets/ic_size@3x.png" alt="Size" /> {{ recommendedHouse.size }} m2</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      <ModalComponent v-if="showModal" :house="houseDetails" @close="showModal = false"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useRoute } from 'vue-router';
import { useHouseStore } from '@/stores/HouseStore'
import { ref } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue'

export default {
    name: 'HouseDetailsMain',
    components: {
      ModalComponent
    },
    setup() {
        const route = useRoute();  
        const houseStore = useHouseStore();
        const houseDetails = ref(houseStore.houses.find((house) => house.id == route.params.id));
        const recommendations = ref(houseStore.houses.slice(0, 3));
        const showModal = ref(route.query.delete === "true");

        return { showModal, houseDetails, recommendations, houseStore }
    },
};
</script>