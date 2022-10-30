import * as axios from "axios"
import api from "../axios/authApi"
import {getCookie} from 'cookies-next'
import Router from "next/router";

const setUserType = 'SET_USER'
const setGuestType = 'SET_GUEST'
const setMac = "SET_MAC"
const setFullProfileType = 'SET_FULL_PROFILE'

const instance = axios.create({
    baseUrl: `http://localhost:8000/api`,
    withCredentials: true
})

const initialState = {
    login: '',
    full_name: '',
    phone: '',
    account_number: '',
    tariff_plan: '0',
    tariff_expired_date: null,
    tariff_instead_expired: null,
    stb_sn: '',
    stb_mac: '',
    stb_type: '',
    status: 0,
    online: '',
    ip: '',
    version: '',
    comment: null,
    end_date: '',
    account_balance: '',
    last_active: '',
    subscribed: [],
    subscribed_id: [],
    mobileSubLevel:0,
    mobileSubOrderId:''
}
// const initialState = {
//     login: '',
//     accessToken: '',
//     refreshToken: ''
// }
export default function authReducer(state = initialState, action) {
    switch (action.type) {

        case setUserType:
            return {
                ...action.user
            }
        case setGuestType:
            console.log(action.guest.mobileSubLevel, 'йди нахуй')
            return {
                ...state,
                login: action.guest.login,
                full_name: action.guest.fullName,
                mobileSubLevel: action.guest.mobileSubLevel,
                mobileSubOrderId: action.guest.mobileSubOrderId
            }
        case setFullProfileType:
            console.log(action.profile.results)
            return {
                ...action.profile.results,
                login: state.login,
                full_name: state.full_name
            }
        case setMac:
            return {
                ...state,
                stb_mac: action.mac
            }
        // return {
        //     accessToken: action.user.accessToken,
        //     refreshToken: action.user.refreshToken,
        //     login: action.user.login
        // }

        default:
            return state
    }
}

const setUserAction = (user) => ({type: setUserType, user})
const setGuestAction = (guest) => ({type: setGuestType, guest})
const setMacAction = (mac) => ({type: setMac, mac})
const setFullProfile = (profile) => ({type: setFullProfileType, profile})

// export const getUser = (userLogin) => async (dispatch) => {
//     const response = await api.get(`http://a7777.top:80/stalker_portal/api/v1/users/${userLogin}`)
//     dispatch(response)
//     console.log(response.data.results);
// }
export const changeMac = (login, newMac) => async (dispatch) => {
    const response = await api.post(`http://localhost:8000/ministra/changeMacAddress`, {
        login: login,
        newMac: newMac
    }, {withCredentials: true})
    console.log(response)
    setMacAction(newMac)
}

export const register = (login, password, fullName, email, phone, address) => async (dispatch) => {
    const response = await axios.post(`http://localhost:8000/api/registration`, {
        login: login,
        password: password,
        fullName: fullName,
        email: email,
        phone: phone,
        address: address
    }, {withCredentials: true})
    localStorage.setItem('token', response.data.userData.accessToken)
    const guest = response.data.userData.user
    dispatch(setGuestAction(guest))
}

export const login = (login, password) => async (dispatch) => {
    const response = await axios.post(`http://localhost:8000/api/login`, {
        login: login,
        password: password
    }, {withCredentials: true})

    localStorage.setItem('token', response.data.userData.accessToken)

    const user = JSON.parse(response.data.userData.fullProfile)
    const guest = response.data.userData.user
    if (user.results == null) {
        dispatch(setGuestAction(guest))
    } else {
        dispatch(setUserAction(user.results))
    }

}

export const checkAuth = () => async (dispatch) => {
    const response = await axios.get(`http://localhost:8000/api/refresh`, {withCredentials: true})
}

export const createSubThunk = ({login, password, fullName, tariff, orderId, acqId, paymentData}) => async (dispatch) => {
    const response = await api.post(`http://localhost:8000/payments/callback`, {
        login: login,
        password: password,
        fullName: fullName,
        tariff: tariff,
        orderId: orderId,
        acqId: acqId,
        paymentData: paymentData
    }, {withCredentials: true})
    return 0
}

export const cancelSubThunk = ({login, password}) => async (dispatch) => {
    const response = await api.post(`http://localhost:8000/payments/cancelSub`, {
        login: login,
        password: password
    }, {withCredentials: true})

}

export const cancelMobileSubThunk = ({password}) => async (dispatch) => {
    const response = await api.post(`http://localhost:8000/payments/cancelMobileSub`, {
        password: password
    }, {withCredentials: true})
}

export const getProfile = (redirect = true) => async (dispatch) => {
    const response = await api.get('http://localhost:8000/api/refresh', {withCredentials: true})
    localStorage.setItem('token', response.data.userData.accessToken)
    console.log(response.data.userData.user, 'aboba')
    dispatch(setGuestAction(response.data.userData.user))
    if (redirect) {
        Router.push('/profile')
    }
}
export const getFullProfile = () => async (dispatch) => {
    const response = await api.get('http://localhost:8000/api/getFullProfile', {withCredentials: true})
    const parsedProfile = JSON.parse(response.data.fullProfile.fullProfile)
    dispatch(setFullProfile(parsedProfile))
}