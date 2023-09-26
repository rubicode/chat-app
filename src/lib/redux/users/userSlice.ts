import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoadUser } from './userAPI';

const initialState = {
  value: [],
  sender: '',
  receiver: '',
  status: 'idle',
};

export const loadUserAsync = createAsyncThunk(
  'users/loadUserAsync',
  async ({ sender }: { sender: string }) => {
    const { data } = await fetchLoadUser(sender);
    return data;
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSender: (state: any, action: PayloadAction<Message>) => {
      state.sender = action.payload;
    },
    setReceiver: (state: any, action: PayloadAction<Message>) => {
      state.receiver = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
  },
});

export const { setSender, setReceiver } = userSlice.actions;

export const selectUsers = (state: any) => state.users.value;
export const selectSender = (state: any) => state.users.sender;
export const selectReceiver = (state: any) => state.users.receiver;

// export const addChat = (content: string) => (dispatch: any, getState: any) => {
//   const _id = Date.now().toString()
//   const message: Message = { _id, content, sender: 'oki', receiver: 'rubi' }
//   dispatch(add(message))
//   dispatch(addChatAsync(message))
// };

export default userSlice.reducer;