import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const URL = process.env.REACT_APP_URL;


export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async ({bearerToken}) => {
    const response = await fetch(`${URL}/question/all`,{
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    });
    const data = await response.json();
    return data;
  },
);

export const getQuestionsByUserAndStatus = createAsyncThunk(
  "questions/getQuestionsByUser",
  async ({ email, status,bearerToken }, { rejectWithValue }) => {
    try {

      const response = await fetch(
          `${URL}/question/allByEmailAndStatus?email=${encodeURIComponent(email)}&status=${encodeURIComponent(status)}`,{
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
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

export const getQuestionsByStatus = createAsyncThunk(
  "questions/getQuestionsByStatus",
  async ({status, bearerToken}, { rejectWithValue }) => {
    try {
      const queryParams = { status: `${status}` };
      const queryString = new URLSearchParams(queryParams).toString();


      const response = await fetch(
        `${URL}/question/all-by-status?${queryString}`,{
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
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

export const getRepliesByQuestionId = createAsyncThunk(
  "questions/getRepliesByQuestionId",
  async ({questionId, bearerToken}, { rejectWithValue }) => {
    try {
      const queryParams = { questionId: `${questionId}` };
      const queryString = new URLSearchParams(queryParams).toString();

      console.log(queryString)

      const response = await fetch(
        `${URL}/reply/get-replies-by-question-id?${queryString}`,{
            headers: {
              'Authorization': `Bearer ${bearerToken}`,
            },
          }
      );

      if (!response.ok) {
        console.error("Error loading replies:", response.statusText);
        return rejectWithValue(response.statusText);
      }

      const responseData = await response.json();
      console.log("Replies loaded successfully:", responseData);
      return { data: responseData, questionId: questionId };
    } catch (error) {
      console.error("Error loading replies:", error);
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
    updateQuestionStatus: (state, action) => {
      const { questionId, status } = action.payload;
      console.log(state)
      console.log(state.questions)
      const index = state.questions.findIndex(
        (question) => question.id === questionId,
      );

      if (index !== -1) {
        state.questions[index].status = status;
      }
    },
    // unusable since replies have to many backend dependencies
    updateQuestionReplies: (state, action) => {
      console.log(action.payload);
      const { questionId, reply } = action.payload;
      const index = state.questions.findIndex(
        (question) => question.id === questionId,
      );

      if (index !== -1) {
        state.questions[index].replies.push(reply);
      }
    },
  },
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.loading = true;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      console.log(state.questions)
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
    // ----------------------------
    [getQuestionsByUserAndStatus.pending]: (state) => {
      state.loading = true;
    },
    [getQuestionsByUserAndStatus.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getQuestionsByUserAndStatus.fulfilled]: (state, action) => {
      state.loading = false;
      state.questions = action.payload;
    },
    // ----------------------------
    [addQuestion.fulfilled]: (state, action) => {
      state.questions.push(action.payload);
    },
    [getRepliesByQuestionId.pending]: (state) => {
      state.loading = true;
    },
    [getRepliesByQuestionId.fulfilled]: (state, action) => {
      state.loading = false;
      const { data, questionId } = action.payload;
      const index = state.questions.findIndex(
        (question) => question.id === questionId,
      );
      if (index !== -1) {
        state.questions[index].replies = data;
      }
    },
    [getRepliesByQuestionId.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { updateQuestionStatus, updateQuestionReplies } =
  questionsSlice.actions;

export default questionsSlice.reducer;
