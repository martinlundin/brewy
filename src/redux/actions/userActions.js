import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types'
import Axios from 'axios'

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    Axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const loginUserAction = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    Axios.post('/login', userData)
    .then((response) => {
        setAuthorizationHeader(response.data.token)
        dispatch(getCurrentUserDataAction())
    })
    .catch((error) => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        })
    })
}

export const registerUserAction = (userData) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    Axios.post('/register', userData)
    .then((response) => {
        setAuthorizationHeader(response.data.token)
        dispatch(getCurrentUserDataAction())
    })
    .catch((error) => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        })
    })
}

export const logoutUserAction = () => (dispatch) => {
    localStorage.removeItem('FBIdToken')
    delete Axios.defaults.headers.common['Authorization']
    dispatch({ type: SET_UNAUTHENTICATED })
}

export const getCurrentUserDataAction = () => (dispatch) => {
    Axios.get('/user')
    .then(response => {
        dispatch({ type: CLEAR_ERRORS })
        dispatch({
            type: SET_USER,
            payload: response.data
        })
    })
    .catch((error) => {
        dispatch({
            type: SET_ERRORS,
            payload: error.response.data,
        })
    })
}