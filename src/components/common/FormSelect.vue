<template>
    <fieldset class="form-fieldset">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <select :id="forAttr" class="form-select">
            <option value="todo">Todo</option>
        </select>
    </fieldset>
</template>

<script setup lang="ts">
export interface Props {
    label: string,
    forAttr: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
});
</script>

<style scoped lang="less">
.form-select {
    background-color: var(--light);
    font-family: var(--font-family);
    font-size: 13px;
    font-weight: 500;
    color: var(--font-primary);
    padding: 8px 16px;
    border: 1px solid var(--form-input);
    border-radius: 4px;

    option {
        background-color: var(--light);
    }
}
</style>