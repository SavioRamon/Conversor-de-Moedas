
export  function moedas(moedaUm, moedaDois){
    return {
        type: "MOEDA",

        payload: {
            moedaUm,
            moedaDois
        }
    }
}

export function convertendo(valor, valorBase){

    return {
        type: "CONVERSAO",
        payload: {
            valor,
            valorBase
        }
    }
}