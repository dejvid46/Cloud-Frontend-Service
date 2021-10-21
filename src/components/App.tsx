import { useState } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { GlobalStateProvider } from "../features/GlobalState";
import Counter from './Counter';

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
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />
                    <Counter />

                </GlobalStateProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
