import { createStore, combineReducers, applyMiddleware } from "redux";
import moedasSelecionadas from "./Conversor/Conversor.reducer";
import carregaMoedas from "./CarregaMoedas/CarregaMoedas.reducer";

import createSagaMiddleware from "redux-saga";
import sagasRoot from "./sagas";

const rootReducer = combineReducers({
    moedasSelecionadas,
    carregaMoedas
})

const sagaMiddleware = createSagaMiddleware();


const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));


sagaMiddleware.run(sagasRoot);


export default store;
