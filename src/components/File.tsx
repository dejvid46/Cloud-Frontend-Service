import Box from '@mui/material/Box';
import { getCookie } from '../features/Fetch';
import { fileURL } from '../features/Router';


export default () => {

    let str = fileURL();

    console.log(str);

    const Image = () => {
        return (
            <>
                <Box sx={{
                    margin: "auto"
                }}>
                    {/* <img src onerror="fetch('https://picsum.photos/200',{headers: {hello:'World!'}}).then(r=>r.blob()).then(d=> this.src=window.URL.createObjectURL(d));" /> */}
                </Box>
            </>
        )
    }

    const Text = () => {
        return (
            <>
                <Box sx={{
                    margin: "auto"
                }}>
                    {str}
                </Box>
            </>
        )
    }

    return (
        <>
            {
                (
                    (str.endsWith(".png") && (<Image />)) ||
                    (str.endsWith(".jpg") && (<Image />)) ||
                    (str.endsWith(".gif") && (<Image />)) ||
                    (str.endsWith(".txt") && (<Text />)) ||
                    ((<Text />))
                )
            }
        </>
    )
}