<template>
  <div class="house">
    <div class="house-info">
      <p>{{ house.title }}</p>
      <p>{{ house.price }}</p>
      <p>{{ house.address }}</p>
      <p>size: {{ house.size }}</p>
      <div class="house-actions">
      <button class="image-button small" @click="handleEditButtonClick">
        <img src="../assets/ic_edit@3x.png" alt="Edit" />
      </button>
      <button class="image-button small" @click="handleDeleteButtonClick">
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