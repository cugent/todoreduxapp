import {
    combineReducers,
    createStore,
} from 'redux';

export const createTask = (payload) => ({
    type: 'CREATE_TASK',   
    payload                     // <-- action.type
});
export const deleteTask = (id) => ({
    type: 'DELETE_TASK',                        // <-- actigit `on.type
    id                                         // <-- action.idx
});
export const updateTask = (id) => ({
    type: 'UPDATE_TASK',                        // <-- actigit `on.type
    id                                         // <-- action.idx
});


export const taskReducer=(state =initialState, action)=>{
    console.log("reducer state",state);
    switch (action.type) {
        
        case 'CREATE_TASK':
        console.log("action",action.payload);
        console.log("actiontype",action.type);

            return Object.assign({},
                                 state,
                                 { tasks:[...state.tasks,action.payload],
                                   nextID:state.nextID++}
                                )

        case 'DELETE_TASK':
            return Object.assign({},
                                 state,
                                  {tasks:[
                                          state.tasks.slice(action.index,1)]})

        case 'UPDATE_TASK':
            
            return Object.assign({},
                                 state,
                                 {task:[...state.tasks[action.id],action.payload]})

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

