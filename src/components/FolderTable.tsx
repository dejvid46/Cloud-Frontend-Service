import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { route } from '../features/Router';
import { fileURL } from '../features/Router';
import { GridSelectionModel, GridRowId } from '@mui/x-data-grid';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PhotoIcon from '@mui/icons-material/Photo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';


const actions = [
    { icon: <LaunchIcon />, name: 'Open' },
    { icon: <DeleteIcon />, name: 'Delete' },
    { icon: <DownloadIcon />, name: 'Download' },
];

export interface tableData {
    id: number,
    name: string,
    modified: string,
    type: string,
    size: number
}

interface TableProps {
    table: tableData[],
    rowsCount: number
}

const columns: GridColDef[] = [
    { 
        field: 'img', 
        headerName: '', 
        width: 40,
        renderCell: (params) => {

            const type = (params.getValue(params.id, 'name') || "folder").toString().split(".")[1] || "folder";
      
            return (
                <>
                    {
                        (
                            (type === "foder" && (<FolderOpenIcon />)) ||
                            (type === "jpg" && (<PhotoIcon />)) ||
                            (type === "png" && (<PhotoIcon />)) ||
                            (type === "mp3" && (<MusicVideoIcon />)) ||
                            (type === "ogg" && (<MusicVideoIcon />)) ||
                            (type === "txt" && (<TextSnippetIcon />)) ||
                            (type === "docx" && (<TextSnippetIcon />)) ||
                            (type === "avi" && (<VideocamIcon />)) ||
                            (type === "mp4" && (<VideocamIcon />)) ||
                            ((<FolderOpenIcon />))
                        )
                    }
                </>
            );
        }
    },
    { field: 'name', headerName: 'Name', type: 'string', minWidth: 150 },
    { field: 'modified', headerName: 'Modified', type: 'string' },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
            return (params.getValue(params.id, 'name') || "folder").toString().split(".")[1] || "folder";
        }
    },
    {
        field: 'size',
        headerName: 'Size',
        type: 'number',
    },
    {
        field: 'buttons',
        headerName: '',
        width: 200,
        sortable: false,
        renderCell: (params) => {

            const rowData = () => {
                const api: GridApi = params.api;
                const thisRow: Record<string, GridCellValue> = {};
        
                api
                    .getAllColumns()
                    .filter((c) => c.field !== "__check__" && !!c)
                    .forEach(
                    (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                );

                return thisRow;
            }

            const open = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking
                
                const fileType = (params.getValue(params.id, 'name') || "folder").toString().split(".")[1] || "folder";

                let fileUrl = fileURL();

                fileUrl = fileUrl === "/" ? "" : fileUrl;

                if(fileType === "folder"){
                    route(`showfolder${fileUrl}/${rowData().name}`)
                }else{
                    route(`showfile${fileUrl}/${rowData().name}`)
                }
            };

            const deleteItem = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                return alert(JSON.stringify(rowData(), null, 4));
            };
      
            return (
                <Stack spacing={2} direction="row">
                    <Button onClick={open} variant="outlined">Open</Button>
                    <Button onClick={deleteItem} variant="outlined">Delete</Button>
                </Stack>
            );
        }
    }
];

export default ({ table, rowsCount }: TableProps) => {

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    const speedDialOnClick = (item: string) => {
        switch (item) {
            case "Open":
                open()
                break;
            case "Delete":
                deleteFiles()
                break;
            case "Download":
                download()
                break;
            default:
                break;
        }
    }

    const open = () => {
        selectionModel.forEach((id: string | number) => {
            if(typeof id === "number") {

                let fileType = table[id].name.split(".")[1] || "folder";

                let fileUrl = fileURL();

                fileUrl = fileUrl === "/" ? "" : fileUrl;

                if(fileType === "folder"){
                    const win = window.open(`/showfolder${fileUrl}/${table[id].name}`);
                    win?.focus();
                }else{
                    const win = window.open(`/showfile${fileUrl}/${table[id].name}`);
                    win?.focus();   
                }

            }else{
                console.log(table[parseInt(id)].name);
            }
        })
    }

    const deleteFiles = () => {

    }

    const download = () => {
        
    }

    return (
        <>
            <DataGrid
                rows={table}
                columns={columns}
                pageSize={rowsCount}
                rowsPerPageOptions={[rowsCount]}
                checkboxSelection

                onSelectionModelChange={(newSelectionModel) => {
                    setSelectionModel(newSelectionModel);
                }}
                selectionModel={selectionModel}
            />
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                direction="left"
                icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        data-index={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={() => speedDialOnClick(action.name)}
                    />
                ))}
            </SpeedDial>
        </>
    );
}