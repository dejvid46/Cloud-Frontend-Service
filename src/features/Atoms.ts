import { atom } from "recoil";
import { User } from '../components/UserCard';
import { apiTree } from '../components/FileTree';

export const counter = atom({
    key: 'counterState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
});

export const drawer = atom({
    key: 'drawerState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export const user = atom({
    key: 'userState',
    default: {} as User
})

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