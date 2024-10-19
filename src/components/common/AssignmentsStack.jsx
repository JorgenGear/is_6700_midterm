import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const AssignmentStack = ({ assignments }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                {assignments.map((assignment, index) => (
                    <Item key={assignment.id}>
                        <Typography variant="subtitle1" color="primary">
                            Assignment {index + 1}: {assignment.title}
                        </Typography>
                        <Typography variant="body2">
                            Due Date: {assignment.dueDate}
                        </Typography>
                        <Typography variant="body2">
                            {assignment.description}
                        </Typography>
                    </Item>
                ))}
            </Stack>
        </Box>
    );
};

export default AssignmentStack;