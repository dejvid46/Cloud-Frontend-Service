import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from '../features/Router';
import routes from '../routes/mainRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
    palette: {
        primary: {
            main: '#E06D06', 
        },
        secondary: {
            main: '#161032',
        }
    }
});


function App() {

    return (
        <div className="App">
            <CssBaseline/>
            <RecoilRoot>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={4}>
                        <Router routes={routes} />
                    </SnackbarProvider>
                </ThemeProvider>
            </RecoilRoot>
        </div>
    );
}

export default App;
