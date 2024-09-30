import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the structure of the menu item and the sidebar state
interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface SidebarState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

// Initial state for the sidebar
const initialState: SidebarState = {
  items: [],
  loading: false,
  error: null,
};

// Create the slice using Redux Toolkit’s createSlice method
const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    // Action to trigger fetching menu items via saga
    fetchMenuItemsRequest: (state) => {
      state.loading = true;
    },
    // Action to handle success in fetching data
    fetchMenuItemsSuccess: (state, action: PayloadAction<MenuItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    // Action to handle failure in fetching data
    fetchMenuItemsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export the actions for dispatching
export const { fetchMenuItemsRequest, fetchMenuItemsSuccess, fetchMenuItemsFailure } = sidebarSlice.actions;

// Export the reducer as the default export
export default sidebarSlice.reducer;
