import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { GlobalStateProvider } from "../features/GlobalState";
import Router from '../features/Router';
import routes from '../routes/mainRoutes';

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
            <ThemeProvider theme={theme}>
                <GlobalStateProvider>
                    <Router routes={routes} />
                </GlobalStateProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
