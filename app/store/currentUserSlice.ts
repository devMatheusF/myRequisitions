import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string,
  access: {}
}

const initialState: UserState = {
  access: {},
  name: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    syncUserData(state, action: PayloadAction<UserState>) {
      const { access, name } = action.payload;
      state.access = access;
      state.name = name;
    }
  },
});


export const { 
  syncUserData
} = userSlice.actions;

export default userSlice.reducer;