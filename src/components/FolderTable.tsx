import React from "react";
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { route } from '../features/Router';
import { fileURL } from '../features/Router';
import { GridSelectionModel } from '@mui/x-data-grid';

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
    { field: 'img', headerName: '', width: 40 },
    { field: 'name', headerName: 'Name', type: 'string', minWidth: 150 },
    { field: 'modified', headerName: 'Modified', type: 'string' },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
    },
    {
        field: 'size',
        headerName: 'Size',
        type: 'number',
        // valueGetter: (params: GridValueGetterParams) =>
        //     `${params.getValue(params.id, 'firstName') || ''} ${
        //         params.getValue(params.id, 'lastName') || ''
        //     }`,
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

            const onClick = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                return alert(JSON.stringify(rowData(), null, 4));
            };

            const open = (e: any) => {
                e.stopPropagation(); // don't select this row after clicking

                route(`showfile${fileURL()}/${rowData().name}`)
            };
      
            return (
                <Stack spacing={2} direction="row">
                    <Button onClick={open} variant="outlined">Open</Button>
                    <Button onClick={onClick} variant="outlined">Delete</Button>
                </Stack>
            );
          }
    }
];

export default ({ table, rowsCount }: TableProps) => {

    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);



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
        </>
    );
}