import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useRecoilState } from 'recoil';
import { folderTree as folderTreeState } from '../features/Atoms';

export interface apiTree {
    name: string;
    children?: readonly apiTree[];
}

const data: apiTree = {
    name: '/',
    children: [
      {
        name: 'index.html',
      },
      {
        name: 'users',
        children: [
          {
                name: 'text.txt',
          },
        ],
      },
    ],
}
  

export default () => {

    const [folderTree, setFolderTree] = useRecoilState(folderTreeState);

    setFolderTree(data);

    const renderTree = (nodes: apiTree, idPointer: any = {number: 0}) => {
        idPointer.number = idPointer.number + 1;
        return (
            <TreeItem key={idPointer.number.toString()} nodeId={idPointer.number.toString()} label={nodes.name}>
            {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node, idPointer))
                : null}
            </TreeItem>
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