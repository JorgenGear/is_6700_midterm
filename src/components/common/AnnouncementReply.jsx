import React, { useState } from 'react';
import { addBlogComment } from '../../apiV3';
import { TextField, Button, Box } from '@mui/material';

function AnnouncementReply({ postId, onSubmit }) {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addBlogComment(postId, { content });
        onSubmit();
        setContent('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
            <TextField
                label="Your reply"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, ml: 1 }}>Post Reply</Button>
        </Box>
    );
}

export default AnnouncementReply;