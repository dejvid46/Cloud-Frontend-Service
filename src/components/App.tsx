import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from '../features/Router';
import routes from '../routes/mainRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#E33E7F'
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
