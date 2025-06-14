// import {createSlice} from '@reduxjs/toolkit';

// const initialState = {
//   type: '',
// };

// const TaskSlice = createSlice({
//   name: 'Task',
//   initialState,
//   reducers: {},
// });

// export const {} = TaskSlice.actions;

// export default TaskSlice.reducer;

// features/tasks/TaskSlice.js
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Thunk inside the same file
export const uploadTasktoDb = createAsyncThunk(
  'Task/uploadTasktoDb',
  async (taskData, {rejectWithValue}) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('User not authenticated');

      const taskRef = firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('tasks');

      const newTask = {
        ...taskData,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      await taskRef.add(newTask);
      return newTask;
    } catch (error) {
      console.error('Upload failed:', error);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  uploading: false,
  error: null,
};

const TaskSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadTasktoDb.pending, state => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadTasktoDb.fulfilled, state => {
        state.uploading = false;
      })
      .addCase(uploadTasktoDb.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

export default TaskSlice.reducer;
