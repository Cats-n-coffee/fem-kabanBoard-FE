<template>
    <div class="sidebar" v-if="!hideSidebar">
        <Logo class="sidebar-logo" />
        <div class="sidebar-main">
            <ul>
                <li>item 1</li>
                <li>item 2</li>
                <li>item 3</li>
            </ul>
            <button>Create new board</button>
            <button @click="handleHideSidebar">Hide</button>
            <ThemeSwitcher />
        </div>
    </div>
    <div v-else></div>
</template>

<script setup lang="ts">
import ThemeSwitcher from './ThemeSwitcher.vue';
import Logo from '@/components/common/Logo.vue';
import { useHideSidebar } from '@/stores/appGlobals';

const sidebarStore = useHideSidebar();
const { handleHideSidebar } = sidebarStore;

defineProps<{
    hideSidebar: boolean,
}>()
</script>

<style scoped lang="less">
.sidebar {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 500ms ease-in;
    background-color: var(--blur);
    left: 0;
    right: 0;
    top: 79px;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    @media screen and (min-width: 600px) {
        position: relative;
        max-width: 265px;
    }

    @media screen and (min-width: 1000px) {
        max-width: 300px;
    }
}

.sidebar.slide {
    transform: translateY(100%);

    @media screen and (min-width: 600px) {
        transform: translateX(-100%);
    }
}

.sidebar-logo {
    display: none;

    @media screen and (min-width: 600px) {
        display: block;
    }
}

.sidebar-main {
    min-width: 250px;
    background-color: var(--light);
    padding: 16px 0;
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

    @media screen and (min-width: 600px) {
        transform: translateX(-100%);
    }
}
</style>