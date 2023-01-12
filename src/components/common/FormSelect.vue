<template>
    <fieldset class="form-fieldset">
        <span class="form-label">{{ label }}</span>
        <div
          class="form-select"
          :class="{ active: isSelectExpanded }"
          v-on-click-outside="closeDropdown"
        >
            <div
              class="displayed-option"
              @click="toggleOptions"
            >
                {{ optionSelected }}
                <ChevronDownIcon
                  class="chevron"
                  :class="{ rotate: isSelectExpanded }"
                />
            </div>
            <div class="custom-options">
                <div
                  v-for="(item, index) in reorderColumnNames"
                  :key="index"
                  class="custom-option"
                  @click="selectOption(item)"
                >
                    {{ item }}
                </div>
            </div>
        </div>
    </fieldset>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ChevronDownIcon from '@/assets/images/icon-chevron-down.svg?component';
import { vOnClickOutside } from '@vueuse/components';

export interface Props {
    label: string,
    forAttr: string,
    selectedValue?: string,
    values: string[],
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    forAttr: 'form-label',
    selectedValue: '',
    values: () => [],
});

const isSelectExpanded = ref(false);

const reorderColumnNames = computed(() => {
    if (props.values[0] === props.selectedValue) {
        return props.values;
    }

    const columnsCopy = [...props.values];
    const selectedStatusIndex = columnsCopy.indexOf(props.selectedValue);

    if (selectedStatusIndex === -1) {
        return columnsCopy;
    }

    const removedStatus = columnsCopy.splice(selectedStatusIndex, 1);
    columnsCopy.unshift(removedStatus[0]);

    return columnsCopy;
});

const optionSelected = ref(reorderColumnNames.value[0] || '');

const toggleOptions = () => {
    console.log('toggled');
    isSelectExpanded.value = !isSelectExpanded.value;
};

const closeDropdown = () => {
    isSelectExpanded.value = false;
}
// https://stackoverflow.com/questions/71253452/vue-3-global-directive-click-outside
// https://stackoverflow.com/questions/60144575/how-do-you-handle-click-outside-of-element-properly-in-vuejs
// https://medium.com/@Taha_Shashtari/an-easy-way-to-detect-clicks-outside-an-element-in-vue-1b51d43ff634
const selectOption = (option: string) => {
    optionSelected.value = option;
    toggleOptions();
    console.log('selected', optionSelected.value);
};
</script>

<style scoped lang="less">
.form-select {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: var(--light);
    font-family: var(--font-family);
    font-size: 13px;
    font-weight: 500;
    color: var(--font-primary);
    padding: 8px 16px;
    border: 1px solid var(--form-input);
    border-radius: 4px;

    &:hover {
        outline: 1px solid var(--primary);
    }

    &.active {
        outline: 1px solid var(--primary);
    }

    &.active .custom-options {
        display: block;
    }
}

.displayed-option {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--light);

    &:hover {
        cursor: pointer;
    }

    .chevron {
        position: absolute;
        right: 0;
        top: 45%;
        transition: all 400ms ease-in-out;

        &.rotate {
            transform: rotateX(180deg);
        }
    }
}

.custom-options {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0px 10px 20px rgba(54, 78, 126, 0.25);
    z-index: 1;
    padding: 0.8rem 0;
    display: none;
    background-color: var(--light);
}

.custom-option {
    position: relative;
    padding: 0.8rem;
    color: var(--font-secondary);

    &:hover {
        color: var(--primary);
        cursor: pointer;
    }

    // &:not(:last-of-type)::after {
    //     content: "";
    //     position: absolute;
    //     bottom: 0;
    //     left: 0.8rem;
    //     width: calc(100% - 1.6rem);
    //     border-bottom: 1px solid #d3d3d3;
    // }
}
</style>