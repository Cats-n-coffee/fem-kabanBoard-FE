<template>
    <div>
        <button @click="switchTheme">toggle</button>
    </div>
</template>

<script setup lang="ts">
import { useSwitchTheme } from '@/stores/appGlobals';
import { storeToRefs } from 'pinia';

const themeStore = useSwitchTheme();
const { currentTheme } = storeToRefs(themeStore);
const { setTheme } = themeStore;

const switchTheme = () => {
    const newTheme = currentTheme.value === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}
</script>