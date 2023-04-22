import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const hemis_url = process.env.NEXT_PUBLIC_HEMIS_API_URL as string;

interface HemisState {
  hemisTablesStatus: 'idle' | 'loading' | 'failed';
  hemisTablesError: string | null;
  tablesErrorStatus: boolean;
  departments: string[] | null;
  hemisFaculties: HemisFaculties[] | null;
  teachers: {
    items: string[] | null;
    pagination: {
      totalCount: boolean;
    }
  };
  schedule: string[] | null;
  subject_loading: boolean;
  subjects: {
    items: string[] | null;
    pagination: {
      pageCount: number;
      page: number;
    }
  };
}

interface HemisFaculties {
  items: string[] | null;
  pagination: string[] | null;
}

const initialState: HemisState = {
  hemisTablesStatus: 'idle',
  hemisTablesError: null,
  tablesErrorStatus: false,
  departments: [],
  hemisFaculties: [],
  teachers: {
    items: [],
    pagination: {
      totalCount: true,
    },
  },
  schedule: [],
  subject_loading: false,
  subjects: {
    items: [],
    pagination: {
      pageCount: 0,
      page: 0,
    },
  },
};

export const GetHemisFaculties = createAsyncThunk<HemisFaculties[]>(
  'tables/GetHemisFaculties',
  async () => {
    const response = await axios.get<HemisFaculties[]>(hemis_url + '/v1/data/department-list', {
      headers: {
        Authorization: `Bearer LnbuIBG8t2MWj_q9EYEzLwiZWYcmscSa`,
      },
      params: {
        _structure_type: 11,
      },
    });
    console.log("response.data", response.data);
    
    return response.data;
  }
);

const hemisTableSlice = createSlice({
  name: 'hemisTable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetHemisFaculties.pending, (state) => {
      state.hemisTablesStatus = 'loading';
    });
    builder.addCase(GetHemisFaculties.fulfilled, (state, action) => {
      state.hemisTablesStatus = 'idle';
      state.hemisFaculties = action.payload;
    });
    builder.addCase(GetHemisFaculties.rejected, (state, action) => {
      state.hemisTablesStatus = 'failed';
      state.hemisTablesError = action.error.message ?? "Something went wrong";
      state.tablesErrorStatus = true;
    });
  },
});

export default hemisTableSlice.reducer;
