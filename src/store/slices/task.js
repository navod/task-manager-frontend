import taskService from "@/services/task.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: {},
  loading: false,
  error: null,
  taskStatus: "All",
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params, { rejectWithValue }) => {
    try {
      const response = await taskService.getAllTasks(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTaskStatus: (state, action) => {
      state.taskStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTasks, setTaskStatus } = taskSlice.actions;

export default taskSlice.reducer;
