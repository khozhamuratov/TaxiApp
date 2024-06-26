import {configureStore} from '@reduxjs/toolkit';
import usersSlice from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    listUsers: usersSlice,
    isSelected: usersSlice,
    selectedDriver: usersSlice,
    isLogined: usersSlice,
    isWork: usersSlice,
    alertType: usersSlice,
    isAlert: usersSlice,
    ordersDetails: usersSlice,
    themeColor: usersSlice,
    profileData: usersSlice,
    freeOrders: usersSlice,
    isCompleted: usersSlice,
    isHidden: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
