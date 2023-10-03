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
                <img src="../assets/img_placeholder_house@3x.png" alt="Back" />
                <div class="house-card-info">
                    <p>House Details</p>
                    <p>The house id is {{ $route.params.id }}</p> <!--get access to the route obj-->
                    <div class="house-card-actions">
                        <router-link :to="{ name: 'houseEdit', params: { id: $route.params.id}}"> 
                            <button class="edit-button">
                                <img src="../assets/ic_edit@3x.png" alt="Edit" />
                            </button>
                        </router-link>
                        <button class="delete-button" @click="handleDeleteButtonClick">
                            <img src="../assets/ic_delete@3x.png" alt="Delete" />
                        </button>
                    </div>
                </div>
            </span>
            <span class="recommended">
                Recommended for you
            </span>
        </div>
    </div>
  </template>

<script>

export default {
}
</script>