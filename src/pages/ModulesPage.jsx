import React, { useState, useMemo } from 'react';
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
    Switch,
    FormControlLabel,
    Collapse,
    Link,
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    ArrowUpward as ArrowUpwardIcon,
    ArrowDownward as ArrowDownwardIcon,
    ExpandMore as ExpandMoreIcon,
    ExpandLess as ExpandLessIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

// Mock data - replace with actual data fetching in a real application
const initialModules = [
    { id: 1, title: 'Introduction to React', published: true, order: 1 },
    { id: 2, title: 'State and Props', published: true, order: 2 },
    { id: 3, title: 'Hooks in React', published: false, order: 3 },
];

const initialAssignments = [
    { id: 1, module_id: 1, title: 'Build a Simple React Component', dueDate: '2023-06-15', description: 'Create a functional React component that displays a greeting message.' },
    { id: 2, module_id: 1, title: 'React Project Setup', dueDate: '2023-06-20', description: 'Set up a new React project using Create React App.' },
    { id: 3, module_id: 2, title: 'State Management Exercise', dueDate: '2023-06-25', description: 'Create a counter component that uses React state.' },
    { id: 4, module_id: 2, title: 'Props Drilling Practice', dueDate: '2023-06-30', description: 'Build a component tree that passes props through multiple levels.' },
    { id: 5, module_id: 3, title: 'Custom Hook Creation', dueDate: '2023-07-05', description: 'Develop a custom React hook that manages a form state.' },
];

const initialPages = [
    { id: 1, title: 'Course Introduction', type: 'homepage', content: 'Welcome to the course!', moduleId: 1 },
    { id: 2, title: 'Week 1 Assignment', type: 'assignment', content: 'Complete the following tasks...', moduleId: 1 },
    { id: 3, title: 'In-class Exercise 1', type: 'inclass', content: 'Work on this problem during class...', moduleId: 2 },
];

