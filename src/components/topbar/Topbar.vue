<template>
    <div class="topbar">
        <h1 v-if="hideSidebar">
            <Logo />
        </h1>
        <div class="persistent-bar">
            <div class="board-title-action">
                <LogoMobile class="logo-mobile" />
                <h2>Board name</h2>
                <button class="sidebar-toggle-mobile" @click="handleSidebarMobile">
                    <ChevronDownIcon />
                </button>
            </div>
            <div class="bar-actions">
                <Button :click-handler="addNewTaskHandler" class="action-add-task">
                    <template #icon>+</template>
                    <template #label>
                        <span class="action-add-task-span">Add New Task</span>
                    </template>
                </Button>
                <button @click="showMoreActions" class="more-actions">
                    <VerticalEllipsisIcon />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Button from '@/components/common/Button.vue';
import Logo from '@/components/common/Logo.vue';
import VerticalEllipsisIcon from '@/assets/images/icon-vertical-ellipsis.svg?component';
import ChevronDownIcon from '@/assets/images/icon-chevron-down.svg?component';
import LogoMobile from '@/assets/images/logo-mobile.svg?component';
import { useHideSidebar } from '@/stores/appGlobals';

defineProps<{
    msg: string
}>()

const sidebarStore = useHideSidebar();
const { hideSidebar } = storeToRefs(sidebarStore);
const { handleSidebarMobile } = sidebarStore;

const addNewTaskHandler = () => {
    console.log('add task');
};

const showMoreActions = () => {
    console.log('show actions');
};
</script>

<style scoped lang="less">
.topbar {
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

    @media screen and (min-width: 600px) {
        border-left: 1px solid var(--medium);
        padding: 16px 24px;
    }
}

.board-title-action {
    display: flex;
    justify-content: center;
    align-items: center;

    .logo-mobile {
        margin-right: 18px;

        @media screen and (min-width: 600px) {
            display: none;
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

    @media screen and (min-width: 600px) {
        display: none;
    }
}

.bar-actions {
    display: flex;
    align-items: center;
    justify-items: center;
}

.more-actions {
    background: none;
    border: none;
    margin-left: 24px;

    &:hover {
        cursor: pointer;
    }
}

:deep(.action-add-task) {
    padding: 10px 18px;

    @media screen and (min-width: 600px) {
        padding: 16px 24px;
    }
}

:deep(.action-add-task-span) {
    display: none;

    @media screen and (min-width: 600px) {
        display: inline;
        padding-left: 5px;
    }
}
</style>