<template>
    <div class="topbar">
        <h1 v-if="hideSidebar">
            <Logo />
        </h1>
        <div class="persistent-bar" :class="{ reduced: !hideSidebar}">
            <div class="board-title-action">
                <LogoMobile class="logo-mobile" />
                <h2>{{ boardName }}</h2>
                <button class="sidebar-toggle-mobile" @click="handleSidebarMobile">
                    <ChevronDownIcon class="chevron" :class="{ rotate: !hideSidebar }"/>
                </button>
            </div>
            <div class="bar-actions">
                <Button :click-handler="addNewTaskHandler" class="action-add-task">
                    <template #icon>+</template>
                    <template #label>
                        <span class="action-add-task-span">Add New Task</span>
                    </template>
                </Button>
                <EllipsisButton
                  :show-edit-modal="showEditBoardModal"
                  :show-delete-modal="showDeleteBoardModal"
                  edit-action-text="Edit Board"
                  delete-action-text="Delete Board"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import Button from '@/components/common/Button.vue';
import Logo from '@/components/common/Logo.vue';
import ChevronDownIcon from '@/assets/images/icon-chevron-down.svg?component';
import LogoMobile from '@/assets/images/logo-mobile.svg?component';
import EllipsisButton from '@/components/common/EllipsisButton.vue';
import { useHideSidebar, useAppModal } from '@/stores/appGlobals';
import { useCurrentBoard } from '@/stores/current';

defineProps<{
    msg: string
}>()

// Current board
const currentBoardStore = useCurrentBoard();
const { getCurrentBoard } = currentBoardStore;

const boardName = computed(() => {
    return getCurrentBoard().name;
});

// Sidebar
const sidebarStore = useHideSidebar();
const { hideSidebar } = storeToRefs(sidebarStore);
const { handleSidebarMobile } = sidebarStore;

// Modals
const appModalStore = useAppModal();
const { toggleModal, setModalName } = appModalStore;

const addNewTaskHandler = () => {
    toggleModal();
    setModalName('addTask');
};

const showEditBoardModal = () => {
    toggleModal();
    setModalName('editBoard');
}

const showDeleteBoardModal = () => {
    toggleModal();
    setModalName('deleteBoard');
}
</script>

<style scoped lang="less">
.topbar {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--light);
    border-bottom: 1px solid var(--medium);
}

.persistent-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 18px;

    @media screen and (min-width: 700px) {
        border-left: 1px solid var(--medium);
        padding: 16px 24px;

        &.reduced {
            width: calc(100vw - 250px);
        }
    }
}

.board-title-action {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
        color: var(--font-primary);
        font-size: 18px;
        font-weight: 700;
    }

    .logo-mobile {
        margin-right: 18px;
    }

    @media screen and (min-width: 700px) {
        .logo-mobile {
            display: none;
        }

        h2 {
            font-size: 24px;
        }

    }
}

.sidebar-toggle-mobile {
    background: none;
    border: none;
    padding: 8px;

    &:hover {
        cursor: pointer;
    }

    @media screen and (min-width: 700px) {
        display: none;
    }

    .chevron {
        transition: all 500ms ease-in-out;

        &.rotate {
            transform: rotateX(180deg);
        }
    }
}

.bar-actions {
    display: flex;
    align-items: center;
    justify-items: center;
    position: relative;
}

.more-actions {
    background: none;
    border: none;
    margin-left: 24px;

    &:hover {
        cursor: pointer;
    }
}

.board-actions-menu {
    position: absolute;
    width: 200%;
    background-color: var(--board-actions);
    top: 120%;
    right: 0;
    display: none;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 16px;
    gap: 16px;
    border-radius: 8px;

    &.show {
        display: flex;
    }

    button {
        background: none;
        border: none;
        font-size: 13px;
        font-weight: 500;
        color: var(--font-secondary);

        &:hover {
            cursor: pointer;
            color: var(--font-primary);
        }
    }

    .action-delete-board {
        color: var(--red);

        &:hover {
            color: var(--light-red);
        }
    }

    @media screen and (min-width: 700px) {
        width: 100%;
    }
}

:deep(.action-add-task) {
    padding: 10px 18px;

    @media screen and (min-width: 700px) {
        padding: 15px 24px;
    }
}

:deep(.action-add-task-span) {
    display: none;

    @media screen and (min-width: 700px) {
        display: inline;
        padding-left: 5px;
    }
}
</style>