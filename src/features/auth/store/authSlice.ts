import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, LoginCredentials, User, UserRegistrationData, RegisterResponse } from '../types';
import { AuthService } from '../services/authService';

/**
 * Authentication Redux slice
 * Handles auth state management including login, logout, and token verification
 */

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const result = await AuthService.login(credentials);
      
      // Store token in localStorage
      localStorage.setItem('token', result.token);
      localStorage.setItem('identityCode', result.identityCode);
      
      // Since backend doesn't return user data in login response,
      // we need to verify the token to get user info
      const user = await AuthService.verifyToken(result.token);
      
      return { token: result.token, identityCode: result.identityCode, user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Login failed'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: UserRegistrationData, { rejectWithValue }) => {
    try {
      const result = await AuthService.registerUser(userData);
      return result;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Registration failed'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      
      // Clear token from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('identityCode');
      localStorage.removeItem('user');
      
      return null;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;
      
      if (!token) {
        throw new Error('No token found');
      }
      
      const user = await AuthService.verifyToken(token);
      return { token, user };
    } catch (error: any) {
      // Clear invalid token
      localStorage.removeItem('token');
      return rejectWithValue(
        error.response?.data?.message || 'Token verification failed'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('identityCode');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ token: string; identityCode: string; user: User }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<RegisterResponse>) => {
        state.isLoading = false;
        state.error = null;
        // Don't auto-login after registration - user needs to sign in
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      
    // Verify token
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action: PayloadAction<{ token: string; user: User }>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearAuth } = authSlice.actions;
export default authSlice.reducer;
