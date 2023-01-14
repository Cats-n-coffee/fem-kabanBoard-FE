<template>
    <div class="modal">
        <TaskViewModal v-if="modalName === 'viewTask'" />
        <DeleteModal
          v-if="modalName === 'deleteTask' || modalName === 'deleteBoard'"
          :modal-name="modalName"
        />
        <AddEditBoardModal
          v-if="modalName === 'addBoard' || modalName === 'editBoard'"
          :modal-name="modalName"
        />
        <AddEditTaskModal
          v-if="modalName === 'addTask' || modalName === 'editTask'"
          :modal-name="modalName"
        />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import TaskViewModal from '@/components/modals/TaskViewModal.vue';
import DeleteModal from '@/components/modals/DeleteModal.vue';
import { useAppModal } from '@/stores/appGlobals';
import AddEditBoardModal from '@/components/modals/AddEditBoardModal.vue';
import AddEditTaskModal from '@/components/modals/AddEditTaskModal.vue';

const appModalStore = useAppModal();
const { modalName } = storeToRefs(appModalStore);
</script>

<style scoped lang="less">
.modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--blur);
    padding: 24px;
    z-index: 3;

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}
</style>