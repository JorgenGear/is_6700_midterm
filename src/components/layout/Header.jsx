import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from './Navbar';
import { useAuth } from '../../contexts/AuthContext';  // Import the useAuth hook

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user, logout } = useAuth();  // Use the AuthContext
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');  // Redirect to home page after logout
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                        Canvas
                    </Typography>
                    {user ? (
                        <>
                            <Typography variant="body1" sx={{ mr: 2 }}>
                                Welcome, {user.email}
                            </Typography>
                            <Button color="inherit" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/register">Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Navbar
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                isAuthenticated={!!user}
                userRole={user?.isTeacher ? 'teacher' : 'student'}
            />
        </Box>
    );
};

export default Header;