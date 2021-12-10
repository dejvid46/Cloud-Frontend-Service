import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export interface User {
    id: number;
    name: string;
    email: string;
    pass: string;
    size: number;
    path: string;
    status: number;
}


interface UserCardProps {
    user: User
}


export default ({user}: UserCardProps) => {

    return (
        <Card sx={{ minWidth: "220px", flex: "1", margin: "20px" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                </Typography>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="body2" color="text.secondary">
                    <Grid container spacing={2}>
                        <Grid  item xs={6}>
                            <ul>
                                <li>
                                    ID: {user.id}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Email: {user.email}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Pass: ********
                                </li>
                            </ul>
                        </Grid>
                        <Grid item xs={6}>
                            <ul>
                                <li>
                                    Size: {user.size}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Path: {user.path}
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    Status: {user.status}
                                </li>
                            </ul>
                        </Grid>
                        </ Grid>
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small">Edit</Button>
                <Button size="small">Delete</Button>
            </CardActions>
        </Card>

    );
}