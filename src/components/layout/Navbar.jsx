import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const Navbar = ({ open, onClose, isAuthenticated, userRole }) => {
    const navigationItems = [
        { id: 'nav1', text: 'Home', path: '/', showWhen: 'always' },
        { id: 'nav2', text: 'Profile', path: '/profile', showWhen: 'always' },
        { id: 'nav3', text: 'Announcements', path: '/announcements', showWhen: 'always' },
        { id: 'nav4', text: 'Modules', path: '/modules', showWhen: 'always' },
        { id: 'nav5', text: 'Pages', path: '/pages', showWhen: 'notStudent' },
        { id: 'nav6', text: 'Dashboard', path: '/dashboard', showWhen: 'always' }
    ];

    const DrawerList = (
        <List>
            {navigationItems
                .filter(item => (
                    item.showWhen === 'always' ||
                    (item.showWhen === 'notAuthenticated' && !isAuthenticated) ||
                    (item.showWhen === 'notStudent' && userRole !== 'student')
                ))
                .map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton component={Link} to={item.path} onClick={onClose}>
                            <ListItemIcon>
                                {item.id.includes('2') || item.id.includes('4') ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    );

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
        >
            {DrawerList}
        </Drawer>
    );
};

export default Navbar;