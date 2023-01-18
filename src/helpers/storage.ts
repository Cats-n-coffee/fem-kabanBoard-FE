export const getFromLocalStorage = (storageKey: string) => {
    return window.localStorage.getItem(storageKey);
};

export const setToLocalStorage = (storageKey: string, payload: any) => {
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
};
