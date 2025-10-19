import { configureStore } from '@reduxjs/toolkit';

// Reducers
import AuthReducer from './reducer/AuthReducer';
import TaskReducer from './reducer/TaskReducer';
import ProfileReducer from './reducer/ProfileReducer';

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    TaskReducer: TaskReducer,
    ProfileReducer: ProfileReducer,
  },
});
