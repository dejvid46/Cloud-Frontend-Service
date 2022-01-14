import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GridSelectionModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { tableData } from './FolderTable';
import ModalHook from './ModalHook';
import { fileURL } from '../features/Router';
import { apiFetch, apiFetchDownload, apiFetchUpload } from '../features/Fetch';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState } from '../features/Atoms';

const actions = [
    { icon: <LaunchIcon />, name: 'Open' },
    { icon: <DeleteIcon />, name: 'Delete' },
    { icon: <DownloadIcon />, name: 'Download' },
    { icon: <FileUploadIcon />, name: 'Upload' }
];

interface ActionsProps {
    table: tableData[],
    selectionModel: GridSelectionModel,
    setSelectionModel: React.Dispatch<React.SetStateAction<GridSelectionModel>>,
    setRows: React.Dispatch<React.SetStateAction<tableData[]>>
}

const Div = styled('div')({
    textAlign: "center",
    padding: "20px",
    border: "3px dashed #eeeeee",
    backgroundColor: "#fafafa",
    color: "#bdbdbd"
});

const Input = styled('input')({
    display: "none"
});

export default ({table, selectionModel, setSelectionModel, setRows}: ActionsProps) => {

    const folderPath = useRecoilValue(folderPathState) || fileURL();

    const [open, setOpen] = useState(false);

    const [files, setFiles] = useState<FileList>();

    const speedDialOnClick = (item: string) => {
        switch (item) {
            case "Open":
                openFiles();
                break;
            case "Delete":
                deleteFiles();
                break;
            case "Download":
                download();
                break;
            case "Upload":
                setOpen(true);
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

    const openFiles = () => {
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
                console.log(await res.json());
            }else{
                console.log(await res.text());
            }
        });
        refreshTableData(); 
    }

    const refreshTableData = async () => {

        const res = await apiFetch(`/folder${folderPath === "" ? "/" : folderPath}`, "GET");

        if (res.status < 300) {

            const json = await res.json();
            setRows(json.map((row: any, index: number) => {
                return {
                    id: index,
                    name: row.name,
                    modified: row.date,
                    size: row.size
                } as tableData;
            }))
            setSelectionModel([]);
        }else{
            console.log(await res.text());
        }
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

    const upload = async () => {
        if(files !== undefined){
            for (let i = 0; i < files.length; i++) {

                let res = await apiFetchUpload(`/file${folderPath === "" ? "/" : folderPath}`, "POST", files[i]);

                if (res.status < 200) {
                    console.log(await res.text());
                }else{
                    console.log(await res.text());
                }
            };
        }
    }

    return (
        <>
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
            <ModalHook open={open} setOpen={setOpen}>

                <label htmlFor="file-upload">
                    <Div>
                        <Input id="file-upload" onChange={e => setFiles(e.target.files || undefined)} multiple type="file" />
                        {files ? 
                            files.length > 1 ?
                                `count of files: ${files.length}`    
                            :
                                files[0].name
                        : 
                            "Upload files"
                        }
                    </Div>
                </label>

                {
                    files ? 
                        <Box sx={{ marginTop: "20px", textAlign: 'center'}}><Button variant="contained" onClick={upload} component="span">Upload</Button></Box>
                        :
                        <></>
                }
            </ModalHook>    
        </>
    );
}