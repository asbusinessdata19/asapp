/* eslint-disable prettier/prettier */
import axios from 'axios';
import {setLoading, setUnLoading} from '../store/slicers/LoadingSlicer';
import * as GlobalVariables from './GlobalVariables';

let timeout = 60000;

function createRequestConfiguration(url, method, data) {
  let configuration = {
    url: GlobalVariables.APP_CONTEXT + url,
    method: method,
    timeout: timeout,
    // withCredentials: true,
    auth: {
      username: 'asaleh',
      password: 'P@ssw0rd',
    },
  };
  if (GlobalVariables.WEB_SERVICE_URL != '') {
    configuration['baseURL'] = GlobalVariables.WEB_SERVICE_URL;
  }
  if (method === 'post') {
    configuration['data'] = data;
  } else {
    configuration['params'] = data;
  }
  return configuration;
}

export function loginRequest(
  username,
  password,
  rememberMe,
  successFn,
  failedFn,
  dispatch,
  showError,
  other,
) {
  let bodyFormData = new FormData();
  bodyFormData.append('username', username);
  bodyFormData.append('password', password);
  bodyFormData.append('remember-me', rememberMe);
  let requestConfiguration = {
    url: GlobalVariables.APP_CONTEXT + 'login',
    method: 'post',
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data'},
    // withCredentials: true,
  };
  if (GlobalVariables.WEB_SERVICE_URL != '') {
    requestConfiguration['baseURL'] = GlobalVariables.WEB_SERVICE_URL;
  }
  if (dispatch != null) {
    dispatch(setLoading());
  }
  axios
    .request(requestConfiguration)
    .then(res => {
      if (dispatch != null) {
        dispatch(setUnLoading());
      }
      successFn(res, other);
    })
    .catch(err => {
      if (dispatch != null) {
        dispatch(setUnLoading());
        if (showError) {
          alert('Failed to process your request,Contact your administrator');
        }
      }
      failedFn(err, other);
    });
}

export function sendGetRequest(
  url,
  params,
  successFn,
  failedFn,
  dispatch,
  showError,
  other,
) {
  if (dispatch != null) {
    dispatch(setLoading());
  }
  axios
    .request(createRequestConfiguration(url, 'get', params))
    .then(res => {
      if (dispatch != null) {
        dispatch(setUnLoading());
      }
      successFn(res, other);
    })
    .catch(err => {
      if (dispatch != null) {
        dispatch(setUnLoading());
        if (showError) {
          alert('Failed to load data');
        }
      }
      failedFn(err, other);
    });
}

export function sendPostRequest(
  url,
  data,
  successFn,
  failedFn,
  dispatch,
  showError,
  other,
) {
  if (dispatch != null) {
    dispatch(setLoading());
  }
  axios
    .request(createRequestConfiguration(url, 'post', data))
    .then(res => {
      if (dispatch != null) {
        dispatch(setUnLoading());
      }
      successFn(res, other);
    })
    .catch(err => {
      if (dispatch != null) {
        dispatch(setUnLoading());
        if (showError) {
          alert('Failed to process your request,Contact your administrator');
        }
      }
      failedFn(err, other);
    });
}

export function sendDeleteRequest(
  url,
  params,
  successFn,
  failedFn,
  dispatch,
  showError,
  other,
) {
  if (dispatch != null) {
    dispatch(setLoading());
  }
  axios
    .request(createRequestConfiguration(url, 'delete', params))
    .then(res => {
      if (dispatch != null) {
        dispatch(setUnLoading());
      }
      successFn(res, other);
    })
    .catch(err => {
      if (dispatch != null) {
        dispatch(setUnLoading());
        if (showError) {
          dispatch();
          alert('Failed to load data');
        }
      }
      failedFn(err, other);
    });
}
