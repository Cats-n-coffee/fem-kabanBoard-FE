import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useCurrentForm = defineStore('currentForm', () => {
    const currentFormValues = ref({});

    const setCurrentFormValues = (values: any) => {
        currentFormValues.value = { ...values };
    };

    return {
        currentFormValues,
        setCurrentFormValues,
    };
});

export const useCurrentFormErrors = defineStore('currentFormErrors', () => {
    const currentErrors = ref({});

    const setCurrentErrors = (errors: any) => {
        currentErrors.value = { ...currentErrors.value, ...errors };
    };

    return {
        currentErrors,
        setCurrentErrors,
    }
});