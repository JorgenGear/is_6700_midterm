import React from 'react';
import {ToggleButton} from '@mui/material'

//I wanted to create this toggle for teacher/student choice

const ToggleButton = ({ children, value, onClick }) => {
    return (
        <ToggleButton value={value} onClick={onClick}>
            {children}
        </ToggleButton>
    )
}