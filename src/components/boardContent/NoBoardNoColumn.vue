<template>
    <div class="modal-container">
        <p>{{ modalParagraph }}</p>
        <div class="modal-button">
            <Button
                class="submit-button"
                :click-handler="addAction"
            >
                <template #icon>+</template>
                <template #label>
                    <span class="action-add-board-span">{{ modalAddButton }}</span>
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Button from '@/components/common/Button.vue';
import { useAppModal } from '@/stores/appGlobals';

const props = defineProps<{
    messageName: string,
}>();

const modalParagraph = computed(() => {
    return props.messageName === 'addBoard'
     ? 'There are no boards to show, click below to get started.'
     : 'This board is empty. Create a new column to get started.'
});

const modalAddButton = computed(() => {
    return props.messageName === 'addBoard'
     ? 'Add New Board'
     : 'Add New Column';
});

const appModalStore = useAppModal();
const { setModalName, toggleModal } = appModalStore;

const addAction = () => {
    if (props.messageName === 'addBoard') {
        setModalName('addBoard');
    } else {
        setModalName('editBoard');
    }
    toggleModal();
}
</script>

<style scoped lang="less">
.modal-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        padding-bottom: 32px;
        font-weight: 500;
        font-size: 18px;
        color: var(--font-secondary);
    }

    .modal-button {
        max-width: 174px;
        width: 100%;
    }
}
</style>