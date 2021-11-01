import { atom, selector } from "recoil";

export const counter = atom({
    key: 'counterState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});

export const drawer = atom({
    key: 'drawerState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});