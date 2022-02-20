import SpeedDial from '@mui/material/SpeedDial';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { GridSelectionModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';

import { tableData } from './FolderTable';
import { fileURL } from '../features/Router';
import { apiFetch, apiFetchDownload } from '../features/Fetch';
import { useRecoilValue } from 'recoil';
import { folderPath as folderPathState, user as userState } from '../features/Atoms';

const actionsCanUpload = [
    { icon: <LaunchIcon />, name: 'Open' },
    { icon: <DeleteIcon />, name: 'Delete' },
    { icon: <DownloadIcon />, name: 'Download' },
    { icon: <FileUploadIcon />, name: 'Upload' },
    { icon: <CreateNewFolderIcon />, name: 'Add Folder' }
];

const actionsCanDownload = [
    { icon: <LaunchIcon />, name: 'Open' },
    { icon: <DownloadIcon />, name: 'Download' }
];

interface ActionsProps {
    table: tableData[],
    selectionModel: GridSelectionModel,
    refresh: () => Promise<void>,
    upload: () => void
    addFolderOpen: () => void
}

function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export default ({table, selectionModel, refresh, upload, addFolderOpen}: ActionsProps) => {

    const folderPath = useRecoilValue(folderPathState) || fileURL();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const user = useRecoilValue(userState);

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
                upload();
                break;
            case "Add Folder":
                addFolderOpen();
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

            if (res.status < 300) {
                enqueueSnackbar(await res.text(), { variant: "success" });
            }else{
                enqueueSnackbar(await res.text(), { variant: "error" });
            }
        });

        delay(500).then(() => {
            refresh();
        })
    }

    const download = () => {
        selectionModel.forEach(async (id: string | number) => {

            if(typeof id === "string") id = parseInt(id);

            const fileType = table[id].name.split(".")[1] || "folder";

            if(fileType !== "folder"){
                apiFetchDownload(`/file${filePath(id)}`, "GET", table[id].name)
                    .then(_ => _)
                    .catch(err => enqueueSnackbar(err.text(), { variant: "error" }));
            }

        })
    }

    return (
        <>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                direction="left"
                icon={<MoreVertIcon />}
                FabProps={{
                    sx: {
                        bgcolor: 'primary.main',
                        '&:hover': {
                            bgcolor: 'primary.main',
                        }
                    }
                }}
            >
                {
                user.status <= 3 ?
                    actionsCanUpload.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            data-index={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => speedDialOnClick(action.name)}
                        />
                    ))
                :
                    actionsCanDownload.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            data-index={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => speedDialOnClick(action.name)}
                        />
                    ))
                }
            </SpeedDial>
        </>
    );
}