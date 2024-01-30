import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../store';

import type { PayloadAction } from '@reduxjs/toolkit';

import { $api } from '@/api';

export type TStateError = {
  status: boolean;
  text: string | null;
};

export interface ICurrency {
  id: string;
  name: string;
  min_size: string;
}

export interface IData {
  data: ICurrency[];
}

export interface IState {
  loading: boolean;
  error: TStateError;
  result: ICurrency[] | null;
}

const initialState: IState = {
  loading: false,
  error: { status: false, text: null },
  result: null,
};

export const fetchСurrencies = createAsyncThunk(
  'currencies/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $api.get<IData>('/currencies');

      return data.data;
    } catch (error) {
      const { message } = error as AxiosError;
      return rejectWithValue(message);
    }
  },
);

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    resetThunk: (state) => {
      state.loading = false;
      state.error = { status: false, text: null };
      state.result = null;
    },
    setThunkLoading: (state) => {
      state.loading = true;
      state.error = { status: false, text: null };
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchСurrencies.pending, (state) => {
      currenciesSlice.caseReducers.setThunkLoading(state);
    });
    builder.addCase(
      fetchСurrencies.fulfilled,
      (state, action: PayloadAction<ICurrency[] | null>) => {
        state.loading = false;
        state.result = action.payload;
      },
    );
    builder.addCase(fetchСurrencies.rejected, (state, action) => {
      state.loading = false;
      state.error = { status: true, text: action.error.message || null };
    });
  },
});

// Action creators are generated for each case reducer function
export const { setThunkLoading } = currenciesSlice.actions;

// Reducer
export default currenciesSlice.reducer;

// Selector
export const currenciesSelector = (state: RootState) => state.currenciesReducer;
