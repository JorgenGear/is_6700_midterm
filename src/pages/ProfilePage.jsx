import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    CircularProgress,
    TextField,
    Paper,
    Grid,
    Avatar,
    Snackbar,
    Alert
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../apiV3';

const userApi = useApi('users');

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (user && user.id) {
                try {
                    setLoading(true);
                    const userData = await userApi.getById(user.id);
                    setProfile(userData);
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setError("Failed to fetch profile data");
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [user]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await userApi.update(user.id, profile);
            setIsEditing(false);
            setSnackbar({ open: true, message: 'Profile updated successfully', severity: 'success' });
        } catch (err) {
            console.error("Error updating profile:", err);
            setSnackbar({ open: true, message: 'Failed to update profile', severity: 'error' });
        }
    };

    const handleChange = (field) => (event) => {
        setProfile({ ...profile, [field]: event.target.value });
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box sx={{ p: 3, maxWidth: 800, margin: 'auto' }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} sm={4} md={3} sx={{ textAlign: 'center' }}>
                        <Avatar
                            alt={profile?.name || user?.email}
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100, margin: 'auto' }}
                        />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            {profile?.name || user?.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} md={9}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h4">Profile</Typography>
                            <Button
                                variant="contained"
                                color={isEditing ? "success" : "primary"}
                                startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
                                onClick={isEditing ? handleSave : handleEdit}
                            >
                                {isEditing ? 'Save' : 'Edit'}
                            </Button>
                        </Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Name"
                                    value={profile?.name || ''}
                                    onChange={handleChange('name')}
                                    disabled={!isEditing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={profile?.email || ''}
                                    disabled
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Age"
                                    type="number"
                                    value={profile?.age || ''}
                                    onChange={handleChange('age')}
                                    disabled={!isEditing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="School"
                                    value={profile?.school || ''}
                                    onChange={handleChange('school')}
                                    disabled={!isEditing}
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Bio"
                                    multiline
                                    rows={4}
                                    value={profile?.bio || ''}
                                    onChange={handleChange('bio')}
                                    disabled={!isEditing}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfilePage;