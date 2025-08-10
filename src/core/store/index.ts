import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../../features/auth/store/authSlice';

/**
 * Redux store configuration
 * Centralized store setup with all feature slices
 */

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
