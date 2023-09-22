import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAddChat, fetchLoadChat } from './chatAPI';

const initialState = {
  value: [],
  status: 'idle',
};

export const loadChatAsync = createAsyncThunk(
  'chats/loadChatAsync',
  async ({ sender, receiver }: { sender: string, receiver: string }) => {
    const { data } = await fetchLoadChat(sender, receiver);
    return data;
  }
);

export const addChatAsync = createAsyncThunk(
  'chats/addChatAsync',
  async (message: Message) => {
    const { data } = await fetchAddChat(message)
    return data
  }
)

export const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    add: (state: any, action: PayloadAction<Message>) => {
      state.value.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadChatAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadChatAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const { add } = chatSlice.actions;

export const selectChats = (state: any) => state.chats.value;

export const addChat = (message: Message) => (dispatch: any, getState: any) => {
  dispatch(add(message))
};

export default chatSlice;