import * as types from './../constants/ActionTypes';


// function Random the ID---------------------------
var s4 = () => {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }
    // Create ID random
var generateID = () => {
        return s4() + '-' + s4();
}

var findIndex = (tasks, id) => {
        var result = -1;
        tasks.forEach((task, index) => {
            if(id === task.id) {
                result = index;
            }
        });
        return result;
 }

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	var id = '';
	var index = -1;
	switch(action.type){
		//Show list item----------------------------------------------
		case types.LIST_ALL:
			return state;
		//Insert item----------------------------------------------
		case types.SAVE_TASK:
			var newTask = {
				id: action.task.id,
				name: action.task.name,
				status: action.task.status === true ? true : false
			};
			if(!action.task.id){
 				newTask.id = generateID();
 				state.push(newTask);
			} else {
				index = findIndex(state, newTask.id);
				state[index] = newTask;
			}
			localStorage.setItem('tasks',JSON.stringify(state));
			return [...state]; //copy ra  1 mảng mới và trả về, nên k tham chiếu vào vùng nhớ
		//Update status item----------------------------------------------
		case types.UPDATE_STATUS_TASK:
			id = action.id;
	        index = findIndex(state, id);
	        state[index] = {
	        	...state[index],
	        	status: !state[index].status
	        }
	        console.log(state[index]);
	        
	        localStorage.setItem('tasks',JSON.stringify(state));
			return [...state];
		//----------------------------------------------
		case types.DELETE_TASK:
			console.log(action);
			id = action.id;
			index = findIndex(state, id);
			state.splice(index, 1);
			localStorage.setItem('tasks',JSON.stringify(state));
			return [...state];
		default: return state;
	};
}

export default myReducer;