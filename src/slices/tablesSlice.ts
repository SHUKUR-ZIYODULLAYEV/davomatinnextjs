import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api_url = process.env.NEXT_PUBLIC_API_URL as string;

interface TableState {
  tableList: GetTableListResponseData | null,
  allTableList: GetAllTableListResponseData | null;
  faculties: Faculty[];
  groups: Group[];
  rooms: Rooms[];
  tutors: Tutor[];
  deputies: DeputyDean[];
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

interface Group {
  id: number;
  name: string;
}

interface GetGroupsParam {
  faculty_id: number;
}

interface Rooms {
  id: number;
  title: string;
  building: string;
  floor: string;
  room_type: string;
  room_size: number;
}

interface GetRoomsParam {
  building: string;
  room_type: string;
  floor: string;
}

interface SubTutor {
  id: number;
  title: string;
}

interface Tutor {
  id: number;
  group: SubTutor[];
  name: string;
}

interface SubDeputyDean {
  id: number;
  title: string;
}

interface DeputyDean {
  id: number;
  group: SubDeputyDean[];
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

export const getGroups = createAsyncThunk<Group[], GetGroupsParam>(
  "tables/getGroups",
  async (params) => {
    const response = await axios.get<Group[]>(api_url + "/api/v1/group-list", {
      params: {
        faculty_id: params?.faculty_id
      },
    });
    return response.data;
  }
);

export const GetRooms = createAsyncThunk<Rooms[], GetRoomsParam>(
  "tables/GetRooms",
  async (param) => {
    const response = await axios.get<Rooms[]>(api_url + "/api/v1/unvroom-list", {
      params: {
        building: param?.building,
        room_type: param?.room_type,
        floor: param?.floor,
      },
    });
    return response.data;
  }
);

export const GetTutors = createAsyncThunk<Tutor[]>(
  "tables/GetTutors",
  async () => {
    const response = await axios.get<Tutor[]>(api_url + "/api/v1/tutor-list/");
    return response.data;
  }
);

export const GetDeputyDean = createAsyncThunk<DeputyDean[]>(
  "tables/GetDeputyDean",
  async () => {
    const response = await axios.get<DeputyDean[]>(api_url + "/api/v1/deputy-dean-list/");
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
      })
      .addCase(getGroups.pending, (state) => {
        state.tablesStatus = "loading";
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.tablesStatus = "idle";
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.tablesStatus = "failed";
        state.tablesError = action.error.message ?? "Something went wrong";
        state.tablesErrorStatus = true;
      }) 
      .addCase(GetRooms.pending, (state) => {
        state.tablesStatus = "loading";
      })
      .addCase(GetRooms.fulfilled, (state, action) => {
        state.tablesStatus = "idle";
        state.rooms = action.payload;
      })
      .addCase(GetRooms.rejected, (state, action) => {
        state.tablesStatus = "failed";
        state.tablesError = action.error.message ?? "Something went wrong";
        state.tablesErrorStatus = true;
      })
      .addCase(GetTutors.pending, (state) => {
        state.tablesStatus = "loading";
      })
      .addCase(GetTutors.fulfilled, (state, action) => {
        state.tablesStatus = "idle";
        state.tutors = action.payload;
      })
      .addCase(GetTutors.rejected, (state, action) => {
        state.tablesStatus = "failed";
        state.tablesError = action.error.message ?? "Something went wrong";
        state.tablesErrorStatus = true;
      })
      .addCase(GetDeputyDean.pending, (state) => {
        state.tablesStatus = "loading";
      })
      .addCase(GetDeputyDean.fulfilled, (state, action) => {
        state.tablesStatus = "idle";
        state.deputies = action.payload;
      })
      .addCase(GetDeputyDean.rejected, (state, action) => {
        state.tablesStatus = "failed";
        state.tablesError = action.error.message ?? "Something went wrong";
        state.tablesErrorStatus = true;
      });
  },
});
export default tablesSlice.reducer
