<template>
    <button
      @click="clickHandler"
      class="primary-button"
      :class="[ `${classColor}` ]"
      :disabled="disabled"
    >
        <slot name="icon"></slot>
        <slot name="label"></slot>
    </button>
</template>

<script setup lang="ts">
defineProps<{
    clickHandler: ((payload: MouseEvent) => void) | undefined,
    classColor?: string,
    disabled: boolean,
}>()
</script>

<style scoped lang="less">
.primary-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--primary);
    color: var(--white);
    font-size: 15px;
    font-weight: 700;
    border-radius: 24px;
    border: none;
    transition: all 200ms ease-in-out;
    padding: 10px 18px;

    &:hover {
        background-color: var(--primary-hover);
        cursor: pointer;
    }

    &:disabled, &:disabled:hover {
        background-color: var(--form-input);
        cursor: default;
    }
}

.light {
    background-color: var(--button-secondary);

    &:hover {
        background-color: var(--button-secondary-hover);
    }
}

.red {
    background-color: var(--red);

    &:hover {
        background-color: var(--light-red);
    }
}
</style>