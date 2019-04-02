import { createStore } from "redux";
import rotateReducer from "reducers/rotateReducer";

function configureStore(state = { tasks: [] }) {
    return createStore(rotateReducer, state);
}

export default configureStore;