import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

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
            const onClick = (e: any) => {
              e.stopPropagation(); // don't select this row after clicking
      
              const api: GridApi = params.api;
              const thisRow: Record<string, GridCellValue> = {};
      
              api
                .getAllColumns()
                .filter((c) => c.field !== "__check__" && !!c)
                .forEach(
                  (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
                );
      
              return alert(JSON.stringify(thisRow, null, 4));
            };
      
            return (
                <Stack spacing={2} direction="row">
                    <Button onClick={onClick} variant="outlined">Open</Button>
                    <Button onClick={onClick} variant="outlined">Delete</Button>
                </Stack>
            );
          }
    }
];

const rows = [
    {id: 0, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 1, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 2, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 3, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 4, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 5, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 }

];

export default () => {
    return (
        <>
            <div style={{ height: '500px', width: '100%' }}>
                
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={7}
                    rowsPerPageOptions={[7]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
}