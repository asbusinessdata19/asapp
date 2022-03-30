/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';
import {loginRequest, sendGetRequest} from '../../utils/AjaxUtil';
import {CURRENT_SCHOOL_ID} from '../../utils/GlobalVariables';
import {GET_USER_AUTHORITIES} from '../../utils/GlobalVariables';

export const UserSessionSlice = createSlice({
  name: 'UserSession',
  initialState: {
    value: {
      username: '',
      password: '',
      authenticated: false,
      expired: null,
      user: null,
      message: '',
      userAuthorities: [],
    },
  },
  reducers: {
    setUsername:(state,action)=>{
      state.value.username = action.payload;
    },
    setPassword:(state,action)=>{
      state.value.password = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.value.expired = false;
      state.value.authenticated = true;
      state.value.user = action.payload;
      state.value.message = '';
    },
    setUnAuthenticated: (state, action) => {
      state.value.username = '';
      state.value.password = '';
      state.value.message = action.payload;
      state.value.authenticated = false;
      state.value.expired = false;
      state.value.user = null;
      state.value.userAuthorities = [];
    },
    setUserAuthorities: (state, action) => {
      state.value.userAuthorities = action.payload;
    },
    expireSession: (state, action) => {
      state.value.expired = true;
      state.value.message = 'Your session is expired, please login again';
    },
  },
});

// Thunk Functions

export const isAuthorized = (FUNCTION_CODES, SCHOOL_ID) => {
  return (dispatch, getState) => {
    let USER_SCHOOL_FUNCTIONS = getState().UserSession.value.userAuthorities;
    let schoolId = CURRENT_SCHOOL_ID;
    if (SCHOOL_ID != undefined && SCHOOL_ID != null) {
      schoolId = SCHOOL_ID;
    }
    if (USER_SCHOOL_FUNCTIONS.includes(schoolId + '_SYSADMIN')) {
      return true;
    }
    for (let functionCode of FUNCTION_CODES.split(',')) {
      if (USER_SCHOOL_FUNCTIONS.includes(schoolId + '_' + functionCode)) {
        return true;
      }
    }
    return false;
  };
};

export const doLogin = (username, password, rememberMe) => {
  return (dispatch, getState) => {
    loginRequest(
      username,
      password,
      rememberMe,
      (res, other) => {
        if (res.data != null && res.data === 'authenticated') {
          sendGetRequest(
            'SecurityController/getCurrentUserInfo',
            {},
            (res, other) => {
              if (res.data != '') {
                dispatch(setAuthenticated(res.data));
                dispatch(
                  setUserAuthorities(
                    GET_USER_AUTHORITIES(res.data.userSchools),
                  ),
                );
              } else {
                dispatch(
                  setUnAuthenticated(
                    "Cann't retrieve user information, contact your administrator",
                  ),
                );
              }
            },
            (err, other) => {
              dispatch(setUnAuthenticated(err.toString()));
            },
            dispatch,
            false,
            null,
          );
        } else {
          dispatch(setUnAuthenticated('Wrong username or password'));
        }
      },
      (err, other) => {
        dispatch(setUnAuthenticated(err.toString()));
      },
      dispatch,
      false,
      null,
    );
  };
};

export const doLogout = () => {
  return (dispatch, getState) => {
    sendGetRequest(
      'logout',
      {},
      (res, other) => {
        dispatch(setUnAuthenticated(''));
      },
      (err, other) => {
        alert('Failed to logout');
      },
      dispatch,
      false,
      null,
    );
  };
};
export const {
  setAuthenticated,
  setUnAuthenticated,
  expireSession,
  setUserAuthorities,
  setUsername,
  setPassword,
} = UserSessionSlice.actions;
export default UserSessionSlice.reducer;
