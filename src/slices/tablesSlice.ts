import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL as string;

interface TableState {
  tableList: {
    count: number;
    results: string[];
  },
  allTableList: GetAllTableListResponseData | null;
  faculties: string[];
  groups: string[];
  rooms: string[];
  tutors: string[];
  deputies: string[];
  tablesStatus: 'idle' | 'loading' | 'failed';
  tablesError: string | null;
  tablesErrorStatus: boolean;
}

interface GetAllTableListResponseData {
  id: number | null;
  owner: string | null;
  group: string[] | null;
  percent: number | null;
  room: string | null;
  deputy_dean: string[] | null;
  faculty: string | null;
  course: string | null;
  para: number | null;
  subject: string | null;
  teacher: string | null;
  department: string | null;
  sum_student: number | null;
  absent_student: number | null;
  description: string | null;
  description_2: string | null;
  sport: number | null;
  exchange: number | null;
  created_at: string | null;
  updated_at: string | null;
  dean: string | null;
  tutor: string[] | null;
} 

interface GetAllTableListFormValues {
  start: Date | string;
  end: Date | string;
}

const initialState: TableState = {
  tableList: {
    count: 0,
    results: [],
  },
  allTableList: null,
  faculties: [],
  groups: [],
  rooms: [],
  tutors: [],
  deputies: [],
  tablesStatus: 'idle',
  tablesError: null,
  tablesErrorStatus: false
};

export const getAllTableList = createAsyncThunk<GetAllTableListResponseData, GetAllTableListFormValues>(
  'tables/getAllTableList',
  async (param) => {
    let datetest = JSON.stringify({
      start: param.start,
      finish: param.end,
    });
    const response = await axios.get<GetAllTableListResponseData>(api_url + "/api/v1/attendance-list-without-pagination/", {params: {date: datetest}});
    return response.data;
  }
);

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTableList.pending, (state) => {
        state.tablesStatus = 'loading';
        state.tablesErrorStatus = false;
      })
      .addCase(getAllTableList.fulfilled, (state, action) => {
        state.tablesStatus = 'idle';
        state.allTableList = action.payload;
        state.tablesError = null;
        state.tablesErrorStatus = false;
      })
      .addCase(getAllTableList.rejected, (state, action) => {
        state.tablesStatus = 'failed';
        state.tablesError = action.error.message ?? 'Login failed';
        state.tablesErrorStatus = true;
      });
  },
});

export default tablesSlice.reducer