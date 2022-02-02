import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

interface ModalProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode,
    buttonText?: string,
    editable?: boolean
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
  
export default ({children, buttonText, editable, ...rest}: ModalProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div {...rest} >

            {
                buttonText ? <Button disabled={editable} onClick={handleOpen}>{buttonText}</Button> : <></>
            }
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
  }