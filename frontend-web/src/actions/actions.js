import { loginRequest } from "../api/api";
import * as types from "./actionTypes";
import dispatch from 'redux'

export const login = (username, password) => {
    return {type: types.LOGIN,
            payload: loginRequest(username, password).then()};
}

