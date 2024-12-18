import { createStore, compose } from "redux";
import myReducer from "./reducers";

const composeEnhancers =
  (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create the Redux store
const store = createStore(
  myReducer,
  composeEnhancers() // Integrating the DevTools
);

export default store;
