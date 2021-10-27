import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GlobalStateProvider } from "../features/GlobalState";
import Router from '../features/Router';
import routes from '../routes/mainRoutes';
import CssBaseline from '@mui/material/CssBaseline';

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
            <ThemeProvider theme={theme}>
                <GlobalStateProvider>
                    <Router routes={routes} />
                </GlobalStateProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
