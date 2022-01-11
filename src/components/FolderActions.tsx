import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { GridSelectionModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';

import { useState } from 'react';
import { tableData } from './FolderTable';
import ModalHook from './ModalHook';
import { apiFetch, apiFetchDownload } from '../features/Fetch';
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

const Input = styled('input')({
    display: 'none',
});

export default ({table, selectionModel, setSelectionModel, setRows}: ActionsProps) => {

    const folderPath = useRecoilValue(folderPathState);

    const [open, setOpen] = useState(false);

    const [pictures, setPictures] = useState<FileList>();

    const speedDialOnClick = (item: string) => {
        switch (item) {
            case "Open":
                openFiles()
                break;
            case "Delete":
                deleteFiles()
                break;
            case "Download":
                download()
                break;
            case "Upload":
                upload()
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

    const upload = () => {
        setOpen(true);
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
                <label htmlFor="contained-button-file">
                    <Input onChange={e => setPictures(e.target.files || undefined)} id="contained-button-file" multiple type="file" />
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                </label>
                {
                    pictures ? 
                        <Button variant="contained" component="span">Upload</Button>
                        :
                        <></>
                }
            </ModalHook>
        </>
    );
}