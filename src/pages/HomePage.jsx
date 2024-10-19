import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

const HomePage = () => {
    return (
        <Box>
            {/* Hero Banner */}
            <Paper
                sx={{
                    position: 'relative',
                    backgroundColor: 'grey.800',
                    color: '#fff',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(/api/placeholder/1200/400)`,
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: 'rgba(0,0,0,.3)' }} />
                <Typography variant="h2" component="h1" sx={{ position: 'relative', textAlign: 'center' }}>
                    IS-6700 Client-Side Web Development
                </Typography>
            </Paper>

            {/* Course Description */}
            <Typography variant="h4" gutterBottom>
                Course Description
            </Typography>
            <Typography paragraph>
            IS 5700/6700 is designed to provide you with software development experience using a modern client-side web
            development framework, namely React.js, to create e-Commerce or web-based systems. The course draws on
            programming skills from DATA 3500, database skills from DATA 3330, web interface design skills from IS
            3700. Building upon this foundation, you will use contemporary software development tools to build data-driven
            web applications that fulfill a business need. You will learn how to architect modular web interfaces that use and
            components and manage state. You’ll also learn how to consume web services that allow access to structured data
            via HTTP endpoints. You will also learn some of the tradeoffs inherent in web systems and options based on the
            client's situation, needs, and the technical environment
            </Typography>

            {/* Course Information */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>Course Details</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Instructor" secondary="Andrew McMullin" />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Schedule" secondary="Tues, Thurs, Fri 10:30 AM - 11:45 AM" />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Location" secondary="Online" />
                            </ListItem>
                            <Divider component="li" />
                            <ListItem>
                                <ListItemText primary="Credits" secondary="3" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h5" gutterBottom>Course Objectives</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="• Define what React.js is and why it is used" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Develop reusable user interface components that receive data and interact with other components" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Understand what state is and how to manage and update state" />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="• Deploy a web application to production" />
                            </ListItem>
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;