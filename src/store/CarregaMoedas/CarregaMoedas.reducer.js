


export default function(state={}, action) {
    switch(action.type) {
        case "RETORNA_MOEDAS":
            return action.payload

        default:
            return state;
    }
}