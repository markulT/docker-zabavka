const SET_PASSWORD_TYPE = "SET_PASSWORD"
const SET_TARIFF_TYPE = 'SET_TARIFF'

const initialState = {
    password:'',
    tariff:''
}

export default function payReducer(state = initialState, action) {
    switch (action.type) {

        case SET_TARIFF_TYPE:
            return {
                ...state,
                tariff:action.tariff
            }

        case SET_PASSWORD_TYPE:
            return {
                ...state,
                password: action.password
            }
        default:
            return state
    }
}

export const setPasswordAction = (password) => ({type:SET_PASSWORD_TYPE, password:password})
export const setTariffAction = (tariff) => ({type:SET_TARIFF_TYPE, tariff:tariff})

