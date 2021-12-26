import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import FolderTable from './FolderTable';
import { tableData } from './FolderTable';

const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
];

const rows = [
    {id: 0, name: "cat.txt", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 1, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 2, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 3, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 4, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 5, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 6, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 7, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },

];

export default () => {

    const tableHeight = window.screen.height * 0.74;

    const rowsCount = Math.round(tableHeight / 65);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                
                <FolderTable table={rows} rowsCount={rowsCount} />
            </div>

            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                direction="left"
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </>
    );
}