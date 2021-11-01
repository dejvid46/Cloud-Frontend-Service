import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import { counter as counterState } from '../features/Atoms';

export default () => {
    const [counter, setCounter] = useRecoilState(counterState);

    return (
        <>
            <Button variant="contained" color="secondary" onClick={() => {
                setCounter(counter + 1)
            }}>
                {counter}
            </Button>
        </>
    );
}