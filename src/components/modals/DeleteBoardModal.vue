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
            <div>
                <Button :click-handler="deleteBoard">
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

const deleteBoard = () => {
    console.log('delete board');
}
</script>