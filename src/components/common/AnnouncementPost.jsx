import React, { useState } from 'react';
import { addBlogPost } from '../../apiV3';
import { TextField, Button, Box } from '@mui/material';

function NewAnnouncement({ onSubmit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBlogPost({ title, content });
        onSubmit();
        setTitle('');
        setContent('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, ml: 1 }}>Post Announcement</Button>
        </Box>
    );
}

export default NewAnnouncement;