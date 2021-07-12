
const convertendo = (valor, valorBase)=>{
    let conversao = "";
    let numero = parseFloat(valor);
	
    if(typeof(numero) === "number" && numero >= 0) {
		conversao = parseFloat(numero * valorBase).toFixed(2).replace(".", ",");
	} 
    
    return conversao;
    
}

const stateInicial = {
    moedaUm: "USD",
    moedaDois: "BRL",
    resultado: "1"
}


export default function(state=stateInicial, action) {
    
    switch(action.type) {

        case "MOEDA":
            return {
                ...state,
                moedaUm: action.payload.moedaUm,
                moedaDois: action.payload.moedaDois
            };

        case "CONVERSAO":
            const resultado = convertendo(action.payload.valor, action.payload.valorBase);
            return {
                ...state,
                resultado
            };
        
        default:
            return state;

    }
}
 