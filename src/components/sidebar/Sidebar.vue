<template>
    <div class="sidebar" v-if="!hideSidebar">
        <Logo class="sidebar-logo" />
        <div class="sidebar-main">
            <h2>All Boards (3)</h2>
            <div class="all-boards-actions">
                <ul>
                    <li
                      v-for="{ id, name } in boards"
                      :key="id"
                      @click="setCurrentBoard(id)"
                      :class="{ active: currentBoard.id === id }"
                    >
                        <BoardIcon />
                        <span>{{ name }}</span>
                    </li>
                </ul>
                <button class="create-board-button">
                    <BoardIcon fill="#635FC7" class="board-icon" />
                    <div>
                        <PlusIcon fill="#635FC7" />
                        <span>Create new board</span>
                    </div>
                </button>
            </div>
            <ThemeSwitcher />
            <button @click="handleHideSidebar" class="hide-sidebar-button">
                <HideSidebarIcon />
                <span>Hide Sidebar</span>
            </button>
        </div>
    </div>
    <div v-else></div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ThemeSwitcher from './ThemeSwitcher.vue';
import Logo from '@/components/common/Logo.vue';
import BoardIcon from '@/components/icons/BoardIcon.vue';
import PlusIcon from '@/components/icons/PlusIcon.vue';
import HideSidebarIcon from '@/assets/images/icon-hide-sidebar.svg?component';
import { useHideSidebar } from '@/stores/appGlobals';
import { useBoardsStore, useCurrentBoard } from '@/stores/boards';

const sidebarStore = useHideSidebar();
const { handleHideSidebar } = sidebarStore;

const boardsStore = useBoardsStore();
const { boards } = storeToRefs(boardsStore);

const currentBoardStore = useCurrentBoard();
const { currentBoard } = storeToRefs(currentBoardStore);
const { setCurrentBoard } = currentBoardStore;

defineProps<{
    hideSidebar: boolean,
}>()
</script>

<style scoped lang="less">
.sidebar {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--blur);
    left: 0;
    right: 0;
    top: 72px;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    @media screen and (min-width: 700px) {
        position: relative;
        max-width: 265px;
        align-items: flex-start;
        top: 0;
        background-color: var(--light);
        padding: 26px 0;
        border-right: 1px solid var(--medium);
    }

    @media screen and (min-width: 1000px) {
        max-width: 300px;
    }
}

.sidebar.slide {
    transform: translateY(100%);

    @media screen and (min-width: 700px) {
        transform: translateX(-100%);
    }
}

.sidebar-logo {
    display: none;

    @media screen and (min-width: 700px) {
        display: block;
    }
}

.sidebar-main {
    min-width: 250px;
    background-color: var(--light);
    padding-top: 16px;
    padding-bottom: 16px;
    margin-top: 16px;
    border-radius: 8px;

    h2 {
        color: var(--font-secondary);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 2.4px;
        padding-left: 32px;
    }

    @media screen and (min-width: 700px) {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        padding-bottom: 0;
        margin-top: 0;

        h2 {
            padding: 32px 0 0 32px;
        }
    }
}

.all-boards-actions {
    width: 100%;

    ul {
        width: 100%;
        padding-top: 20px;
    }

    ul li {
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        padding-left: 32px;

        span {
            margin-left: 16px;
            color: var(--font-secondary);
        }

        &:hover {
            cursor: pointer;
            background-color: var(--button-secondary);
            border-radius: 0 100px 100px 0;

            span {
                color: var(--primary);
            }

            :deep(svg path) {
                fill: var(--primary);
            }
        }

        &.active {
            background-color: var(--primary);
            border-radius: 0 100px 100px 0;

            span {
                color: var(--white);
            }

            :deep(svg path) {
                fill: var(--white);
            }
        }
    }

    @media screen and (min-width: 700px) {
        margin-bottom: auto;
    }
}

.create-board-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background: none;
    border: none;
    padding-left: 32px;
    width: 100%;
    height: 48px;

    .board-icon {
        margin-right: 12px;
    }

    span {
        font-size: 15px;
        font-weight: 700;
        color: var(--primary);
        margin-left: 4px;
    }

    &:hover {
        cursor: pointer;
        background-color: var(--button-secondary-hover);
        border-radius: 0 100px 100px 0;
    }
}

.hide-sidebar-button {
    display: none;

    @media screen and (min-width: 700px) {
        background: none;
        border: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 20px 24px;
        width: 100%;

        span {
            margin-left: 10px;
            font-family: var(--font-family);
            color: var(--font-secondary);
        }

        &:hover {
            cursor: pointer;
            background-color: var(--button-secondary);
            border-radius: 0 100px 100px 0;

            span {
                color: var(--primary);
            }

            :deep(svg path) {
                fill: var(--primary);
            }
        }
    }
}

.slide-fade-enter-active {
    transition: all 300ms ease-in;
}

.slide-fade-leave-active {
    transition: all 300ms ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(100%);

    @media screen and (min-width: 700px) {
        transform: translateX(-100%);
    }
}
</style>