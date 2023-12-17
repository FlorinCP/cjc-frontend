import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:8080/cjc/api/v1";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async () => {
    const response = await fetch("/api/questions");
    const data = await response.json();
    return data;
  },
);

export const getQuestionsByStatus = createAsyncThunk(
  "questions/getQuestionsByStatus ",
  async (status, { rejectWithValue }) => {
    try {
      const queryParams = { status: `${status}` };
      const queryString = new URLSearchParams(queryParams).toString();

      const response = await fetch(
        `${BASE_URL}/question/all-by-status?${queryString}`,
      );

      if (!response.ok) {
        console.error("Error loading questions:", response.statusText);
        return rejectWithValue(response.statusText);
      }

      const responseData = await response.json();
      console.log("Questions loaded successfully:", responseData);
      return responseData;
    } catch (error) {
      console.error("Error loading questions:", error);
      return rejectWithValue(error.message);
    }
  },
);

export const addQuestion = createAsyncThunk(
  "questions/addQuestion",
  async (question) => {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });
    const data = await response.json();
    return data;
  },
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers must be pure functions without side effects. Retrieving data doesn't change the state; it's a read operation, not a write operation.
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    [fetchQuestions.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getQuestionsByStatus.pending]: (state) => {
      state.loading = true;
    },
    [getQuestionsByStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    [getQuestionsByStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
    },
  },
});

export default questionsSlice.reducer;
