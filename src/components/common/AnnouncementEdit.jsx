import React, { useState } from 'react';
import { updateBlogPost } from '../../apiV3';
import { TextField, Button, Box } from '@mui/material';

function EditAnnouncement({ id, initialTitle, initialContent, onSubmit }) {
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateBlogPost(id, { title, content });
        onSubmit();
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
            <Button type="submit" variant="contained" sx={{ mt: 2, ml: 1 }}>Update Announcement</Button>
        </Box>
    );
}

export default EditAnnouncement;