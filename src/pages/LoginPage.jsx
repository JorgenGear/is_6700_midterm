import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardActions, CardContent, CardHeader, TextField } from '@mui/material';
import MUIButton from '../components/common/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px) -mt-16]">
            <Card className="w-full max-w-md m-4">
                <CardHeader title="Login" className="text-center" />
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
                        {error && <p className="text-red-500">{error}</p>}
                        <MUIButton 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            color="primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </MUIButton>
                    </form>
                </CardContent>
                <CardActions>
                    <p className="text-sm text-gray-600 w-full text-center">
                        Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
                    </p>
                </CardActions>
            </Card>
        </div>
    );
};

export default LoginPage;