import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const api_url = process.env.NEXT_PUBLIC_API_URL as string;
interface UserState {
  user: LoginResponseData | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  errorStatus: boolean;
}

interface LoginFormValues {
  passport: string;
  password: string;
}

interface LoginResponseData {
  refresh: string;
  access: string;
  created_at: number;
  expired_at: number;
  id: string;
  role: string;
  full_name: string;
  source: null | string;
  status: string;
  contract: null | string;
  payment_type: null | string;
  is_debtor: null | boolean;
}

export const loginAction = createAsyncThunk<LoginResponseData, LoginFormValues>(
  'app/loginAction',
  async (formData) => {
    const response = await axios.post<LoginResponseData>(api_url + "/api/login/v2/", {
      passport: formData.passport,
      password: formData.password,
    });
    return response.data;
  }
);

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
  errorStatus: false
};

const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setErrorAction: (state, action) => {
      state.errorStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status = 'loading';
        state.errorStatus = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.error = null;
        state.errorStatus = false;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Login failed';
        state.errorStatus = true;
        // state.error = action.error.message || 'Login failed';
      });
  },
});

export const { logout, setErrorAction } = userSlice.actions;

export default userSlice.reducer;