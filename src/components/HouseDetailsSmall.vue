<template>
    <div>
        <router-link to="/">
            <button class="back-button-sm">
                <img src="../assets/ic_back_white@3x.png" alt="Back" />
            </button>
        </router-link>
        <button class="delete-button-sm" @click="showModal = true">
            <img src="../assets/ic_delete_white@3x.png" alt="Delete" />
        </button>
        <router-link :to="{ name: 'HouseEditMain', params: { id: $route.params.id}}"> 
            <button class="edit-button-sm">
                <img src="../assets/ic_edit_white@3x.png" alt="Edit" />
            </button>
        </router-link>
        <img v-if="houseDetails.image" :src="houseDetails.image" class="house-card-info-img-sm" alt="House Image" />
        <img v-else src="../assets/house10.jpg" class="house-card-info-img-sm" alt="House Image" />
        <div class="house-card-text-sm">
            <h3>{{ houseDetails.location.street }} {{ houseDetails.location.houseNumber }}</h3>
            <div class="house-card-icons-sm">
                <p><img src="../assets/ic_location@3x.png" alt="Location" /> {{ houseDetails.location.zip }} {{ houseDetails.location.city }}</p>
                <p><img src="../assets/ic_price@3x.png" alt="Price" /> {{ houseDetails.price }} <img src="../assets/ic_size@3x.png" alt="Size" /> {{ houseDetails.size }} m2 <img src="../assets/ic_construction_date@3x.png" alt="Date" /> Built in {{ houseDetails.constructionYear }}</p>
                <p><img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ houseDetails.rooms.bedrooms }} <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ houseDetails.rooms.bathrooms }} <img src="../assets/ic_garage@3x.png" alt="Garage" /> {{ houseDetails.hasGarage ? 'Yes' : 'No' }}</p>
            </div>
            <p>{{ houseDetails.description }}</p>
        </div>
        <div class="recommended-sm">
            <h3>Recommended for you</h3>
            <div v-for="recommendedHouse in recommendations" :key="recommendedHouse.id" class="recommended-house">
                <div class="recommended-card-info">
                    <img :src="recommendedHouse.image" class="recommended-card-info-img" alt="House Image" />
                    <div class="recommended-card-text">
                        <h3>{{ recommendedHouse.location.street }} {{ recommendedHouse.location.houseNumber }}</h3>
                        <p>€ {{ recommendedHouse.price }} </p>
                        <p>{{ recommendedHouse.location.zip }} {{ recommendedHouse.location.city }}</p>
                        <p><img src="../assets/ic_bed@3x.png" alt="Bed" /> {{ recommendedHouse.rooms.bedrooms }} <img src="../assets/ic_bath@3x.png" alt="Bath" /> {{ recommendedHouse.rooms.bathrooms }} <img src="../assets/ic_size@3x.png" alt="Size" /> {{ recommendedHouse.size }} m2</p>
                    </div>
                </div>
            </div>
        </div>
        <ModalComponent v-if="showModal" :house="houseDetails" @close="showModal = false"/>
    </div>
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