import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default () => {
    return (
        <Grid             
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
        >
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography variant="h3" component="div">
                        Error 404
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        probably wrong url
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}