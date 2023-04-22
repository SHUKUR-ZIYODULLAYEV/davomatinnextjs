import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const hemis_url = process.env.NEXT_PUBLIC_HEMIS_API_URL as string;

interface HemisState {
  hemisTablesStatus: 'idle' | 'loading' | 'failed';
  hemisTablesError: string | null;
  hemisErrorStatus: boolean;
  hemisDepartments: HemisDepartment[] | null;
  hemisFaculties: HemisFaculties[] | null;
  hemisTeachers: {
    items: string[] | null;
    pagination: {
      totalCount: boolean;
    }
  };
  hemisSchedule: string[] | null;
  hemisSubject_loading: boolean;
  hemisSubjects: {
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

interface HemisDepartment {
  items: string[] | null;
}

interface HemisDepartmentParam{
  faculty_id: number | null;
}

const initialState: HemisState = {
  hemisTablesStatus: 'idle',
  hemisTablesError: null,
  hemisErrorStatus: false,
  hemisDepartments: [],
  hemisFaculties: [],
  hemisTeachers: {
    items: [],
    pagination: {
      totalCount: true,
    },
  },
  hemisSchedule: [],
  hemisSubject_loading: false,
  hemisSubjects: {
    items: [],
    pagination: {
      pageCount: 0,
      page: 0,
    },
  },
};

export const GetHemisFaculties = createAsyncThunk<HemisFaculties[]>( 'hemis/GetHemisFaculties', async () => {
    const response = await axios.get<HemisFaculties[]>(hemis_url + '/v1/data/department-list', {
      headers: {
        Authorization: `Bearer LnbuIBG8t2MWj_q9EYEzLwiZWYcmscSa`,
      },
      params: {
        _structure_type: 11,
      },
    });
    return response.data;
  }
);

export const GetHemisDepartment = createAsyncThunk<HemisDepartment[], HemisDepartmentParam>( 'hemis/GetHemisDepartment', async (param) => {
  const response = await axios.get<HemisDepartment[]>(hemis_url + '/v1/data/department-list', {
    headers: {
      Authorization: `Bearer LnbuIBG8t2MWj_q9EYEzLwiZWYcmscSa`,
    },
    params: {
      _structure_type: 12,
      limit: 100,
      parent: param?.faculty_id
    },
  });
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
      state.hemisErrorStatus = true;
    })
    builder.addCase(GetHemisDepartment.pending, (state) => {
      state.hemisTablesStatus = 'loading';
    });
    builder.addCase(GetHemisDepartment.fulfilled, (state, action) => {
      state.hemisTablesStatus = 'idle';
      state.hemisDepartments = action.payload;
    });
    builder.addCase(GetHemisDepartment.rejected, (state, action) => {
      state.hemisTablesStatus = 'failed';
      state.hemisTablesError = action.error.message ?? "Something went wrong";
      state.hemisErrorStatus = true;
    });
  },
});

export default hemisTableSlice.reducer;
