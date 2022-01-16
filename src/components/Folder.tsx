import { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { styled } from '@mui/material/styles';

import ModalHook from './ModalHook';
import FolderTable from './FolderTable';
import { tableData } from './FolderTable';
import { fileURL } from '../features/Router';
import { apiFetch, apiFetchUpload } from '../features/Fetch';
import { useRecoilValue, useRecoilState } from 'recoil';
import { folderPath as folderPathState, folderTree as folderTreeState } from '../features/Atoms';

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

    const [table, setTable] = useState<tableData[] | undefined>();
    const [find, setFind] = useState(true);
    const [open, setOpen] = useState(false);
    const [files, setFiles] = useState<FileList | undefined>();
    const [folderTree, setFolderTree] = useRecoilState(folderTreeState);

    const folderPath = useRecoilValue(folderPathState) || fileURL();

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

    const refreshFolder = async () => {
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

    const upload = async () => {
        if(files !== undefined){
            for (let i = 0; i < files.length; i++) {

                console.log(`/file${folderPath}`);
                let res = await apiFetchUpload(`/file/${folderPath}`, "POST", files[i]);

                if (res.status < 200) {
                    console.log(await res.text());
                }else{
                    console.log(await res.text());
                }
            };
        }
        refreshTableData();
        refreshFolder();
        setOpen(false);
    }

    const tableHeight = window.screen.height * 0.60;

    const rowsCount = Math.round(tableHeight / 51);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                {
                    table !== undefined ? 
                    table && table.length !== 0 ? 
                            <FolderTable table={table}  rowsCount={rowsCount} setRows={setTable} /> 
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
                                    <Grid item xs={3}>
                                        <Typography variant="h6" component="div" style={{marginBottom: "5vh"}} >
                                            Folder is empty
                                        </Typography>
                                        <Button onClick={() => setOpen(true)} variant="contained">Upload files</Button>

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
                                    </Grid>
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
        </>
    );
}