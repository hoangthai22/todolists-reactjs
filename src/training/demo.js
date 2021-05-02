import { createStore } from 'redux';
import { status, sort } from './actions/index'
import myReducer from './reducers/index'
/*
const store = createStore(myReducer);
console.log('DEFAULT: ',store.getState());

// Thực hiện công việc thay đổi state

store.dispatch(status());
console.log('TOGGLE_STATUS: ',store.getState());

// Thwucj hiện công việc sắp xếp từ Z-A

store.dispatch(sort({
	by:'name',
	value: -1
}));
console.log('SORT: ',store.getState());
*/