import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

// Mock JWT Generator (Expires in 1 hour)
const generateMockJWT = (userData) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  // 3600 seconds = 1 hour. (Change to 10 to test a 10-second expiration!)
  const payload = btoa(JSON.stringify({ ...userData, exp: Math.floor(Date.now() / 1000) + 3600 }));
  const signature = "mock-signature-do-not-use-in-prod";
  return `${header}.${payload}.${signature}`;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Core function to check if token exists AND is not expired
  const verifySession = useCallback(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      setUser(null);
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      
      // Compare expiration time to current time
      if (decoded.exp < currentTimeInSeconds) {
        // Token is expired!
        localStorage.removeItem('jwtToken');
        setUser(null);
        return false;
      }
      
      setUser(decoded);
      return true;
    } catch (error) {
      // Token is malformed/tampered with
      localStorage.removeItem('jwtToken');
      setUser(null);
      return false;
    }
  }, []);

  useEffect(() => {
    // Check session on initial load
    verifySession();
    setLoading(false);

    // SECURITY FEATURE: Real-time session monitoring
    // Checks the token every 5 seconds. If deleted from DevTools or expired, user is kicked.
    const interval = setInterval(() => {
      verifySession();
    }, 5000);

    return () => clearInterval(interval);
  }, [verifySession]);

  const login = (email, password) => {
    if (email === 'user@test.com' && password === 'myReactTestPass99!') {
      const mockUser = { id: 1, name: "John Doe", email: email, role: "user" };
      const token = generateMockJWT(mockUser);
      
      localStorage.setItem('jwtToken', token);
      verifySession(); // Instantly update state
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, verifySession }}>
      {children}
    </AuthContext.Provider>
  );
};