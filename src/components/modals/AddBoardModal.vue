<template>
    <Form>
        <template #title>
            Add New Board
        </template>
        <template #formType>
            <FormInputField
              label="Name"
              for-attr="new-board-title"
              placeholder-text="e.g. Web Design"
            />
            <FormInputInteractive
              label="Columns"
              for-attr="new-board-input-interactive"
              :click-handler="addColumn"
              button-icon="+"
              button-label="Add New Column"
              :placeholder-subtask="true"
            />
        </template>
        <template #submitButton>
            <Button class="submit-button" :click-handler="createBoard">
                <template #label>
                    <span class="action-add-board-span">Create New Board</span>
                </template>
            </Button>
        </template>
    </Form>
</template>

<script setup lang="ts">
import Form from '@/components/common/Form.vue';
import FormInputField from '@/components/common/FormInputField.vue';
import FormInputInteractive from '@/components/common/FormInputInteractive.vue';
import Button from '@/components/common/Button.vue';

const addColumn = () => {
    console.log('add column');
}

const createBoard = () => {
    console.log('create new board');
}
</script>

<style scoped lang="less">
.submit-button {
    margin-top: 24px;
}
</style>