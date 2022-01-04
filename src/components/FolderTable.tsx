import { useState } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue, selectedIdsLookupSelector } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { route, fileURL } from '../features/Router';
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
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { apiFetch, apiFetchDownload } from '../features/Fetch';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';


const actions = [
    { icon: <LaunchIcon />, name: 'Open' },
    { icon: <DeleteIcon />, name: 'Delete' },
    { icon: <DownloadIcon />, name: 'Download' },
];

export interface tableData {
    id: number,
    name: string,
    modified: string,
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

            const fileAndPath = (params.getValue(params.id, 'name') || "folder").toString().split(".");

            const type = fileAndPath.length === 1 ? "folder" : fileAndPath[fileAndPath.length - 1];
      
            return (
                <>
                    {
                        (
                            (type === "folder" && (<FolderOpenIcon />)) ||
                            (type === "jpg" && (<PhotoIcon />)) ||
                            (type === "png" && (<PhotoIcon />)) ||
                            (type === "mp3" && (<MusicVideoIcon />)) ||
                            (type === "ogg" && (<MusicVideoIcon />)) ||
                            (type === "txt" && (<TextSnippetIcon />)) ||
                            (type === "docx" && (<TextSnippetIcon />)) ||
                            (type === "avi" && (<VideocamIcon />)) ||
                            (type === "mp4" && (<VideocamIcon />)) ||
                            ((<InsertDriveFileIcon />))
                        )
                    }
                </>
            );
        }
    },
    { 
        field: 'name', 
        headerName: 'Name', 
        type: 'string', 
        minWidth: 150
    },
    { field: 'modified', headerName: 'Modified', type: 'string' },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
        valueGetter: (params: GridValueGetterParams) => {
            const fileAndPath = (params.getValue(params.id, 'name') || "folder").toString().split(".");

            return fileAndPath.length === 1 ? "folder" : fileAndPath[fileAndPath.length - 1];
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

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

    const folderPath = useRecoilValue(folderPathState);

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

    const filePath = (id: number) => {
        let fileUrl = folderPath;
        fileUrl = fileUrl === "/" ? "" : fileUrl;

        return `${fileUrl}/${table[id].name}`;
    }

    const open = () => {
        selectionModel.forEach((id: string | number) => {

            if(typeof id === "string") id = parseInt(id);

            const fileType = table[id].name.split(".")[1] || "folder";

            if(fileType === "folder"){
                const win = window.open(`/showfolder${filePath(id)}`);
                win?.focus();
            }else{
                const win = window.open(`/showfile${filePath(id)}`);
                win?.focus();
            }
        })
    }

    const deleteFiles = async () => {
        selectionModel.forEach(async (id: string | number) => {

            if(typeof id === "string") id = parseInt(id);

            const fileType = table[id].name.split(".")[1] || "folder";

            let res;

            if(fileType === "folder"){
                res = await apiFetch(`/folder${filePath(id)}`, "DELETE")
            }else{
                res = await apiFetch(`/file${filePath(id)}`, "DELETE")
            }

            if (res.status < 200) {
                console.log(await res.json())
            }else{
                console.log(await res.text())
            }
        })
    }

    function downloadURI(uri: string, name: string) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        link.remove();
      }

    const download = () => {
        selectionModel.forEach(async (id: string | number) => {

            if(typeof id === "string") id = parseInt(id);

            const fileType = table[id].name.split(".")[1] || "folder";

            if(fileType !== "folder"){
                await apiFetchDownload(`/file${filePath(id)}`, "GET", table[id].name);
            }

        })
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