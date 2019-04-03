import {
    combineReducers,
    createStore,
} from 'redux';
import update from 'react-addons-update';

export const createTask = (payload) => ({
    type: 'CREATE_TASK',   
    payload                     // <-- action.type
});
export const deleteTask = (id) => ( {
    
    type: 'DELETE_TASK',                        // <-- actigit `on.type
    id                                         // <-- action.idx
});
export const updateTask = (payload) => ({
    type: 'UPDATE_TASK',   
    payload                                        // <-- action.idx
});


export const taskReducer=(state =initialState, action)=>{
    console.log("reducer state",state,action.type);
    switch (action.type) {
        
        case 'CREATE_TASK':
            return Object.assign({},
                                 state,
                                 { tasks:[...state.tasks,action.payload], nextID:state.nextID+1}
                                )

        case 'DELETE_TASK':
            console.log("DELETE TASK state", state);
            return Object.assign({},
                                 state,
                                  {tasks:[...state.tasks.filter(item => item.id !== action.id)],nextID:state.nextID})

        case 'UPDATE_TASK':
           const task= state.tasks.map( task => {
                if (task.id === action.id) {
                    return update(task, { name: {$set: "New Test"}})
                }
                return task;
             })
            

            console.log("UPDATE TASK REDUCER -- return new object", state)
            return Object.assign({},
                                 state,
                                 {tasks:task,nextID:state.nextID})

        default:
            return state;
    }
    

}
const initialState= { 
    tasks: [] ,
    nextID:1
};

//export const reducers = combineReducers({
 //  taskReducer,
//});

export function configureStore(initialState = initialState) { // initialState = initialState | {}
    const store = createStore(taskReducer, initialState);
    return store;
};

export const store = configureStore();

