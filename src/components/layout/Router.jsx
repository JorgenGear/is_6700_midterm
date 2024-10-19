import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import PagesPage from '../../pages/PagesPage';
import ModulesPage from '../../pages/ModulesPage';
import AnnouncementsPage from '../../pages/AnnouncementsPage';
import Dashboard from '../../pages/Dashboard';

const Router = () => {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/announcements" element={<AnnouncementsPage isTeacher={user?.isTeacher || false} />} />
                <Route path="/modules" element={<ModulesPage isTeacher={user?.isTeacher || false } />} />
                
                {/* Teacher-only routes */}
                {user?.isTeacher && (
                    <>
                        <Route path="/pages" element={<PagesPage />} />
                    </>
                )}
            </Route>

            {/* Catch-all route - redirect to home or dashboard */}
            <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
        </Routes>
    );
};

export default Router;