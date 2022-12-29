<template>
    <Message>
        <template #title>
            Delete this board?
        </template>
        <template #content>
            Are you sure you want to delete the ‘Platform Launch’ board?
            This action will remove all columns and tasks and cannot be reversed.
        </template>
        <template #actions>
            <div class="side-by-side-actions">
                <Button :click-handler="deleteBoard" class-color="red">
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
import Message from '@/components/common/Message.vue';
import Button from '@/components/common/Button.vue';
import { useAppModal } from '@/stores/appGlobals';

const appModalStore = useAppModal();
const { toggleModal } = appModalStore;

const deleteBoard = () => {
    console.log('delete board');
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
