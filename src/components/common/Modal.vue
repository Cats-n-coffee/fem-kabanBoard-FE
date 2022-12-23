<template>
    <div class="modal">
        <button @click="toggleModal">close</button>
        <AddTaskModal v-if="modalName === 'addTask'"/>
    </div>
</template>

<script setup lang="ts">
import { useAppModal } from '@/stores/appGlobals';
import { storeToRefs } from 'pinia';
import AddTaskModal from '../modals/AddTaskModal.vue';

const appModalStore = useAppModal();
const { modalName } = storeToRefs(appModalStore);
const { toggleModal } = appModalStore;
</script>

<style scoped lang="less">
.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--blur);
    padding: 24px;
    z-index: 3;

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}
</style>