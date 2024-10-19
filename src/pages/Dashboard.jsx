import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const sampleUserData = {
    name: "John Doe",
    email: "johndoe@example.com",
    school: "University of Technology"
};

const sampleStatsData = {
    totalCourses: 5,
    completedAssignments: 23,
    averageGrade: "B+"
};

const sampleCourseProgress = [
    { name: "React Basics", progress: 80 },
    { name: "Advanced JavaScript", progress: 65 },
    { name: "Database Design", progress: 90 },
    { name: "Web Security", progress: 45 },
    { name: "UI/UX Principles", progress: 70 }
];

const DashboardPage = () => {
    return (
        <Box sx={{ p: 3, maxWidth: 1200, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            
            <Grid container spacing={3}>
                {/* User Info Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>User Information</Typography>
                            <Typography>Name: {sampleUserData.name}</Typography>
                            <Typography>Email: {sampleUserData.email}</Typography>
                            <Typography>School: {sampleUserData.school}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Quick Stats Card */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>Quick Stats</Typography>
                            <Typography>Total Courses: {sampleStatsData.totalCourses}</Typography>
                            <Typography>Completed Assignments: {sampleStatsData.completedAssignments}</Typography>
                            <Typography>Average Grade: {sampleStatsData.averageGrade}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Chart */}
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>Course Progress</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={sampleCourseProgress}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="progress" fill="#8884d8" name="Progress (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardPage;