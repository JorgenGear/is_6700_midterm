import React, { createContext, useState, useContext } from 'react';
import { useApi } from '../apiV3';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const userApi = useApi('users');
    const [user, setUser] = useState(null);

    const register = async (email, password, isTeacher) => {
        try {
            const existingUser = await userApi.getByField('email', email);
            if (existingUser) {
                throw new Error('User with this email already exists');
            }
        
            const newUserID = await userApi.create({ email, password, isTeacher });
            setUser({ email, password, isTeacher, id: newUserID});
            return {success: true};
        } catch (err) {
            return {success: false, message: err.message};
        }
                        // // Check if user with this email already exists
                        // const existingUser = await usersApi.getByField('email', email);
                        // if (existingUser) {
                        //     throw new Error('User with this email already exists');
                        // }
    }
//lookup email in apiv3
//const dbuser = await userApi.getByField('email', email);
//check if user exists, then validate password
//throw error if user does not exist
//throw wrong password error if password is wrong
//setUser(dbuser);
//navigate to home page (outside this file)
    const login = async (email, password) => {
        try {
            const dbUser = await userApi.getByField('email', email);
            
            if (!dbUser) {
                throw new Error('User does not exist');
            }
            
            if (dbUser.password !== password) {
                throw new Error('Incorrect password');
            }
            
            setUser({ email: dbUser.email, isTeacher: dbUser.isTeacher, id: dbUser.id });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };
    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}