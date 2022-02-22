import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface StatusSelectorProps {
    status: number,
    setStatus: React.Dispatch<React.SetStateAction<number>>
}

export default ({status, setStatus}: StatusSelectorProps) => {

    const handleChange = (event: SelectChangeEvent) => {
        setStatus(parseInt(event.target.value));
    };

    return (
        <Box sx={{ minWidth: 120 }}>
        <FormControl variant="standard" fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    required 
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status.toString()}
                    label="Status*"
                    onChange={handleChange}
                    defaultValue="OP"
                >
                    <MenuItem value={2}>OP</MenuItem>
                    <MenuItem value={3}>Can upload</MenuItem>
                    <MenuItem value={4}>Can download</MenuItem>
                </Select>
        </FormControl>
        </Box>
    );
}