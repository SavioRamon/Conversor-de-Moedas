


export function Api(moedaBase) {
    return {
        type: "ASYNC_RETORNA_MOEDAS",
        payload: {
            moedaBase,
        }
    }
}

