import api from "../axios/authApi"

const SET_USERS_LIST = 'SET_USERS_LIST'

const initalState = {
    usersList: []
}


export default function usersReducer(state = initalState, action) {
    switch (action.type) {

        case SET_USERS_LIST:
            return {
                usersList: action.usersList
            }

        default:
            return state
    }
}

export const setUsersList = (usersList) => ({ type: SET_USERS_LIST, usersList })

export const getUsersList = () => async (dispatch) => {
    const response = await api.get('http://localhost:8000/api/users', { withCredentials: true })
    dispatch(setUsersList(response.data))
}
