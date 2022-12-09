<template>
    <div>
        <div class="toggle">
            <label for="theme-switcher" aria-label="switch theme"></label>
            <input type="checkbox" id="theme-switcher" v-model="themeCheckbox" @change="switchTheme" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSwitchTheme } from '@/stores/appGlobals';
import { storeToRefs } from 'pinia';

const themeStore = useSwitchTheme();
const { setTheme } = themeStore;

const themeCheckbox = ref(true);

const switchTheme = () => {
    const newTheme = themeCheckbox.value ? 'light' : 'dark';
    setTheme(newTheme);
}
</script>

<style scoped lang="less">
.toggle {}

#theme-switcher {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: red;
    opacity: .5;
    z-index: 1;

    &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 14px;
        background-color: blue;
        z-index: 2;
    }
}
</style>