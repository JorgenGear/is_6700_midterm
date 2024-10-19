// The goal of Pages is to have a list of pages (#4) that are editable by a teacher and viewable by a student.
// Each Page should have a PAGE_TYPE (changeable by SelectInput). One of the following:
// HomePage (show as home tab)
// GenericPage
// Assignment
// IN-Class Exercise
// <Add New PAGE_TYPE>
// I want you to be able to create a new PAGE_TYPE like Midterm, ExCredit, Final, etc.
// Maybe a modal
// HINT: you might as well save this list in your database initially you can use the api.bulkCreate function
// Create / List / View / Edit / Delete
// In the List page, groupBy PAGE_TYPE
//add new page type (plus button near selector with modal)
//categorized by page type

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    Link,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - replace with actual data fetching in a real application
const initialPages = [
    { id: 1, title: 'Course Introduction', type: 'homepage', content: 'Welcome to the course!', moduleId: null },
    { id: 2, title: 'Week 1 Assignment', type: 'assignment', content: 'Complete the following tasks...', moduleId: 1 },
    { id: 3, title: 'In-class Exercise 1', type: 'inclass', content: 'Work on this problem during class...', moduleId: 1 },
];

const initialPageTypes = ['assignment', 'generic', 'inclass', 'homepage'];

const initialModules = [
    { id: 1, title: 'Module 1' },
    { id: 2, title: 'Module 2' },
];

const PagesPage = () => {
    const [pages, setPages] = useState(initialPages);
    const [pageTypes, setPageTypes] = useState(initialPageTypes);
    const [modules, setModules] = useState(initialModules);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isNewTypeDialogOpen, setIsNewTypeDialogOpen] = useState(false);
    const [newPage, setNewPage] = useState({ title: '', type: '', content: '', moduleId: '' });
    const [selectedPage, setSelectedPage] = useState(null);
    const [newPageType, setNewPageType] = useState('');

    // In a real application, you would fetch modules data here
    useEffect(() => {
        // Fetch modules data
    }, []);

    const handleCreatePage = () => {
        const createdPage = {
            id: pages.length + 1,
            ...newPage,
            moduleId: newPage.moduleId ? parseInt(newPage.moduleId) : null
        };
        setPages([...pages, createdPage]);
        setIsDialogOpen(false);
        setNewPage({ title: '', type: '', content: '', moduleId: '' });
    };

    const handleDeletePage = (pageId) => {
        setPages(pages.filter(page => page.id !== pageId));
    };

    const handleEditPage = (page) => {
        setSelectedPage(page);
        setNewPage({ ...page, moduleId: page.moduleId ? page.moduleId.toString() : '' });
        setIsDialogOpen(true);
    };

    const handleUpdatePage = () => {
        setPages(pages.map(page =>
            page.id === selectedPage.id ? { ...page, ...newPage, moduleId: newPage.moduleId ? parseInt(newPage.moduleId) : null } : page
        ));
        setIsDialogOpen(false);
        setSelectedPage(null);
        setNewPage({ title: '', type: '', content: '', moduleId: '' });
    };

    const handleAddNewPageType = () => {
        if (newPageType && !pageTypes.includes(newPageType)) {
            setPageTypes([...pageTypes, newPageType]);
            setNewPageType('');
            setIsNewTypeDialogOpen(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">
                    Manage Course Pages
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => setIsNewTypeDialogOpen(true)}
                        sx={{ mr: 1 }}
                    >
                        Add Page Type
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Create Page
                    </Button>
                </Box>
            </Box>
            
            <List>
                {pages.map((page) => (
                    <ListItem
                        key={page.id}
                        secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEditPage(page)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePage(page.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    >
                        <ListItemText
                            primary={
                                <Link component={RouterLink} to={`/pages/${page.id}`}>
                                    {page.title}
                                </Link>
                            }
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        Type: {page.type}
                                    </Typography>
                                    {page.moduleId && (
                                        <Chip 
                                            label={modules.find(m => m.id === page.moduleId)?.title || 'Unknown Module'} 
                                            size="small" 
                                            sx={{ ml: 1 }}
                                        />
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>{selectedPage ? 'Edit Page' : 'Create New Page'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="page-title"
                        label="Page Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newPage.title}
                        onChange={(e) => setNewPage({...newPage, title: e.target.value})}
                    />
                    <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
                        <InputLabel id="page-type-label">Page Type</InputLabel>
                        <Select
                            labelId="page-type-label"
                            id="page-type"
                            value={newPage.type}
                            onChange={(e) => setNewPage({...newPage, type: e.target.value})}
                        >
                            {pageTypes.map((type) => (
                                <MenuItem key={type} value={type}>{type}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="page-content"
                        label="Page Content"
                        multiline
                        rows={4}
                        fullWidth
                        variant="standard"
                        value={newPage.content}
                        onChange={(e) => setNewPage({...newPage, content: e.target.value})}
                    />
                    <FormControl fullWidth variant="standard" sx={{ mt: 2 }}>
                        <InputLabel id="module-label">Assign to Module</InputLabel>
                        <Select
                            labelId="module-label"
                            id="module"
                            value={newPage.moduleId}
                            onChange={(e) => setNewPage({...newPage, moduleId: e.target.value})}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {modules.map((module) => (
                                <MenuItem key={module.id} value={module.id.toString()}>{module.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={selectedPage ? handleUpdatePage : handleCreatePage}>
                        {selectedPage ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isNewTypeDialogOpen} onClose={() => setIsNewTypeDialogOpen(false)}>
                <DialogTitle>Add New Page Type</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="new-page-type"
                        label="New Page Type"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newPageType}
                        onChange={(e) => setNewPageType(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsNewTypeDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddNewPageType}>Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default PagesPage;