export const clickOutside = {
    beforeMount: (el: any, binding: any) => {
        el.clickOutsideEvent = (event: any) => {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value();
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted: (el: any) => {
        document.removeEventListener('click', el.clickOutsideEvent);
    },
};
