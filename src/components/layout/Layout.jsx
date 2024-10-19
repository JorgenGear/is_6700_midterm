import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Header from './Header';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ minHeight: 'calc(100vh - 64px)' }}> {/* Adjust 64px if your header height is different */}
                    <Grid display={{ xs: 'none', md: 'flex' }} justifyContent="center" alignItems="center" size="grow" sx={{ maxWidth: '240px' }}>
                        <Navbar />
                    </Grid>
                    <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
                        <main style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                            {children}
                        </main>
                    </Grid>
                    <Grid display={{ xs: 'none', md: 'block' }} size="grow" sx={{ maxWidth: '240px' }} />
                </Grid>
            </Box>
        </Box>
    );
};

export default Layout;