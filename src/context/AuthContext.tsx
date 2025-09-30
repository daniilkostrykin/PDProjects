import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AuthService, { AuthUser, LoginDto, RegisterDto } from '@/services/auth.service';


export type AuthContextValue = {
user: AuthUser | null;
isAuthenticated: boolean;
isAdmin: boolean;
login: (dto: LoginDto) => Promise<void>;
register: (dto: RegisterDto) => Promise<void>;
logout: () => void;
setAuth: () => void;
};


export const AuthContext = createContext<AuthContextValue | undefined>(undefined);


export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
const [user, setUser] = useState<AuthUser | null>(AuthService.getCurrentUser());
const [booting, setBooting] = useState(true);


const setAuth = () => setUser(AuthService.getCurrentUser());


const login = async (dto: LoginDto) => {
const res = await AuthService.login(dto);
setUser(res.user);
};


const register = async (dto: RegisterDto) => {
await AuthService.register(dto);
};


const logout = () => {
AuthService.logout();
setUser(null);
};


useEffect(() => {
setAuth();
setBooting(false);
}, []);


const value = useMemo<AuthContextValue>(() => ({
user,
isAuthenticated: !!user,
isAdmin: !!user?.roles?.includes('ADMIN'),
login,
register,
logout,
setAuth,
}), [user]);


if (booting) return <div className="container">Загрузка…</div>;
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};