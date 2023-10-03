<template>
    <div class="house">
      <div class="house-info">
        <p>{{ house.location.street }}</p>
        <p>{{ house.price }}</p>
        <p>{{ house.location.city }}</p>
        <p>size: {{ house.size }}</p>
        <div class="house-actions">
          <router-link :to="{ name: 'houseEdit', params: { id: house.id}}"> 
            <button class="edit-button">
                <img src="../assets/ic_edit@3x.png" alt="Edit" />
            </button>
          </router-link>
          <button class="delete-button" @click="handleDeleteButtonClick">
            <img src="../assets/ic_delete@3x.png" alt="Delete" />
          </button>
        </div>
      </div>
    </div>
</template>
  
  <script>
  import { useHouseStore } from '@/stores/HouseStore'

  export default {
    props: ['house'],
    setup() {
        const houseStore = useHouseStore()
        return {houseStore}
    }
  }
  </script>