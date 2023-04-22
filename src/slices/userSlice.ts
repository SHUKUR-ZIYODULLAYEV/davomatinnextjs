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
        sessionStorage.setItem("user", JSON.stringify(action.payload));
        axios.defaults.headers.common = {
          Authorization: `Bearer ${action?.payload?.access}`,
        };
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Login failed';
        state.errorStatus = true;
      });
  },
});

export const { logout, setErrorAction } = userSlice.actions;

// Check the access token validity before sending each request
// axios.interceptors.request.use(async (config) => {
//   var user = JSON.parse(sessionStorage.getItem('user') as string);
//   if (user && user.access && user.expired_at) {
//     const now = new Date().getTime(); // get current time in seconds
//     if (now > user.expired_at) {
//       console.log("logg1");
      
//       // Access token has expired, refresh it
//       // async () => {
//       //   const response = await axios.post(api_url + '/api/login/refresh/v2/', {
//       //     refresh: user.refresh,
//       //   });
//       //   console.log("responselogg1:", response);
        
//       //   user.access = response.data.access;
//       //   user.refresh = response.data.refresh;
//       //   user.created_at = response.data.created_at;
//       //   user.expired_at = response.data.expired_at;
//       //   sessionStorage.setItem('user', JSON.stringify(user));
//       //   config.headers.Authorization = `Bearer ${response.data.access}`;
//       // }
//       try {
//         const response = await axios.post(api_url + '/api/login/refresh/v2/', {
//           refresh: user.refresh,
//         });
//         console.log("responselogg1:", response);
        
//         user.access = response.data.access;
//         user.refresh = response.data.refresh;
//         user.created_at = response.data.created_at;
//         user.expired_at = response.data.expired_at;
//         sessionStorage.setItem('user', JSON.stringify(user));
//         config.headers.Authorization = `Bearer ${response.data.access}`;
//       } catch (error) {
//         // Handle refresh token error
//         console.log('Refresh token error:', error);
//       }
//     } else {
//       console.log("logg2");
//       config.headers.Authorization = `Bearer ${user.access}`;
//     }
//   }
//   return config;
// });
export default userSlice.reducer;