const ModulesPage = ({ isTeacher = false }) => {
    const [modules, setModules] = useState(initialModules);
    const [assignments, setAssignments] = useState(initialAssignments);
    const [pages, setPages] = useState(initialPages);
    const [selectedModule, setSelectedModule] = useState(null);
    const [isModuleDialogOpen, setIsModuleDialogOpen] = useState(false);
    const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState('');
    const [newAssignment, setNewAssignment] = useState({ title: '', description: '', dueDate: '' });
    const [expandedModules, setExpandedModules] = useState({});

    const modulesWithContent = useMemo(() => {
        return modules.map(module => ({
            ...module,
            assignments: assignments.filter(assignment => assignment.module_id === module.id),
            pages: pages.filter(page => page.moduleId === module.id)
        }));
    }, [modules, assignments, pages]);

    const visibleModules = isTeacher ? modulesWithContent : modulesWithContent.filter(module => module.published);

    const handleCreateModule = () => {
        const newModule = {
            id: modules.length + 1,
            title: newModuleTitle,
            published: false,
            order: modules.length + 1
        };
        setModules([...modules, newModule]);
        setNewModuleTitle('');
        setIsModuleDialogOpen(false);
    };

    const handleDeleteModule = (moduleId) => {
        setModules(modules.filter(module => module.id !== moduleId));
        setAssignments(assignments.filter(assignment => assignment.module_id !== moduleId));
        setPages(pages.filter(page => page.moduleId !== moduleId));
    };

    const handleTogglePublish = (moduleId) => {
        setModules(modules.map(module =>
            module.id === moduleId ? { ...module, published: !module.published } : module
        ));
    };

    const handleMoveModule = (moduleId, direction) => {
        const currentIndex = modules.findIndex(module => module.id === moduleId);
        if ((direction === 'up' && currentIndex > 0) || (direction === 'down' && currentIndex < modules.length - 1)) {
            const newModules = [...modules];
            const [movedModule] = newModules.splice(currentIndex, 1);
            newModules.splice(direction === 'up' ? currentIndex - 1 : currentIndex + 1, 0, movedModule);
            setModules(newModules.map((module, index) => ({ ...module, order: index + 1 })));
        }
    };

    const handleEditModule = (module) => {
        setSelectedModule(module);
        setNewModuleTitle(module.title);
        setIsModuleDialogOpen(true);
    };

    const handleUpdateModule = () => {
        setModules(modules.map(module =>
            module.id === selectedModule.id ? { ...module, title: newModuleTitle } : module
        ));
        setIsModuleDialogOpen(false);
        setSelectedModule(null);
        setNewModuleTitle('');
    };

    const handleToggleExpand = (moduleId) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleId]: !prev[moduleId]
        }));
    };

    const handleCreateAssignment = () => {
        const newAssignmentObj = {
            id: assignments.length + 1,
            module_id: selectedModule.id,
            ...newAssignment
        };
        setAssignments([...assignments, newAssignmentObj]);
        setIsAssignmentDialogOpen(false);
        setNewAssignment({ title: '', description: '', dueDate: '' });
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                <Typography variant="h4">
                    Course Modules
                </Typography>
                {isTeacher && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsModuleDialogOpen(true)}
                    >
                        Add Module
                    </Button>
                )}
            </Box>
            
            <List>
                {visibleModules.map((module) => (
                    <React.Fragment key={module.id}>
                        <ListItem
                            secondaryAction={
                                isTeacher && (
                                    <>
                                        <IconButton edge="end" aria-label="edit" onClick={() => handleEditModule(module)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteModule(module.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="publish" onClick={() => handleTogglePublish(module.id)}>
                                            {module.published ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                        <IconButton edge="end" aria-label="move up" onClick={() => handleMoveModule(module.id, 'up')}>
                                            <ArrowUpwardIcon />
                                        </IconButton>
                                        <IconButton edge="end" aria-label="move down" onClick={() => handleMoveModule(module.id, 'down')}>
                                            <ArrowDownwardIcon />
                                        </IconButton>
                                    </>
                                )
                            }
                        >
                            <ListItemText
                                primary={module.title}
                                secondary={`Assignments: ${module.assignments.length}, Pages: ${module.pages.length}`}
                            />
                            <IconButton onClick={() => handleToggleExpand(module.id)}>
                                {expandedModules[module.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            </IconButton>
                        </ListItem>
                        <Collapse in={expandedModules[module.id]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Pages
                                </Typography>
                                <List>
                                    {module.pages.map((page) => (
                                        <ListItem key={page.id}>
                                            <ListItemText
                                                primary={
                                                    <Link component={RouterLink} to={`/pages/${page.id}`}>
                                                        {page.title}
                                                    </Link>
                                                }
                                                secondary={`Type: ${page.type}`}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                {isTeacher && (
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            setSelectedModule(module);
                                            setIsAssignmentDialogOpen(true);
                                        }}
                                    >
                                        Add Assignment
                                    </Button>
                                )}
                            </Box>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>

            <Dialog open={isModuleDialogOpen} onClose={() => setIsModuleDialogOpen(false)}>
                <DialogTitle>{selectedModule ? 'Edit Module' : 'Add New Module'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="module-title"
                        label="Module Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newModuleTitle}
                        onChange={(e) => setNewModuleTitle(e.target.value)}
                    />
                    {selectedModule && (
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={selectedModule.published}
                                    onChange={() => handleTogglePublish(selectedModule.id)}
                                />
                            }
                            label="Published"
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsModuleDialogOpen(false)}>Cancel</Button>
                    <Button onClick={selectedModule ? handleUpdateModule : handleCreateModule}>
                        {selectedModule ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isAssignmentDialogOpen} onClose={() => setIsAssignmentDialogOpen(false)}>
                <DialogTitle>Add New Assignment</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="assignment-title"
                        label="Assignment Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAssignment.title}
                        onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        id="assignment-description"
                        label="Assignment Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={newAssignment.description}
                        onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                    />
                    <TextField
                        margin="dense"
                        id="assignment-due-date"
                        label="Due Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={newAssignment.dueDate}
                        onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsAssignmentDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleCreateAssignment}>Create</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ModulesPage;