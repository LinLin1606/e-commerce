// import { createStore } from "redux";
// import rootReducer from "./reducers";
// import { createStoreHook } from "react-redux";

// const store = createStore(rootReducer)
// export default store;


import { legacy_createStore as createStore } from 'redux';
import rootReducer from "./Reducers/Index";

const store =createStore(rootReducer)


export default store;