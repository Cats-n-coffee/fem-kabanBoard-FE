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
    const hideSidebar = ref(true);

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

export const useAppModal = defineStore('modal', () => {
    const isModalOpen = ref(false);
    const modalName = ref('');

    const toggleModal = () => {
        isModalOpen.value = !isModalOpen.value;
        if (!isModalOpen.value) modalName.value = '';
    }

    const setModalName = (name: string) => {
        modalName.value = name;
    }

    return {
        isModalOpen,
        toggleModal,
        modalName,
        setModalName,
    };
})