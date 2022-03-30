/* eslint-disable prettier/prettier */
// common variables (prod & dev)
export const REACT_ROUTER_ROUTE = '/as-school-sys/home';
export const APP_NAME = 'School Management System';
export const CURRENT_SCHOOL_ID = -1;

export const GET_USER_AUTHORITIES = (userSchools) => {
    let userAuthorities = [];
    if (userSchools != undefined && userSchools != null && Array.isArray(userSchools)) {
        for (let school of userSchools) {
            if (school.userFunctions != undefined && school.userFunctions != null && Array.isArray(school.userFunctions)) {
                for (let functionCode of school.userFunctions) {
                    userAuthorities.push(school.id + '_' + functionCode);
                }
            }
        }
    }
    return userAuthorities;
}

// incase of production
// export const WEB_SERVICE_URL='';
// export const APP_CONTEXT='/as-school-sys/'
// incase of development
export const WEB_SERVICE_URL = 'http://test.coursic.com/';
// export const WEB_SERVICE_URL = 'http://192.168.1.6:8080/';
export const APP_CONTEXT = 'asapp/';

