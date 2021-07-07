
const convertendo = (valor, valorBase)=>{
    let conversao = "";
    let numero = parseFloat(valor);
	if(typeof(numero) === "number" && numero >= 0) {
		conversao = numero * valorBase;
	}

    conversao = parseFloat(conversao).toFixed(2).replace(".", ",");
    
    return conversao;
    
}

const stateInicial = {
    moedaUm: "USD",
    moedaDois: "BRL",
    resultado: ""
}


export default function(state=stateInicial, action) {
    
    switch(action.type) {

        case "MOEDA":

            return action.payload;
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
 