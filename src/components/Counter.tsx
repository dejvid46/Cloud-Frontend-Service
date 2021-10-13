import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useGlobalState, GlobalStateInterface } from "../features/GlobalState";

export default () => {
    const { state, setState } = useGlobalState();
    
    const counterFunc = (data: Partial<GlobalStateInterface>) => {
        setState((prev) => ({ ...prev, ...data }));
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={() => {
                counterFunc({counter: (state.counter || 0) + 1});
            }}>
                {state.counter}
            </Button>
        </div>
    );
}