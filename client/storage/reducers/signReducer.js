
const SET_TERMS_OF_POLICY = "SET_TERMS_OF_POLICY"

const initialState = {
    raedTermsOfPolicy:false
}
export default function signupReducer(state=initialState, action) {
    switch (action.type) {
        case SET_TERMS_OF_POLICY:
            return {
                ...state,
                raedTermsOfPolicy:action.read
            }
        default:
            return state
    }
}

export const setPolicy = (read) => ({type:SET_TERMS_OF_POLICY, read})
