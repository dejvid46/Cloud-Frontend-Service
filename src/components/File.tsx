import Box from '@mui/material/Box';


export default () => {

    let str = "ksdhksg/sdgsdg/cattttt.txt";

    console.log();

    const Image = () => {
        return (
            <>
                <Box sx={{
                    margin: "auto"
                }}>
                    <img src={"file"+str} alt={str} ></img>
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
                    str.endsWith(".png") && (<Image />) ||
                    str.endsWith(".jpg") && (<Image />) ||
                    str.endsWith(".gif") && (<Image />) ||
                    str.endsWith(".txt") && (<Text />)
                )
            }
        </>
    )
}