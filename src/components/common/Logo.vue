<template>
    <div class="logo-tablet-desktop">
        <LogoLight v-if="currentTheme === 'dark'" />
        <LogoDark v-else />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import LogoLight from '@/assets/images/logo-light.svg?component';
import LogoDark from '@/assets/images/logo-dark.svg?component';
import { useSwitchTheme } from '@/stores/appGlobals';

const themeStore = useSwitchTheme();
const { currentTheme } = storeToRefs(themeStore);
</script>

<style scoped lang="less">
.logo-tablet-desktop {
    display: none;

    @media screen and (min-width: 700px) {
        display: block;
        padding: 0 24px;
    }
}
</style>