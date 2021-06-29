
export  function moedas(moedaUm, moedaDois){
    return {
        type: "MOEDA",

        payload: {
            moedaUm,
            moedaDois
        }
    }
}
