// import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';

// // Thunk inside the same file
// export const uploadTasktoDb = createAsyncThunk(
//   'Task/uploadTasktoDb',
//   async (taskData, {rejectWithValue}) => {
//     try {
//       const currentUser = auth().currentUser;
//       if (!currentUser) throw new Error('User not authenticated');

//       const taskRef = firestore()
//         .collection('users')
//         .doc(currentUser.uid)
//         .collection('tasks');

//       const newTask = {
//         ...taskData,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       };

//       await taskRef.add(newTask);
//       return newTask;
//     } catch (error) {
//       console.error('Upload failed:', error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

// const initialState = {
//   uploading: false,
//   error: null,

// };

// const TaskSlice = createSlice({
//   name: 'Task',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(uploadTasktoDb.pending, state => {
//         state.uploading = true;
//         state.error = null;
//       })
//       .addCase(uploadTasktoDb.fulfilled, state => {
//         state.uploading = false;

//       })
//       .addCase(uploadTasktoDb.rejected, (state, action) => {
//         state.uploading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default TaskSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// Thunk to upload task
export const uploadTasktoDb = createAsyncThunk(
  'Task/uploadTasktoDb',
  async (taskData, { rejectWithValue }) => {
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
export const getTaskList = createAsyncThunk(
  'Task/getTaskList',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) throw new Error('User not authenticated');

      const snapshot = await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .collection('tasks')
        .orderBy('createdAt', 'desc') // optional: sort latest first
        .get();

      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('the task is redux thunk is ::' + JSON.stringify(tasks));
      return tasks;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  taskList: [],
  loading: false,
  uploading: false,
  success: false,
  error: null,
};

const TaskSlice = createSlice({
  name: 'Task',
  initialState,
  reducers: {
    resetTaskStatus: state => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadTasktoDb.pending, state => {
        state.uploading = true;
        state.success = false; // reset success on new request
        state.error = null;
      })
      .addCase(uploadTasktoDb.fulfilled, state => {
        state.uploading = false;
        state.success = true; // set success on fulfillment
      })
      .addCase(uploadTasktoDb.rejected, (state, action) => {
        state.uploading = false;
        state.success = false;
        state.error = action.payload;
      })
      .addCase(getTaskList.fulfilled, (state, action) => {
        state.loading = false;
        state.taskList = action.payload;
        state.success = true; // set success on fulfillment
      });
  },
});

export const { resetTaskStatus } = TaskSlice.actions;
export const selectUploadSuccess = state => state.TaskReducer.success;
export const selectTaskList = state => state.TaskReducer.taskList;

export default TaskSlice.reducer;
