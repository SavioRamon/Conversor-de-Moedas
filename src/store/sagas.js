import { takeEvery, all, put, call } from "redux-saga/effects";

function getData() {

    let data = new Date();

	let dia = data.getDate();
	let diasPassados = dia - 6;
	let mes = data.getMonth()+1;
	let ano = data.getFullYear();

	if(dia < 10) {
		dia = `0${dia}`
	}
        
	if(mes < 10) {
		mes = `0${mes}`
	}

    return {
        dia,
        diasPassados,
        mes,
        ano
    }
}

function getApiMoedas(moedaBase) {
    const {dia, diasPassados, mes, ano} = getData();
		
    const requisicaoTodaMoeda = `https://api.exchangerate.host/timeseries?start_date=
    ${ano}-${mes}-${diasPassados}&end_date=
    ${ano}-${mes}-${dia}&symbols=USD,BRL,EUR,GBP,JPY,AUD,CHF,CAD,RMB,ARS,TRL&base=${moedaBase}`;
    
    return new Promise((resolve, reject)=>{
        let request = new XMLHttpRequest();
        request.open('GET', requisicaoTodaMoeda);
        request.responseType = 'json';
        request.send();
                        
        request.onload = ()=>{
            const response = request.response;
            resolve(response);
        }
    })
    
    
}

function* carregaDados(action){

    const resposta = yield call(getApiMoedas, action.payload.moedaBase);

    yield put({
        type: "RETORNA_MOEDAS",
        payload: {
            resposta
        }
    });
}

export default function* root (){
    yield all([
        takeEvery("ASYNC_RETORNA_MOEDAS", carregaDados)
    ]);
}
