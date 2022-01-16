import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useEffect } from "react";
import { useRecoilState } from 'recoil'
import { folderTree as folderTreeState } from '../features/Atoms';
import { route } from '../features/Router';
import { apiFetch } from '../features/Fetch';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
    TreeItemProps,
    useTreeItem,
    TreeItemContentProps,
} from '@mui/lab/TreeItem';
import clsx from 'clsx';

const CustomContent = React.forwardRef(function CustomContent(
        props: TreeItemContentProps,
        ref,
  ) {
    const {
        classes,
        className,
        label,
        nodeId,
        icon: iconProp,
        expansionIcon,
        displayIcon,
    } = props;
  
    const {
        disabled,
        expanded,
        selected,
        focused,
        handleExpansion,
        handleSelection,
        preventSelection,
    } = useTreeItem(nodeId);
  
    const icon = iconProp || expansionIcon || displayIcon;
  
    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        preventSelection(event);
    };
  
    const handleExpansionClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleExpansion(event);
    };
  
    return (
      <div
        className={clsx(className, classes.root, {
            [classes.expanded]: expanded,
            [classes.selected]: selected,
            [classes.focused]: focused,
            [classes.disabled]: disabled,
        })}
        onMouseDown={handleMouseDown}
        ref={ref as React.Ref<HTMLDivElement>}
      >
        <div onClick={handleExpansionClick} className={classes.iconContainer}>
            {icon}
        </div>
        <Typography
            component="div"
            className={classes.label}
        >
            {label}
        </Typography>
      </div>
    );
});

export interface apiTree {
    name: string;
    folders?: readonly apiTree[];
}

const data: apiTree = {
    name: '',
    folders: [
        {
            name: 'index.html',
            folders: []
        },
        {
            name: 'index.php',
        },
        {
            name: 'users',
            folders: [
                {
                        name: 'text.txt',
                },
            ],
        },
    ],
}

const CustomTreeItem = (props: TreeItemProps) => (
    <TreeItem ContentComponent={CustomContent} {...props} onClickCapture={() => redirect(props.nodeId)} />
);

const redirect = (nodeId: string) => {
    if(nodeId.includes(".")){
        route("showfile"+nodeId);
    }else{
        route("showfolder"+nodeId);
    }
};

export default () => {

    const [folderTree, setFolderTree] = useRecoilState(folderTreeState);

    useEffect(() => {
        refreshFolder();
    }, []);

    const refreshFolder = async () => {
        const res = await apiFetch(`/folder_tree`, "GET");

        if (res.status < 300) {

            setFolderTree(await res.json());
            
        }else{
            console.log(await res.text());
        }
    }

    const renderTree = (nodes: apiTree, id: string = "") => {

        let newId = id;

        if(id !== "/") {
            newId = newId+"/"+nodes.name;
        } else {
            newId = newId+nodes.name;
        }
        return (
            <CustomTreeItem key={newId} nodeId={newId} label={nodes.name}>
            {Array.isArray(nodes.folders)
                ? nodes.folders.map((node) => renderTree(node, newId))
                : null}
            </CustomTreeItem>
        )
    };


    return (
        <>
            <Box sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}>
                <Box sx={{ mb: 1 , margin: "5px", marginLeft: "15px"}}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={refreshFolder}
                    >
                        <RefreshIcon />
                    </IconButton>
                </Box>
            </Box>
            <TreeView
                aria-label="multi-select"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
                sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
                {renderTree(folderTree)}
            </TreeView>
        </>
    );
}