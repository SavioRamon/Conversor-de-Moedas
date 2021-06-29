

const stateInicial = {
    moedaUm: "USD",
    moedaDois: "BRL"
}


export default function(state=stateInicial, action) {
    
    switch(action.type) {

        case "MOEDA":
            return action.payload;

        default:
            return state;

    }
}
 