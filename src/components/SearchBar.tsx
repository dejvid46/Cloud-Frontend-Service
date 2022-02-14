import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { useState } from 'react';
import { route } from '../features/Router';
import { fileURL } from '../features/Router';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%',
        },
    },
}));

const getFolderPath = (path: string) => {
    if (path.includes(".")){
        const str = path.split("/").slice(0, -1).join("/");
        return `${str.endsWith("/") ? str : str+"/"}`;
    }else{
        return `${path.endsWith("/") ? path : path+"/"}`;
    }
}

export default () => {

    const path = useRecoilValue(folderPathState) || fileURL();
    const [text, setText] = useState("");

    const handleKeyDown = (event: any) => {

        const pretext = text.includes(".") ? "showfile": "showfolder";

        if (event.key === 'Enter') {
            if (path.includes(".")){
                route(`./${pretext}${getFolderPath(path)}${text}`);
            }else{
                setText("");
                route(`./${pretext}${getFolderPath(path)}${text}`);
            }
        }
    }

    return (
        <>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    value={text}
                    onChange={e => setText(e.target.value)} 
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={handleKeyDown}
                />
            </Search>
        </>
    )
}