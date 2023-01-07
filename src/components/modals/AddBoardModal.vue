<template>
    <Form>
        <template #title>
            Add New Board
        </template>
        <template #formType>
            <FormInputField
              @input-value="updateBoardName"
              @input-error="updateNameError"
              label="Name"
              for-attr="new-board-title"
              placeholder-text="e.g. Web Design"
              :input-value="newBoardName"
            />
            <FormInputInteractive
              label="Columns"
              for-attr="new-board-input-interactive"
              button-icon="+"
              button-label="Add New Column"
              :placeholder-subtask="true"
            />
        </template>
        <template #submitButton>
            <Button
              class="submit-button"
              :click-handler="createBoard"
              :disabled="isSubmitDisabled"
            >
                <template #label>
                    <span class="action-add-board-span">Create New Board</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import Button from '@/components/common/Button.vue';
import { useCurrentForm } from '@/stores/form';
import { useCurrentFormErrors } from '@/stores/form';

const currentFormStore = useCurrentForm();
const { setCurrentFormValues } = currentFormStore;

const currentErrorsStore = useCurrentFormErrors();
const { currentErrors } = storeToRefs(currentErrorsStore);
const { setCurrentErrors } = currentErrorsStore;

const newBoardName = ref('');
const newBoardColumns = ref([]);

onMounted(() => {
    setCurrentFormValues({
        name: '',
        columns: [],
    });

    setCurrentErrors({
        nameError: '',
    });
});

const isSubmitDisabled = computed(() => {
    const allErrors = Object.values(currentErrors.value);
    return allErrors.every((error) => error) || !newBoardName.value;
});

const updateBoardName = (value: string) => {
    newBoardName.value = value;
    console.log('in parent', value);
}

const updateNameError = (value: string) => {
    setCurrentErrors({ nameError: value });
}

const addColumn = () => {
    // should we use an event handler inside the form
    // to make it more customizable?
    console.log('add column');
}

const createBoard = () => {
    // check for error obj to only have falsy values
    console.log('create new board');
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>