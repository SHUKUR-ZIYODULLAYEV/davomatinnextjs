import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const hemis_url = process.env.NEXT_PUBLIC_HEMIS_API_URL as string;

interface HemisState {
  hemisTablesStatus: 'idle' | 'loading' | 'failed';
  hemisTablesError: string | null;
  hemisErrorStatus: boolean;
  hemisDepartments: HemisDepartment[] | null;
  hemisFaculties: HemisFaculties[] | null;
  hemisTeachers: HemisTeachers[] | null;
  hemisSchedule: HemisSchedule[] | null;
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

interface HemisTeachersParam {
  department_id: number | null;
  search: string | null;
}

interface HemisTeachers {
  items: string[] | null;
  pagination: object | null;
}

interface HemisSchedule {
  items: string[] | null;
  pagination: object | null;
}

const initialState: HemisState = {
  hemisTablesStatus: 'idle',
  hemisTablesError: null,
  hemisErrorStatus: false,
  hemisDepartments: [],
  hemisFaculties: [],
  hemisTeachers: [],
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

export const GetHemisTeachers = createAsyncThunk<HemisTeachers[], HemisTeachersParam>( 'hemis/GetHemisTeachers', async (param) => {
  const response = await axios.get<HemisTeachers[]>(hemis_url + '/v1/data/employee-list', {
    headers: {
      Authorization: `Bearer LnbuIBG8t2MWj_q9EYEzLwiZWYcmscSa`,
    },
    params: {
      type: "teacher",
      limit: 200,
      _department: param.department_id,
      search: param.search,
    },
  });
  return response.data;
}
);

export const GetHemisSchedule = createAsyncThunk<HemisSchedule[]>( 'hemis/GetHemisSchedule', async (param) => {
  const response = await axios.get<HemisSchedule[]>(hemis_url + '/v1/data/schedule-list', {
    headers: {
      Authorization: `Bearer LnbuIBG8t2MWj_q9EYEzLwiZWYcmscSa`,
    },
    params: {
      _education_year: 2022,
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
    })
    builder.addCase(GetHemisTeachers.pending, (state) => {
      state.hemisTablesStatus = 'loading';
    });
    builder.addCase(GetHemisTeachers.fulfilled, (state, action) => {
      state.hemisTablesStatus = 'idle';
      state.hemisTeachers = action.payload;
    });
    builder.addCase(GetHemisTeachers.rejected, (state, action) => {
      state.hemisTablesStatus = 'failed';
      state.hemisTablesError = action.error.message ?? "Something went wrong";
      state.hemisErrorStatus = true;
    })
    builder.addCase(GetHemisSchedule.pending, (state) => {
      state.hemisTablesStatus = 'loading';
    });
    builder.addCase(GetHemisSchedule.fulfilled, (state, action) => {
      state.hemisTablesStatus = 'idle';
      state.hemisSchedule = action.payload;
    });
    builder.addCase(GetHemisSchedule.rejected, (state, action) => {
      state.hemisTablesStatus = 'failed';
      state.hemisTablesError = action.error.message ?? "Something went wrong";
      state.hemisErrorStatus = true;
    });
  },
});

export default hemisTableSlice.reducer;
