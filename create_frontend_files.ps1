# --- Project Configuration ---
$projectName = "safe-autopass-frontend" # This is just for display messages now
$apiBaseUrl = "http://localhost:8080/api/v1" # Your Spring Boot backend URL

Write-Host "--- Starting file and folder creation for '$projectName' frontend ---"

# --- 1. Basic check if run from project root ---
if (-not (Test-Path "package.json")) {
    Write-Error "Error: This script must be run from inside your newly created React project directory (e.g., 'safe-autopass-frontend')."
    Write-Host "Current location: $(Get-Location)"
    exit 1
}
Write-Host "Running from within the project directory: $(Get-Location)"

# --- 2. Create folder structure (empty folders for organization) ---
Write-Host "Creating folder structure..."
New-Item -ItemType Directory -Force -Path src/assets/images,src/assets/icons,src/components/common,src/components/layout,src/components/auth,src/context,src/hooks,src/pages/Auth,src/pages/Dashboard,src/pages/Employees,src/pages/Passes,src/pages/Reports,src/services,src/styles,src/types,src/utils | Out-Null
Write-Host "Folder structure created."

# --- 3. Create main files and their content ---

# src/main.tsx - Overwrite default one
Write-Host "Creating src/main.tsx..."
@"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Import global Tailwind styles

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
"@ | Set-Content -Path src/main.tsx -Encoding UTF8
Write-Host "src/main.tsx created."

# src/App.tsx - Overwrite default one
Write-Host "Creating src/App.tsx..."
@"
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext'; // TODO: Uncomment later

import LoginPage from './pages/Auth/LoginPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EmployeeListPage from './pages/Employees/EmployeeListPage';
import PassListPage from './pages/Passes/PassListPage';
import AccessLogPage from './pages/Reports/AccessLogPage';

import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Simple PrivateRoute component (placeholder)
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO: Add actual authentication check here, e.g., from AuthContext
  const isAuthenticated = true; // Placeholder, replace with actual check

  return isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-4">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    // <AuthProvider> {/* TODO: Uncomment after creating AuthProvider */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/employees" element={<PrivateRoute><EmployeeListPage /></PrivateRoute>} />
        <Route path="/passes" element={<PrivateRoute><PassListPage /></PrivateRoute>} />
        <Route path="/logs" element={<PrivateRoute><AccessLogPage /></PrivateRoute>} />

        {/* Redirect to dashboard or login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    // </AuthProvider>
  );
}

export default App;
"@ | Set-Content -Path src/App.tsx -Encoding UTF8
Write-Host "src/App.tsx created."

# src/components/layout/Header.tsx
Write-Host "Creating src/components/layout/Header.tsx..."
@"
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Безопасный Автопропуск</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Specialist SBD</span>
        <button className="text-blue-600 hover:text-blue-800">Logout</button>
      </div>
    </header>
  );
};

export default Header;
"@ | Set-Content -Path src/components/layout/Header.tsx -Encoding UTF8
Write-Host "src/components/layout/Header.tsx created."

# src/components/layout/Sidebar.tsx
Write-Host "Creating src/components/layout/Sidebar.tsx..."
@"
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <div className="text-2xl font-bold mb-8">Navigation</div>
      <nav className="flex-1">
        <ul>
          <li className="mb-2">
            <NavLink
              to="/"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/employees"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Employees
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/passes"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Passes
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/logs"
              className={({ isActive }) => 
                "block py-2 px-4 rounded transition duration-200 " + 
                (isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700")
              }
            >
              Access Log
            </NavLink>
          </li>
          // Add other links as needed
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">Version 1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
"@ | Set-Content -Path src/components/layout/Sidebar.tsx -Encoding UTF8
Write-Host "src/components/layout/Sidebar.tsx created."

# src/pages/Auth/LoginPage.tsx
Write-Host "Creating src/pages/Auth/LoginPage.tsx..."
@"
import React, { useState } from 'react';
// import { useAuth } from '../../hooks/useAuth'; // TODO: Uncomment later

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { login } = useAuth(); // TODO: Uncomment

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // TODO: await login(username, password);
    alert('Login is not yet implemented, data sent to console.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-md rounded-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to Safe AutoPass
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
"@ | Set-Content -Path src/pages/Auth/LoginPage.tsx -Encoding UTF8
Write-Host "src/pages/Auth/LoginPage.tsx created."

# Create other page placeholders
$pageNames = @("Dashboard", "EmployeeList", "PassList", "AccessLog")
foreach ($page in $pageNames) {
    Write-Host "Creating src/pages/${page}Page.tsx..."
    @"
import React from 'react';

const ${page}Page: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">${page} Page (Placeholder)</h1>
      <p>Content for the ${page} page will go here.</p>
    </div>
  );
};

export default ${page}Page;
"@ | Set-Content -Path src/pages/${page}Page.tsx -Encoding UTF8
    Write-Host "src/pages/${page}Page.tsx created."
}

# src/services/api.ts
Write-Host "Creating src/services/api.ts..."
@"
import axios from 'axios';

// Use environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'; 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); 
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized request, redirecting to login...');
      localStorage.removeItem('jwt_token');
      // TODO: In a real app, use navigate from react-router-dom
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default apiClient;
"@ | Set-Content -Path src/services/api.ts -Encoding UTF8
Write-Host "src/services/api.ts created."

# .env file
Write-Host "Creating .env file..."
@"
VITE_API_BASE_URL=$apiBaseUrl
"@ | Set-Content -Path .env -Encoding UTF8
Write-Host ".env file created."

# tailwind.config.js - Create in root
Write-Host "Creating tailwind.config.js..."
@"
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
"@ | Set-Content -Path tailwind.config.js -Encoding UTF8
Write-Host "tailwind.config.js created."

# postcss.config.js - Create in root
Write-Host "Creating postcss.config.js..."
@"
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
"@ | Set-Content -Path postcss.config.js -Encoding UTF8
Write-Host "postcss.config.js created."

# src/index.css - Overwrite default one
Write-Host "Creating src/index.css for Tailwind..."
New-Item -ItemType Directory -Force -Path src/styles | Out-Null # Ensure styles folder exists
@"
@tailwind base;
@tailwind components;
@tailwind utilities;
"@ | Set-Content -Path src/index.css -Encoding UTF8
Write-Host "src/index.css created."


# --- Final instructions ---
Write-Host "--- File and folder creation complete! ---"
Write-Host ""
Write-Host "Your project structure and files have been created inside '$(Get-Location)'."
Write-Host ""
Write-Host "Next, you need to install the dependencies and run the project."
Write-Host "Please execute the following commands in your terminal (one by one):"
Write-Host ""
Write-Host "1. Install core Node.js dependencies (vite, react, react-dom, etc.):"
Write-Host "   npm install"
Write-Host ""
Write-Host "2. Install react-router-dom and axios:"
Write-Host "   npm install react-router-dom axios"
Write-Host ""
Write-Host "3. Install Tailwind CSS and its PostCSS dependencies:"
Write-Host "   npm install -D tailwindcss postcss autoprefixer"
Write-Host ""
Write-Host "4. Start your development server:"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "Remember to configure CORS on your Spring Boot backend for 'http://localhost:5173' if you haven't already."
Write-Host "Happy coding!"