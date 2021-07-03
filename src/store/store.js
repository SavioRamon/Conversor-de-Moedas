import { createStore, combineReducers, applyMiddleware } from "redux";
import moedasSelecionadas from "./Conversor/Conversor.reducer";

import createSagaMiddleware from "redux-saga";
import sagasRoot from "./sagas";

const rootReducer = combineReducers({
    moedasSelecionadas
})

const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(sagasRoot);


export default store;
