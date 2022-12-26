<template>
    <fieldset class="form-fieldset">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <input
          type="text"
          :id="forAttr"
          class="form-input"
          :placeholder="placeholderText"
        >
    </fieldset>
</template>

<script setup lang="ts">
export interface Props {
    label: string,
    forAttr: string,
    placeholderText?: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    placeholderText: '',
});
</script>