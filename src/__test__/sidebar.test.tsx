import { expectSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import { fetchMenuItemsSuccess, fetchMenuItemsFailure, fetchMenuItemsRequest } from '../redux/actions/SidebarSlice';
import sidebarSaga from '../redux/reducers/SidebarReducer';
import { call, put } from 'redux-saga/effects';

jest.mock('axios');

describe('sidebarSaga', () => {
    it('should dispatch fetchMenuItemsSuccess on successful API call', () => {
        const mockedMenuItems = [
            {
                role: 'employee',
                items: [
                    { name: 'Dashboard', icon: 'Dashboard', path: '/dashboard' },
                    { name: 'Attendance', icon: 'CheckCircle', path: '/attendance' },
                ],
            },
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockedMenuItems });

        return expectSaga(sidebarSaga)
            .put(fetchMenuItemsSuccess(mockedMenuItems[0].items))
            .dispatch(fetchMenuItemsRequest())
            .run();
    });

    it('should dispatch fetchMenuItemsFailure on failed API call', () => {
        (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        return expectSaga(sidebarSaga)
            .put(fetchMenuItemsFailure('Network error'))
            .dispatch(fetchMenuItemsRequest())
            .run();
    });

    it('should dispatch fetchMenuItemsFailure when no items found for employee role', () => {
        const mockedMenuItems = [
            {
                role: 'admin',
                items: [],
            },
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockedMenuItems });

        return expectSaga(sidebarSaga)
            .put(fetchMenuItemsFailure('No menu items found for employee role'))
            .dispatch(fetchMenuItemsRequest())
            .run();
    });
});
