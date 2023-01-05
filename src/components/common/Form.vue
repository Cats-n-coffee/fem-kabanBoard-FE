<template>
    <div class="form-modal" v-on-click-outside="toggleModal">
        <h2>
            <slot name="title"></slot>
        </h2>
        <form @submit.prevent>
            <slot name="formType"></slot>
            <slot name="submitButton"></slot>
        </form>
    </div>
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { useAppModal } from '@/stores/appGlobals';

const appModalStore = useAppModal();
const { toggleModal } = appModalStore;
</script>

<style scoped lang="less">
.form-modal {
    max-width: 480px;
    width: 100%;
    margin: 0 16px;
    background-color: var(--light);
    border-radius: 16px;
    padding: 24px;

    h2 {
        font-size: 18px;
        font-weight: 700;
        color: var(--font-primary);
    }

    @media screen and (min-width: 700px) {
        padding: 32px;
    }
}
</style>