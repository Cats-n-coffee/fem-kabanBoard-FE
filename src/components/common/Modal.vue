<template>
    <div class="modal">
        <AddTaskModal v-if="modalName === 'addTask'" />
        <DeleteBoardModal v-if="modalName === 'deleteBoard'" />
        <TaskViewModal v-if="modalName === 'viewTask'" />
        <EditTaskModal v-if="modalName === 'editTask'" />
        <DeleteTaskModal v-if="modalName === 'deleteTask'" />
        <AddEditBoardModal
          v-if="modalName === 'addBoard' || modalName === 'editBoard'"
          :modal-name="modalName"
        />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import AddTaskModal from '@/components/modals/AddTaskModal.vue';
import DeleteBoardModal from '@/components/modals/DeleteBoardModal.vue';
import TaskViewModal from '@/components/modals/TaskViewModal.vue';
import EditTaskModal from '@/components/modals/EditTaskModal.vue';
import DeleteTaskModal from '@/components/modals/DeleteTaskModal.vue';
import { useAppModal } from '@/stores/appGlobals';
import AddEditBoardModal from '@/components/modals/AddEditBoardModal.vue';

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