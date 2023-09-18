<template>
      <div class="backdrop"> <!--backdrop - for a faded background behind the modal. .self - click event modifier, only trigger handler if event.target is the element itself, not from a child element -->
        <div class="modal">
            <h3>Delete listing</h3>
            <p>Are you sure you want to delete this listing?<br/>
            This action cannot be undone.</p>
            <button class="modal-delete" @click="deleteListing">Yes, delete</button>
            <button class="modal-back" @click="closeModal">Go back</button>
        </div>
    </div>
</template>

<script>
import { defineEmits } from 'vue';

export default {
    setup() {
        const { emit } = defineEmits(['closeModal', 'deleteListing']);

        const closeModal = () => {
            emit('closeModal') // create (emit) a custom event with the name 'close'
        };
        const deleteListing = () => {
            emit('deleteListing')
        }
    return {closeModal, deleteListing}
    }
}
</script>