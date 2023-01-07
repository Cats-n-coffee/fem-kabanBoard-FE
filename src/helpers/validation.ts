export const isEmpty = (value: string) => {
    return value ? '' : 'Can\'t be empty'; 
};

export const trimValue = (value: string) => {
    return value.trim();
};
