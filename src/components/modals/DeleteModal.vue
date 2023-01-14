<template>
    <Message>
        <template #title>
            {{ modalTitle }}
        </template>
        <template #content>
            Are you sure you want to delete the {{ modalParagraph }}
        </template>
        <template #actions>
            <div class="side-by-side-actions">
                <Button :click-handler="deleteAction" class-color="red">
                    <template #label>
                        <span class="action-delete-span">Delete</span>
                    </template>
                </Button>
                <Button :click-handler="toggleModal" class-color="light">
                    <template #label>
                        <span class="action-cancel-span">Cancel</span>
                    </template>
                </Button>
            </div>
        </template>
    </Message>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Message from '@/components/common/Message.vue';
import Button from '@/components/common/Button.vue';
import { useAppModal } from '@/stores/appGlobals';
import { useBoardsStore } from '@/stores/boards';
import { useCurrentBoard, useCurrentTask } from '@/stores/current';

const props = defineProps<{
    modalName: string, 
}>();

const currentBoardStore = useCurrentBoard();
const { getCurrentBoard } = currentBoardStore;
const currentTaskStore = useCurrentTask();
const { getCurrentTask } = currentTaskStore;

const modalTitle = computed(() => {
    return props.modalName === 'deleteBoard'
     ? 'Delete this board?'
     : 'Delete this task?'
});

const modalParagraph = computed(() => {
    return props.modalName === 'deleteBoard'
     ? `'${getCurrentBoard().name}' board?
     This action will remove all columns and tasks and cannot be reversed.`
     : `'${getCurrentTask().title}' task and its subtasks?
     This action cannot be reversed.`
});

const appModalStore = useAppModal();
const { toggleModal } = appModalStore;
const boardsStore = useBoardsStore();
const { deleteTask, deleteBoard } = boardsStore;

const deleteAction = () => {
    if (props.modalName === 'deleteBoard') {
        deleteBoard(getCurrentBoard().id);
    } else {
        deleteTask(getCurrentTask().id, getCurrentTask().parentColumnId);
    }
    toggleModal();
}
</script>

<style scoped lang="less">
.side-by-side-actions {
    display: flex;
    gap: 16px;
}

:deep(.action-delete-span) {
    color: var(--white);
}

:deep(.action-cancel-span) {
    color: var(--primary);
}
</style>