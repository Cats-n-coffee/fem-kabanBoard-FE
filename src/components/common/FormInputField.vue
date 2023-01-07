<template>
    <fieldset class="form-fieldset error-container">
        <label :for="forAttr" class="form-label">{{ label }}</label>
        <input
          type="text"
          :id="forAttr"
          class="form-input"
          :class="{ 'error-box': errorToDisplay }"
          :placeholder="placeholderText"
          minlength="2"
          maxlength="150"
          :value="inputValue"
          @input="handleInput(($event.target as HTMLInputElement).value.trim())"
          @blur="validateField(($event.target as HTMLInputElement).value.trim())"
        >
        <span class="error-text error-inside">{{ errorToDisplay }}</span>
    </fieldset>
</template>

<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { isEmpty } from '@/helpers/validation';

export interface Props {
    label: string,
    forAttr: string,
    placeholderText?: string,
    inputValue: string,
}

withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    placeholderText: '',
    inputValue: '',
});

const emit = defineEmits(['inputValue', 'inputError']);
const errorToDisplay = ref('');

const validateField = (value: string) => {
    const checkEmpty = isEmpty(value);

    if(checkEmpty) {
        errorToDisplay.value = checkEmpty;
    } if (!checkEmpty) {
        errorToDisplay.value = '';
    }

    emit('inputError', checkEmpty);
};

const handleInput = ( value: string) => {
    validateField(value);
    emit('inputValue', value);
};
</script>

<style scoped lang="less">
.error-container {
    position: relative;
}

.error-inside {
    position: absolute;
    right: 16px;
    bottom: 8px;
}
</style>