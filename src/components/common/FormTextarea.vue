<template>
    <fieldset class="form-fieldset">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <textarea
          :id="forAttr"
          class="form-input form-text-area"
          cols="30"
          rows="4"
          :placeholder="placeholderText"
          :value="inputValue"
          @input="$emit('inputValue', ($event.target as HTMLInputElement).value.trim())"
        ></textarea>
    </fieldset>
</template>

<script setup lang="ts">
export interface Props {
    label: string,
    forAttr: string,
    placeholderText: string,
    inputValue?: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    placeholderText: '',
    inputValue: '',
});
</script>