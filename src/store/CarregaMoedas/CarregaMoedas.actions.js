


export function apiRequest(moedaBase) {
    return {
        type: "ASYNC_RETORNA_MOEDAS",
        payload: {
            moedaBase,
        }
    }
}

