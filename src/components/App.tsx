import { ThemeProvider, createTheme } from '@mui/material/styles';
import Router from '../features/Router';
import routes from '../routes/mainRoutes';
import CssBaseline from '@mui/material/CssBaseline';
import { RecoilRoot } from 'recoil';

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
                <RecoilRoot>
                    <Router routes={routes} />
                </RecoilRoot>
            </ThemeProvider>
        </div>
    );
}

export default App;
