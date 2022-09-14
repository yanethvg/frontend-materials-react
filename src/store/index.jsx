import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducers from "../reducers";
import { authenticate, isAuthenticated } from "./localStorage";

const middleware = [thunk];

// verification auth
const storageAuth = isAuthenticated();

const store = createStore(
  rootReducers,
  storageAuth,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  authenticate({
    auth: store.getState().auth,
  });
});

export default store;