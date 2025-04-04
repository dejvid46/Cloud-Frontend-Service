import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PhotoIcon from '@mui/icons-material/Photo';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import VideocamIcon from '@mui/icons-material/Videocam';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

import { apiFetch } from '../features/Fetch';
import { apiFetchDownload } from '../features/Fetch';
import Modal from './Modal';
import FolderActions from './FolderActions';
import { useState } from 'react';
import { route, fileURL } from '../features/Router';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

function secondsToDhms(seconds: number) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);

    var dDisplay = d > 0 ? d  + "d " : "";
    var hDisplay = h > 0 ? h + "h " : "";
    var mDisplay = m > 0 ? m + "m " : "";

    if (d < 1) {
        return mDisplay + hDisplay;
    }else if(h < 1){
        return mDisplay;
    }else{
        return dDisplay + hDisplay;
    }
}

export interface tableData {
    id: number,
    name: string,
    modified: string,
    size: number
}

interface TableProps {
    table: tableData[],
    rowsCount: number,
    refresh: () => Promise<void>,
    upload: () => void,
    addFolderOpen: () => void
}

export default ({ table, rowsCount, refresh, upload, addFolderOpen}: TableProps) => {

    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const refresWithSelected = async () => {
        setSelectionModel([]);
        await refresh();
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
                                (type === "jpeg" && (<PhotoIcon />)) ||
                                (type === "apng" && (<PhotoIcon />)) ||
                                (type === "bmp" && (<PhotoIcon />)) ||
                                (type === "JPG" && (<PhotoIcon />)) ||
                                (type === "PNG" && (<PhotoIcon />)) ||

                                (type === "mp3" && (<MusicVideoIcon />)) ||
                                (type === "ogg" && (<MusicVideoIcon />)) ||
                                (type === "wav" && (<MusicVideoIcon />)) ||

                                (type === "txt" && (<TextSnippetIcon />)) ||
                                (type === "docx" && (<TextSnippetIcon />)) ||
                                (type === "js" && (<TextSnippetIcon />)) ||
                                (type === "rs" && (<TextSnippetIcon />)) ||
                                (type === "php" && (<TextSnippetIcon />)) ||
                                (type === "ts" && (<TextSnippetIcon />)) ||

                                (type === "mp4" && (<VideocamIcon />)) ||
                                (type === "webm" && (<VideocamIcon />)) ||
                                (type === "ogg" && (<VideocamIcon />)) ||

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
        { 
            field: 'modifiedDate', 
            headerName: 'Modified', 
            type: 'string',
            minWidth: 100,
            valueGetter: (params: GridValueGetterParams) => {
                const modifiedStr = (params.getValue(params.id, 'modified') || "").toString();
    
                const time = parseInt(modifiedStr);
    
                if (isNaN(time)) return modifiedStr;
    
                return secondsToDhms(time);
            }
        },
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
            width: 340,
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
    
                const download = async (e: any) => {
                    e.stopPropagation(); // don't select this row after clicking
        
                    const fileType = (rowData().name+"").split(".")[1] || "folder";
    
                    let fileUrl = fileURL();
    
                    fileUrl = fileUrl === "/" ? "" : fileUrl;
        
                    if(fileType !== "folder"){
                        apiFetchDownload(`/file${fileUrl}/${rowData().name}`, "GET", rowData().name+"");
                    }
                };
    
                let rename = rowData().name;
    
                const renaming = async () => {
    
                    let fileUrl = fileURL();
    
                    fileUrl = fileUrl === "/" ? "" : fileUrl;
    
                    const res = await apiFetch(`/file${fileUrl}/${rowData().name}`, "PATCH", 
                        {
                            name: `${fileUrl}/${rename}`
                        }
                    );
    
                    if (res.status < 300) {
                        enqueueSnackbar( await res.text(), { variant: "success" });
                    }else{
                        enqueueSnackbar( await res.text(), { variant: "error" });
                    }
                    await refresh();
                }
          
                return (
                    <Stack spacing={2} direction="row">
                        <Button onClick={open} variant="outlined">Open</Button>
                        <Button onClick={download} variant="outlined">Download</Button>
                        <Modal styled={true} buttonText="Rename">
                            <Grid>
                                <Grid item xs={3} sx={{ margin: "auto", minWidth: "300px" }}>
                                    <TextField 
                                        sx={{ minWidth: "300px" }}
                                        id="outlined-basic" 
                                        label="Rename" 
                                        defaultValue={rowData().name}
                                        variant="outlined" 
                                        onChange={(e) => rename = e.target.value}
                                    />
                                    <Button onClick={renaming} sx={{ margin: "30px" }} variant="contained" component="span">
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Modal>
                    </Stack>
                );
            }
        }
    ];

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
            <FolderActions 
                addFolderOpen={addFolderOpen}
                refresh={refresWithSelected}
                upload={upload}
                table={table}
                selectionModel= {selectionModel}
            />
        </>
    );
}