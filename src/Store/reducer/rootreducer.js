// ** Redux Imports
import { combineReducers } from "redux";
import cardreducer from "./cardreducer";

// ** Reducers Import **//

const rootReducer = combineReducers({
    // taxReducer,
    cardreducer
});

export default rootReducer;
