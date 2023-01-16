<template>
    <button @click="showMoreActions" class="more-actions">
        <VerticalEllipsisIcon />
        <div class="actions-menu" :class="{ show: isActionModalOpen }">
            <button class="action-edit" @click="showEditModal">
                {{ editActionText }}
            </button>
            <button class="action-delete" @click="showDeleteModal">
                {{ deleteActionText }}
            </button>
        </div>
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VerticalEllipsisIcon from '@/assets/images/icon-vertical-ellipsis.svg?component';

export interface Props {
    showEditModal: ((payload: MouseEvent) => void) | undefined,
    showDeleteModal: ((payload: MouseEvent) => void) | undefined,
    editActionText: string,
    deleteActionText: string,
}

withDefaults(defineProps<Props>(), {
    showEditModal: () => {},
    showDeleteModal: () => {},
    editActionText: 'Edit',
    deleteActionText: 'Delete',
});

const isActionModalOpen = ref(false);

const showMoreActions = () => {
    isActionModalOpen.value = !isActionModalOpen.value;
};
</script>

<style scoped lang="less">
.more-actions {
    background: none;
    border: none;
    margin-left: 24px;
    position: relative;

    &:hover {
        cursor: pointer;
    }
}

.actions-menu {
    position: absolute;
    width: 200px;
    background-color: var(--board-actions);
    top: 45px;
    right: 0;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    gap: 16px;
    border-radius: 8px;
    box-shadow: var(--wide-shadow);

    &.show {
        display: flex;
        z-index: 5;
    }

    button {
        background: none;
        border: none;
        font-size: 13px;
        font-weight: 500;
        color: var(--font-secondary);
        text-align: left;
        width: 100%;

        &:hover {
            cursor: pointer;
            color: var(--font-primary);
        }
    }

    .action-delete {
        color: var(--red);

        &:hover {
            color: var(--light-red);
        }
    }

    @media screen and (min-width: 700px) {
        top: 50px;
    }
}
</style>