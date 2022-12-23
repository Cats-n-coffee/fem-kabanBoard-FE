<template>
    <fieldset class="fieldset-input">
        <label :for="forAttr">{{ label }}</label>
        <input type="text" :id="forAttr">
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