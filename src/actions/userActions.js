import axios from 'axios';
import { GET_ERRORS ,GET_USERS_LIST, GET_PROFILE } from './types';
import setJWTToken from '../utils/setJWTToken';
export const createUser = (newUser, history, type) => async dispatch => {
    try {

        console.log("usertype "+type);
        const res = await axios.post("/api/users/register/" + type, newUser);
        history.push("/confirmation/" + res.data.id);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}

export const confirm = (id, code) => async dispatch => {
    try {

        await axios.post("/api/users/confirm/" + id + "/" + code);
        window.location.href = "/login";
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
}



export const login = (loginRequest) => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", loginRequest);
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        window.location.href = "/";

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getProfile = (id) => async dispatch => {
    try {
        const res = await axios.get("/api/users/"+id);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}

export const getUserList = () => async dispatch => {
    try {
        const res = await axios.get("/api/users/all");
      
        dispatch({
            type: GET_USERS_LIST,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
}
export const logout = () =>  async dispatch => {
   
    await axios.post("/api/users/logout");
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
}