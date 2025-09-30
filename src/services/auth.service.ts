import axios from 'axios';


const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1';


export type RegisterDto = { email: string; password: string; fullName: string };
export type LoginDto = { username: string; password: string };
export type AuthUser = { id: string; username: string; roles: string[] };
export type UserResponse = { id: string; email: string; fullName: string; createdAt: string };
export type AuthResponse = { jwtToken: string; user: AuthUser }; // фикс lwtToken -> jwtToken


const TOKEN_KEY = 'accessToken';
const USER_KEY = 'authUser';


function setAuthStorage(token: string, user: AuthUser) {
localStorage.setItem(TOKEN_KEY, token);
localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function clearAuthStorage() {
localStorage.removeItem(TOKEN_KEY);
localStorage.removeItem(USER_KEY);
}


const AuthService = {
async register(data: RegisterDto): Promise<UserResponse> {
const res = await axios.post<UserResponse>(`${API}/auth/register`, data, {
headers: { 'Content-Type': 'application/json' },
});
return res.data;
},


async login(data: LoginDto): Promise<AuthResponse> {
const res = await axios.post<AuthResponse>(`${API}/auth/login`, data, {
headers: { 'Content-Type': 'application/json' },
});
setAuthStorage(res.data.jwtToken, res.data.user);
return res.data;
},


logout() {
clearAuthStorage();
},


getAccessToken(): string | null {
return localStorage.getItem(TOKEN_KEY);
},


getCurrentUser(): AuthUser | null {
const raw = localStorage.getItem(USER_KEY);
return raw ? (JSON.parse(raw) as AuthUser) : null;
},
};


export default AuthService;