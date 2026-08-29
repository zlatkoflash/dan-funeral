import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SocketState {
  isConnected: boolean;
  status: string;
  logs: string[];
}

const initialState: SocketState = {
  isConnected: false,
  status: 'Disconnected',
  logs: [],
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    addLog: (state, action: PayloadAction<string>) => {
      state.logs.push(action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    },
  },
});

export const { setConnected, setStatus, addLog, clearLogs } = socketSlice.actions;
export default socketSlice.reducer;