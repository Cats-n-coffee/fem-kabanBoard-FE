<template>
    <Message>
        <template #title>
            Delete this task?
        </template>
        <template #content>
            Are you sure you want to delete the ‘Build settings UI’ task and its subtasks?
            This action cannot be reversed.
        </template>
        <template #actions>
            <div>
                <Button :click-handler="deleteTask">
                    <template #label>
                        <span class="action-add-board-span">Delete</span>
                    </template>
                </Button>
                <Button :click-handler="toggleModal">
                    <template #label>
                        <span class="action-add-board-span">Cancel</span>
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

const deleteTask = () => {
    console.log('delete board');
}
</script>