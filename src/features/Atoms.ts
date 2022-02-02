import { atom, selector } from "recoil";
import { User } from '../components/UserCard';
import { apiTree } from '../components/FileTree';
import { apiFetch } from "./Fetch";

export const counter = atom({
    key: 'counterState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});

export const drawer = atom({
    key: 'drawerState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const user = selector({
    key: 'userState',
    get: async () => {
        const res = await apiFetch("/user", "GET");

        if(res.status >= 300){
            return {
                id: -1,
                name: "",
                email: "",
                pass: "",
                size: 0,
                path: "",
                status: -1
            };
        }

        return await res.json();
    },
});

export const users = atom({
    key: 'usersState',
    default: [{} as User],
});

export const folderTree = atom({
    key: 'folderTreeState',
    default: {} as apiTree,
});

export const folderPath = atom({
    key: 'folderPathState',
    default: "",
});