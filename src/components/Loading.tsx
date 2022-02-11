import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

export default () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress/>
        </Grid>
    )
}