/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('wearhouse_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('wearhouse_token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('wearhouse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wearhouse_user');
    }
    if (token) {
      localStorage.setItem('wearhouse_token', token);
    } else {
      localStorage.removeItem('wearhouse_token');
    }
  }, [user, token]);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  const getApiUrl = (path) => `${apiUrl.endsWith('/') ? apiUrl : apiUrl + '/'}${path}`;

  const register = async (userData) => {
    try {
      const response = await fetch(getApiUrl('auth/register/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Registration error", data);
        return false;
      }

      setToken(data.access);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Registration error", error);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(getApiUrl('auth/login/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Login error", data);
        return false;
      }

      setToken(data.access);

      // Fetch user profile
      const profileRes = await fetch(getApiUrl('auth/profile/'), {
        headers: { Authorization: `Bearer ${data.access}` }
      });
      const profileData = await profileRes.json();

      setUser(profileData);
      return true;
    } catch (error) {
      console.error("Login error", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await fetch(getApiUrl('auth/profile/'), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Profile update error", data);
        return false;
      }

      setUser(data);
      return true;
    } catch (error) {
      console.error("Profile update error", error);
      return false;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await fetch(getApiUrl('auth/password/'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      });
      const data = await response.json();

      if (!response.ok) {
        console.error("Password update error", data);
        return { success: false, errors: data };
      }

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Password update error", error);
      return { success: false, errors: {} };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateProfile, updatePassword, token }}>
      {children}
    </AuthContext.Provider>
  );
};
