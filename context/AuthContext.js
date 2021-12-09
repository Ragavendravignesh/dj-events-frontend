import { useState, useEffect, createContext } from 'react';
import { useRouter } from 'next/router';
import { API_URL } from '@/config/index';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);

    const register = async (user) => {
        console.log(user);
    }

    const login = async ({email: identifier, password}) => {
        console.log({ identifier, password });
    }

    const logout = async () => {
        console.log('logout')
    }

    const checkUserLoggedIn = async (user) => {
        console.log('check');
    }

    return (<AuthContext.Provider value={{user, error, login, logout, register}}>
        {children}
    </AuthContext.Provider>)
}

export default AuthContext;