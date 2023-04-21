import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL as string;

interface TableState {
  tableList: GetTableListResponseData | null,
  allTableList: GetAllTableListResponseData | null;
  faculties: Faculty[];
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

interface GetTableListResponseData {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: [
    {
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
    },

  ];
} 

interface GetTableListFormValues {
  start: Date | string;
  end: Date | string;
}

interface Faculty {
  id: number;
  name: string;
}

const initialState: TableState = {
  tableList: {
    count: 0,
    next: null,
    previous: null,
    results: [{
      id: null,
      owner: null,
      group: null,
      percent: null,
      room: null,
      deputy_dean: null,
      faculty: null,
      course: null,
      para: null,
      subject: null,
      teacher: null,
      department: null,
      sum_student: null,
      absent_student: null,
      description: null,
      description_2: null,
      sport: null,
      exchange: null,
      created_at: null,
      updated_at: null,
      dean: null,
      tutor: null,
    }],
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

export const getTableList = createAsyncThunk<GetTableListResponseData, GetTableListFormValues>(
  'tables/getTableList',
  async (param) => {
    let datetest = JSON.stringify({
      start: param.start,
      finish: param.end,
    });
    const response = await axios.get<GetTableListResponseData>(api_url + "/api/v1/attendance-list/", {params: {limit: 50, date: datetest}});
    return response.data;
  }
);

export const getFaculties = createAsyncThunk<Faculty[]>(
  "tables/getFaculties",
  async () => {
    const response = await axios.get<Faculty[]>(api_url + "/api/v1/faculty-list");
    return response.data;
  }
);

const tablesSlice = createSlice({
  name: 'tables',
  initialState,
  reducers: {
    setErrorAction: (state, action) => {
      state.tablesErrorStatus = action.payload;
    },
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
      })
      .addCase(getTableList.pending, (state) => {
        state.tablesStatus = 'loading';
        state.tablesErrorStatus = false;
      })
      .addCase(getTableList.fulfilled, (state, action) => {
        state.tablesStatus = 'idle';
        state.tableList = action.payload;
        state.tablesError = null;
        state.tablesErrorStatus = false;
      })
      .addCase(getTableList.rejected, (state, action) => {
        state.tablesStatus = 'failed';
        state.tablesError = action.error.message ?? 'Login failed';
        state.tablesErrorStatus = true;
      })
      .addCase(getFaculties.pending, (state) => {
        state.tablesStatus = "loading";
      })
      .addCase(getFaculties.fulfilled, (state, action) => {
        state.tablesStatus = "idle";
        state.faculties = action.payload;
      })
      .addCase(getFaculties.rejected, (state, action) => {
        state.tablesStatus = "failed";
        state.tablesError = action.error.message ?? "Something went wrong";
        state.tablesErrorStatus = true;
      });
  },
});
export default tablesSlice.reducer
