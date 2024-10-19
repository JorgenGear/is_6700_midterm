import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, TextField, FormControlLabel, Switch } from '@mui/material';
import MUIButton from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isTeacher, setIsTeacher] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword && password !== '');
    }, [password, confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordsMatch) {
            setIsLoading(true);
            setError('');
            try {
                const result = await register(email, password, isTeacher);
                if (result.success) {
                    console.log('User registered successfully');
                    navigate('/login');
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        } else {
            setError('Passwords do not match');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] -mt-16">
            <Card className="w-full max-w-md m-4">
                <CardHeader title="Register" className="text-center" />
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            error={!passwordsMatch && confirmPassword !== ''}
                            helperText={!passwordsMatch && confirmPassword !== '' ? 'Passwords do not match' : ''}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isTeacher}
                                    onChange={(e) => setIsTeacher(e.target.checked)}
                                    name="isTeacher"
                                    color="primary"
                                />
                            }
                            label="Register as a Teacher"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                        <MUIButton 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            disabled={!passwordsMatch || isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </MUIButton>
                    </form>
                </CardContent>
                <CardActions>
                    <p className="text-sm text-gray-600 w-full text-center">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                    </p>
                </CardActions>
            </Card>
        </div>
    );
};

export default RegisterPage;