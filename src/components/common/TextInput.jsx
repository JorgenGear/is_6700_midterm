import React from 'react';
import { TextField } from '@mui/material';

const TextInput = ({ value, onChange }) => {
    return (
        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            variant="outlined"
            size="small"
            fullWidth
            className="mt-1"
        />
    );
};

export default TextInput;