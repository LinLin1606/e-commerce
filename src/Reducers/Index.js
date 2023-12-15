//root reducers
import { combineReducers } from "redux";
import wishlistReducer from "./Wishlist";

const rootReducer = combineReducers({
    wishlist: wishlistReducer
})
export default rootReducer