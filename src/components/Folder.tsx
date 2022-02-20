import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

import { styled } from '@mui/material/styles';

import ModalHook from './ModalHook';
import FolderTable from './FolderTable';
import { tableData } from './FolderTable';
import { fileURL } from '../features/Router';
import { apiFetch, apiFetchUpload } from '../features/Fetch';
import { useRecoilValue, useRecoilState } from 'recoil';
import { folderPath as folderPathState, folderTree as folderTreeState, user as userState } from '../features/Atoms';
import { useSnackbar } from 'notistack';

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

export default () => {

    const [user, setUser] = useRecoilState(userState);


    const refreshMe = async () => {
        const res = await apiFetch("/user", "GET");

        if(res.status >= 300) return;

        setUser(await res.json());

    }

    useEffect(() => {
        if(Object.keys(user).length === 0) {
            refreshMe();
        }
    }, []);

    const folderPath = useRecoilValue(folderPathState) || fileURL();

    const [find, setFind] = useState(true);

    const [rename, setRename] = useState<string>(folderPath.split("/").pop() || "");
    const [openFolderRename, setOpenFolderRename] = useState(false);

    const [addFolder, setAddFolder] = useState<string>("");
    const [openAddFolder, setOpenAddFolder] = useState(false);

    const [files, setFiles] = useState<FileList | undefined>();
    const [folderTree, setFolderTree] = useRecoilState(folderTreeState);
    const [openUpload, setOpenUpload] = useState(false);

    const [table, setTable] = useState<tableData[] | undefined>();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if(fileURL() === folderPath){
            getTableData()
        }
    }, [folderPath]);

    const getTableData = async () => {

        const res = await apiFetch(`/folder${folderPath === "" ? "/" : folderPath}`, "GET");

        if (res.status < 300) {

            const json = await res.json();
            setTable(json.map((row: any, index: number) => {
                return {
                    id: index,
                    name: row.name,
                    modified: row.date,
                    size: row.size
                } as tableData;
            }))
            setFind(true);
        }else{
            setFind(false);
            setTable([]);
            console.log(await res.text());
        }
    }

    const refreshFolderTree = async () => {
        const res = await apiFetch(`/folder_tree`, "GET");
        if (res.status < 300) {
            setFolderTree(await res.json());
            
        }else{
            console.log(await res.text());
        }
    }

    const refreshTableData = async () => {

        const res = await apiFetch(`/folder${folderPath === "" ? "/" : folderPath}`, "GET");

        if (res.status < 300) {

            const json = await res.json();
            setTable(json.map((row: any, index: number) => {
                return {
                    id: index,
                    name: row.name,
                    modified: row.date,
                    size: row.size
                } as tableData;
            }))
        }else{
            console.log(await res.text());
        }
    }

    const refresh = async () => {
        await Promise.all([
            refreshTableData(),
            refreshFolderTree()
        ])
    }

    const addFolderOpen = () => {
        setOpenAddFolder(true);
    }

    const addingFolder = async () => {
        const res = await apiFetch(`/folder${folderPath === "" ? "/" : folderPath}/${addFolder}`, "POST");

        if (res.status < 300) {
            enqueueSnackbar( await res.text(), { variant: "success" });
        }else{
            enqueueSnackbar( await res.text(), { variant: "error" });
        }
        await refresh();
        setOpenAddFolder(false);
    }

    const upload = () => {
        setOpenUpload(true);
    }

    const uploading = async () => {
        if(files !== undefined){
            for (let i = 0; i < files.length; i++) {

                let res = await apiFetchUpload(`/file/${folderPath}`, "POST", files[i]);

                if (res.status < 300) {
                    enqueueSnackbar( await res.text(), { variant: "success" });
                }else{
                    enqueueSnackbar( await res.text(), { variant: "error" });
                }
            };
        }
        refresh();
        setOpenUpload(false);
    }

    const tableHeight = window.screen.height * 0.60;

    const rowsCount = Math.round(tableHeight / 51);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                {
                    table !== undefined ? 
                        table && table.length !== 0 ? 
                            <FolderTable 
                                addFolderOpen={addFolderOpen}
                                upload={upload} 
                                refresh={refresh} 
                                table={table} 
                                rowsCount={rowsCount} 
                            /> 
                        : find ?
                            <>
                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ minHeight: '70vh' }}
                                >
                                    <Box sx={{display: "flex", flexDirection: "column", textAlign: "center" }}>
                                        <Typography variant="h6" component="div" style={{marginBottom: "5vh"}} >
                                            Folder is empty
                                        </Typography>
                                        {user.status <= 3 ?
                                            <>
                                                <Button sx={{ margin: "5px" }} onClick={upload} variant="contained">Upload files</Button>
                                                <Button sx={{ margin: "5px" }} onClick={addFolderOpen} variant="contained">Add Folder</Button>
                                            </>
                                        :
                                            <></>
                                        }
                                    </Box>
                                </Grid>
                            </>
                        :
                        <>
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                                style={{ minHeight: '70vh' }}
                            >
                                <Grid item xs={3}>
                                    <Typography variant="h6" align="center" component="div" style={{marginBottom: "2vh"}} >
                                        Error 404
                                    </Typography>
                                    <Typography variant="overline" component="div" >
                                        cant find folder
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    :
                    <Grid             
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: "100vh" }}
                    >
                        <CircularProgress />
                    </Grid>
                }
            </div>
            <ModalHook open={openUpload} setOpen={setOpenUpload}>

                <label htmlFor="file-upload">
                    <Div>
                        <Input id="file-upload" onChange={e => {
                            if(e.target.files && e.target.files.length === 0) {
                                setFiles(undefined)
                                return;
                            }
                            setFiles(e.target.files || undefined)
                        }} multiple type="file" />
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
                        <Box sx={{ marginTop: "20px", textAlign: 'center'}}>
                            <Button variant="contained" onClick={uploading} component="span">
                                Upload
                            </Button>
                        </Box>
                    :
                        <></>
                }
            </ModalHook>
            <ModalHook open={openAddFolder} setOpen={setOpenAddFolder}>
                <Grid>
                    <Grid item xs={3} sx={{ margin: "auto", minWidth: "300px" }}>
                        <TextField
                            onChange={e => setAddFolder(e.target.value)} 
                            sx={{ minWidth: "300px" }}
                            id="outlined-basic" 
                            label="Add Folder" 
                            defaultValue={addFolder}
                            variant="outlined" 
                        />
                        <Button onClick={addingFolder} sx={{ margin: "30px" }} variant="contained" component="span">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </ModalHook>
        </>
    );
}