import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Collapse,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Comment as CommentIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import EditAnnouncement from '../components/common/AnnouncementEdit';
import NewAnnouncement from '../components/common/AnnouncementPost';
import AnnouncementReply from '../components/common/AnnouncementReply';
import { getBlogPosts, deleteBlogPost } from '../apiV3';

const AnnouncementsPage = ({ isTeacher }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [isNewAnnouncementOpen, setIsNewAnnouncementOpen] = useState(false);
    const [isEditAnnouncementOpen, setIsEditAnnouncementOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [expandedAnnouncements, setExpandedAnnouncements] = useState({});

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        const posts = await getBlogPosts();
        setAnnouncements(posts);
    };

    const handleDeleteAnnouncement = async (id) => {
        await deleteBlogPost(id);
        fetchAnnouncements();
    };

    const handleEditAnnouncement = (announcement) => {
        setSelectedAnnouncement(announcement);
        setIsEditAnnouncementOpen(true);
    };

    const handleReply = (announcement) => {
        setSelectedAnnouncement(announcement);
        setIsReplyOpen(true);
    };

    const handleNewAnnouncementSubmit = () => {
        setIsNewAnnouncementOpen(false);
        fetchAnnouncements();
    };

    const handleEditAnnouncementSubmit = () => {
        setIsEditAnnouncementOpen(false);
        fetchAnnouncements();
    };

    const handleReplySubmit = () => {
        setIsReplyOpen(false);
        fetchAnnouncements();
    };

    const toggleAnnouncementExpand = (id) => {
        setExpandedAnnouncements(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">Announcements</Typography>
                {isTeacher && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsNewAnnouncementOpen(true)}
                    >
                        New Announcement
                    </Button>
                )}
            </Box>

            <List>
                {announcements.map((announcement) => (
                    <ListItem
                        key={announcement.id}
                        alignItems="flex-start"
                        secondaryAction={
                            <Box>
                                {isTeacher && (
                                    <>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditAnnouncement(announcement)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </>
                                )}
                                <IconButton edge="end" aria-label="reply" onClick={() => handleReply(announcement)}>
                                    <CommentIcon />
                                </IconButton>
                                <IconButton onClick={() => toggleAnnouncementExpand(announcement.id)}>
                                    {expandedAnnouncements[announcement.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                            </Box>
                        }
                    >
                        <ListItemText
                            primary={announcement.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {announcement.content.substring(0, 100)}
                                        {announcement.content.length > 100 && '...'}
                                    </Typography>
                                    <Collapse in={expandedAnnouncements[announcement.id]} timeout="auto" unmountOnExit>
                                        <Typography paragraph>
                                            {announcement.content}
                                        </Typography>
                                    </Collapse>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog open={isNewAnnouncementOpen} onClose={() => setIsNewAnnouncementOpen(false)}>
                <DialogTitle>New Announcement</DialogTitle>
                <DialogContent>
                    <NewAnnouncement onSubmit={handleNewAnnouncementSubmit} />
                </DialogContent>
            </Dialog>

            <Dialog open={isEditAnnouncementOpen} onClose={() => setIsEditAnnouncementOpen(false)}>
                <DialogTitle>Edit Announcement</DialogTitle>
                <DialogContent>
                    {selectedAnnouncement && (
                        <EditAnnouncement
                            id={selectedAnnouncement.id}
                            initialTitle={selectedAnnouncement.title}
                            initialContent={selectedAnnouncement.content}
                            onSubmit={handleEditAnnouncementSubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>

            <Dialog open={isReplyOpen} onClose={() => setIsReplyOpen(false)}>
                <DialogTitle>Reply to Announcement</DialogTitle>
                <DialogContent>
                    {selectedAnnouncement && (
                        <AnnouncementReply 
                            postId={selectedAnnouncement.id} 
                            onSubmit={handleReplySubmit}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AnnouncementsPage;