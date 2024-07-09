import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { Admin, AdminState } from './types';
import { adminLogin, adminLogout } from 'services/auth.service';

export const initialState: AdminState = {
  admin: undefined,
};

const slice = createSlice({
  name: 'adminState',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload;
    },
    clearAdmin: state => {
      state.admin = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.admin = undefined;
    });
  },
});

export const { actions: AdminActions } = slice;

export const useSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};


export default slice.reducer;
/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
