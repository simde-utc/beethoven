import { fetch_ as fetchAPI } from "./fetch";
import { User } from "./models";

export const REQUEST_LOGIN = Symbol('CONNECT.REQUEST_LOGIN');
export const SUCCESS_LOGIN = Symbol('CONNECT.SUCCESS_LOGIN');
export const ERROR_LOGIN = Symbol('CONNECT.ERROR_LOGIN');
export const CLEAR = Symbol('CONNECT.CLEAR');

export function requestLogin() {
  return {
    type: REQUEST_LOGIN,
    connect: {
      pending: true,
      isLogged: false,
    }
  }
}

export function successLogin({ sessionid, username }) {
  return {
    type: SUCCESS_LOGIN,
    connect: {
      user: {
        sessionid,
        username,
      },
      isLogged: true,
      pending: false
    }
  }
}

export function errorLogin(error) {
  return {
    type: ERROR_LOGIN,
    error,
    connect: {
      pending: false,
      isLogged: false,
    }
  }
}

export function clear() {
  return {
    type: CLEAR,
    connect: {}
  }
}

export function badgeAuth(data) {
  return (dispatch, state) => {
    dispatch(requestLogin())
    fetchAPI('/auth/badge', { data }).then(
      async (response) => {
        await window.localStorage.setItem('@auth_info', JSON.stringify(response))
        dispatch(successLogin(response))
    }).catch( async (err) => {
      await window.localStorage.removeItem('@auth_info')
      errorLogin(err)
    })
  }
}

export function usernameAuth(data) {
  return (dispatch, state) => {
    dispatch(requestLogin())
    fetchAPI('/auth/username', { data }).then(
      async (response) => {
        await window.localStorage.setItem('@auth_info', JSON.stringify(response))
        dispatch(successLogin(response))
      }
    ).catch(async (err) => {
      await window.localStorage.removeItem('@auth_info')
      errorLogin(err)
    })
  }
}

export function logout() {
  return async (dispatch, state) => {
    await window.localStorage.removeItem('@auth_info')
    fetchAPI('/auth/logout').then(
      () => dispatch(clear())
    ).catch((err) => dispatch(clear()))
  }
}

export function refreshUser() {
  return (dispatch, state) => {
    fetchAPI('/auth/me', { method: 'GET' }).then(
      async (response) => {
        const data = await JSON.parse(window.localStorage.getItem('@auth_info'));
        dispatch(successLogin(data));
      }
    ).catch( async (err) => {
      await window.localStorage.removeItem('@auth_info')
      dispatch(errorLogin)
    });
  }
}

export function isLogged(state) {
  const { connect } = state;
  return Boolean(connect && connect.isLogged);
}

export function isPending(state) {
  const { connect } = state;
  return Boolean(connect && connect.isPending)
}

export function getUser(state) {
  const {connect} = state;

  if(connect  && connect.user) {
    const user = new User(connect.user);
    return user;
  }
  return null;
}
