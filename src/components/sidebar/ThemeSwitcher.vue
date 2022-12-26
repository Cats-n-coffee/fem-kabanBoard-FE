<template>
    <div class="toggle-container">
        <div class="toggle">
            <LightTheme />
            <label
                for="theme-switcher"
                aria-label="switch theme"
                class="toggle-label"
            >
                <input
                    type="checkbox"
                    id="theme-switcher"
                    v-model="themeCheckbox"
                    @change="switchTheme" />
                <span></span>
            </label>
            <DarkTheme />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useSwitchTheme } from '@/stores/appGlobals';
import LightTheme from '@/assets/images/icon-light-theme.svg?component';
import DarkTheme from '@/assets/images/icon-dark-theme.svg?component';

const themeStore = useSwitchTheme();
const { setTheme } = themeStore;

const themeCheckbox = ref(true);

const switchTheme = () => {
    const newTheme = themeCheckbox.value ? 'light' : 'dark';
    setTheme(newTheme);
}
</script>

<style scoped lang="less">
.toggle-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--dark);
    width: calc(100% - 32px);
    align-self: center;
    padding: 14px 0;
    margin: 16px 16px 0 16px;
    border-radius: 6px;

    @media screen and (min-width: 700px) {
        margin: 0 0 8px 24px;
        width: calc(100% - 24px);
    }
}

.toggle {
    height: 20px;
    display: flex;
    align-items: center;
}

.toggle-label {
    height: 20px;
    margin: 0 24px;

    input {
        visibility: hidden;
        display: block;
        height: 0;
        width: 0;
        position: absolute;
        overflow: hidden;
    }

    span {
        height: 20px;
        width: 40px;
        background-color: var(--primary);
        border-radius: 12px;
        display: inline-block;
        position: relative;

        &:hover {
            cursor: pointer;
        }

        &::before {
            content: '';
            position: absolute;
            top: 2.5px;
            left: 23px;
            width: 14px;
            height: 14px;
            background-color: var(--white);
            border-radius: 50%;
        }
    }
}

[type=checkbox]:checked + span {
    background-color: var(--primary);

    &::before {
        left: 3px;
    }
}
</style>