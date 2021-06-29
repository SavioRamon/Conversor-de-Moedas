import { createStore, combineReducers } from "redux";
import moedasSelecionadas from "./Conversor/Conversor.reducer";

const rootReducer = combineReducers({
    moedasSelecionadas
})

const store = createStore(rootReducer);

export default store;
