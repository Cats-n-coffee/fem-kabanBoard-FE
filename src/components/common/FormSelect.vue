<template>
    <fieldset class="fieldset-select">
        <label :for="forAttr">{{ label }}</label>
        <select :id="forAttr">
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