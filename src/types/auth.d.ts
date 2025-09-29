export interface User {
  id: string;
  username: string;   // у нас это email
  roles: string[];
}

export interface AuthResponse {
  jwtToken: string;
  user: User;
}
