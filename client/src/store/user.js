import axios from 'axios';

// action types
const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

// action creators
export const getUser = (user) => {
  return {
    type: GET_USER,
    user,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// thunk creators

// thunk for logging in
export const authLogin = (userName, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/login`, { userName, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

// thunk for signing up

export const authSignup = (userName, password) => async (dispatch) => {
  let res;
  try {
    res = await axios.post(`/auth/signup`, { userName, password });
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }
  try {
    dispatch(getUser(res.data));
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    dispatch(removeUser());
    // maybe trigger the modal to re-appear? right now the user is trapped but a good stretch
    // goal could be to allow them to logout and login as a different user
  } catch (err) {
    console.error(err);
  }
};

// reducer
export default function user(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
}
