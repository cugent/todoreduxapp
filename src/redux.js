import {
    combineReducers,
    createStore,
} from 'redux';

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
            console.log("UPDATE TASK REDUCER")
            const newStateTasks = [...state.tasks] // clone the array
            for(let i=0;i<newStateTasks.length;i++){
                if(action.payload.id===newStateTasks[i].id){
                    console.log( "inside the forloop",newStateTasks[i])
                    newStateTasks[i].name=action.payload.name;
                    
                }
            }
            console.log("UPDATE TASK REDUCER -- return new object", state)
            return Object.assign({},
                                 state,
                                 {tasks:newStateTasks,nextID:state.nextID})

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

