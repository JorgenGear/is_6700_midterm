import React from 'react';
import {Button as MUIButton} from '@mui/material'

//found a button I like on material ui and I think I implemented it correctly

const Button = ({ children, type = 'button', onClick }) => {
    return (
        <MUIButton variant="contained" type={type} onClick={onClick}>
            {children}
        </MUIButton>
    )
};

export default Button;
