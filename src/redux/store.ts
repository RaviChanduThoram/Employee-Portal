import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import sidebarReducer from './actions/SidebarSlice'; // Sidebar reducer
import sidebarSaga from './reducers/SidebarReducer'; // Sidebar saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with the saga middleware and reducer
const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,  // Add the sidebar reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Remove thunk and add saga middleware
});

// Run the sidebar saga
sagaMiddleware.run(sidebarSaga);  // Ensure you run the correct saga

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
