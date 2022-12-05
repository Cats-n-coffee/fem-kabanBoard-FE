import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSwitchTheme = defineStore('theme', () => {
    const currentTheme = ref('light');

    function getTheme() {
        return currentTheme.value;
    }

    function setTheme(theme: string) {
        currentTheme.value = theme;
        _changeBodyDataset();
    }

    function _changeBodyDataset() {
        document.body.dataset.theme = currentTheme.value;
    }

    return { currentTheme, getTheme, setTheme };
});

export const useHideSidebar = defineStore('sidebar', () => {
    const hideSidebar = ref(false);

    const handleHideSidebar = () => {
        hideSidebar.value = true;
    }

    const handleShowSidebar = () => {
        hideSidebar.value = false;
    }

    const handleSidebarMobile = () => {
        hideSidebar.value = !hideSidebar.value;
    }

    return {
        hideSidebar,
        handleHideSidebar,
        handleShowSidebar,
        handleSidebarMobile
    };
});