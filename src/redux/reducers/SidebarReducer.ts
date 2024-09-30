import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchMenuItemsRequest, fetchMenuItemsSuccess, fetchMenuItemsFailure } from '../actions/SidebarSlice';

// Define the structure of the menu item
interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

// Define the structure of the role-based menu (admin, employee, etc.)
interface RoleBasedMenu {
  role: string;
  items: MenuItem[];
}

// Modify the structure of the API response to match what you received
type ApiResponse = RoleBasedMenu[];

// Worker saga: will be fired on fetchMenuItemsRequest actions
function* fetchMenuItems() {
  try {
    // API call to fetch menu items
    console.log("Attempting to fetch menu items...");
    
    // Expecting an array as response data, so change the typing
    const response: { data: ApiResponse } = yield call(axios.get, 'http://localhost:3001/menuItems');
    
    // Log the API response to verify structure
    console.log("API response:", response);
    
    // Find the menu items for the 'employee' role
    const employeeMenu = response.data.find((menu) => menu.role === 'employee');

    // Log the employee menu to check if it's correctly found
    console.log("Employee menu:", employeeMenu);

    // If employeeMenu exists and has items, dispatch them
    if (employeeMenu && employeeMenu.items) {
      console.log("Dispatching employee menu items:", employeeMenu.items);
      yield put(fetchMenuItemsSuccess(employeeMenu.items));
    } else {
      console.log("No menu items found for employee role");
      yield put(fetchMenuItemsFailure('No menu items found for employee role'));
    }

  } catch (error) {
    // Handle the error case properly
    console.error("Error occurred:", error);
    if (error instanceof Error) {
      yield put(fetchMenuItemsFailure(error.message)); // Dispatch failure action with error message
    } else {
      yield put(fetchMenuItemsFailure('An unknown error occurred')); // Handle unknown error
    }
  }
}

// Watcher saga: spawns a new fetchMenuItems task on each fetchMenuItemsRequest
function* sidebarSaga() {
  yield takeLatest(fetchMenuItemsRequest.type, fetchMenuItems);  // Watching for the action
}

export default sidebarSaga;
