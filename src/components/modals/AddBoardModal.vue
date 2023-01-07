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
import { useCurrentForm, useCurrentFormErrors } from '@/stores/form';
import { useBoardsStore } from '@/stores/boards';

const currentFormStore = useCurrentForm();
const { setCurrentFormValues } = currentFormStore;

const currentErrorsStore = useCurrentFormErrors();
const { currentErrors } = storeToRefs(currentErrorsStore);
const { setCurrentErrors } = currentErrorsStore;

const newBoardName = ref('');
const newBoardColumns = ref([]);

onMounted(() => {
    setCurrentFormValues({
        id: '',
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
}

const updateNameError = (value: string) => {
    setCurrentErrors({ nameError: value });
}

const addColumn = () => {
    // should we use an event handler inside the form
    // to make it more customizable?
    console.log('add column');
}

const useBoards = useBoardsStore();
const { addBoard } = useBoards;

const createBoard = () => {
    const newId = Math.floor(Math.random() * 1000).toString();
    addBoard({
        id: newId,
        name: newBoardName.value,
        columns: newBoardColumns.value,
    })
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>