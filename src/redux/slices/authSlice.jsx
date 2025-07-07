import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import authService from "../../services/auth.service";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const res = await authService.login(username, password);

      const data = res?.data?.data;

      let role = null;
      if (data.accessToken) {
        try {
          const decodedToken = jwtDecode(data.accessToken);
          role =
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];
        } catch (error) {
          console.error("Invalid token format", error);
        }
      }

      return {
        customer: data.customer,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        role: role,
        status: res.status,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.detail || error.message
      );
    }
  }
);

const initialState = {
  user: null,
  tokens: null,
  role: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    updateTokens: (state, action) => {
      state.tokens = {
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.customer;
        state.role = action.payload.role;
        state.tokens = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
        state.user = null;
        state.tokens = null;
        state.role = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset, updateUser, updateTokens, logout } = authSlice.actions;

export default authSlice.reducer;
