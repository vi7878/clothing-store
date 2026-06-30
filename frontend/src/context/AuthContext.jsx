/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('wearhouse_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user, token]);

  const apiUrl = import.meta.env.VITE_API_URL || '/api';
  const getApiUrl = (path) => `${apiUrl.endsWith('/') ? apiUrl : apiUrl + '/'}${path}`;

  const register = async (userData) => {
    try {
      const response = await axios.post(getApiUrl('auth/register/'), userData);
      setToken(response.data.access);
      setUser(response.data.user);
      return true;
    } catch (error) {
      console.error("Registration error", error.response?.data || error);
      return false;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await axios.post(getApiUrl('auth/login/'), credentials);
      setToken(response.data.access);
      // Fetch user profile
      const profileRes = await axios.get(getApiUrl('auth/profile/'), {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });
      setUser(profileRes.data);
      return true;
    } catch (error) {
      console.error("Login error", error.response?.data || error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.patch(getApiUrl('auth/profile/'), profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error("Profile update error", error.response?.data || error);
      return false;
    }
  };

  const updatePassword = async (passwordData) => {
    try {
      const response = await axios.put(getApiUrl('auth/password/'), passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error("Password update error", error.response?.data || error);
      return { success: false, errors: error.response?.data || {} };
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, updateProfile, updatePassword, token }}>
      {children}
    </AuthContext.Provider>
  );
};
