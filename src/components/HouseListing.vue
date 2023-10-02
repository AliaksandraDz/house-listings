<template>
    <div class="house">
      <div class="house-info">
        <p>{{ house.title }}</p>
        <p>{{ house.price }}</p>
        <p>{{ house.address }}</p>
        <p>size: {{ house.size }}</p>
        <div class="house-actions">
          <router-link to='/edit/1'> <!--pass id later-->
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
  export default {
      props: ['house']
  }
  </script>