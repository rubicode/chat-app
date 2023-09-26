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
    const data = await fetchAddChat(message)
    return { _id: message._id, chat: data.chat }
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
      })
      .addCase(addChatAsync.fulfilled, (state: any, action) => {
        state.status = 'idle';
        state.value = state.value.map((item: any) => {
          if (action.payload._id === item._id) {
            item._id = action.payload.chat._id
            return item
          }
          return item
        })
      });
  },
});

export const { add } = chatSlice.actions;

export const selectChats = (state: any) => state.chats.value;

export const addChat = (content: string) => (dispatch: any, getState: any) => {
  const _id = Date.now().toString()
  const message: Message = { _id, content, sender: getState().users.sender, receiver: getState().users.receiver }
  dispatch(add(message))
  dispatch(addChatAsync(message))
};

export default chatSlice.reducer;