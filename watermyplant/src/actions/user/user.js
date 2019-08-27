import axios from 'axios';

//Action Types
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_RETURN_START = 'USER_RETURN_START';
export const USER_RETURN_SUCCESS = 'USER_RETURN_SUCCESS';
export const USER_RETURN_FAILURE = 'USER_RETURN_FAILURE';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const userLogin = (username, password) => dispatch => {
    let body = {
        username,
        password
    }
    dispatch({ type: USER_LOGIN_START });
    axios.post(`${process.env.REACT_APP_API}/login`, body)
        .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.user.id);
            localStorage.setItem('tokenExp', Date.now() + (1000 * 60 * 30)); //Set token expire date 30 minutes later
            dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.user });
            // dispatch(addNotifHelper('Welcome!'));
        })
        .catch(err => {
            dispatch({ type: USER_LOGIN_FAILURE });
            // dispatch(addNotifHelper(err, 'error'));
        });
}

export const userLogout = () => dispatch => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExp');
    dispatch({ type: USER_LOGOUT });
}

export const userRegister = (username, email, phone, password) => dispatch => {
    let body = { username, password, email, phone };
    dispatch({ type: USER_REGISTER_START });
    axios.post(`${process.env.REACT_APP_API}/register`, body)
        .then(res => {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
            // dispatch(addNotifHelper('Successfully Registered! Please login.', 'success'));
        })
        .catch(err => {
            dispatch({ type: USER_REGISTER_FAILURE });
            // dispatch(addNotifHelper(err, 'error'));
        });
}

export const userLoad = (url, token) => dispatch => {
    dispatch({ type: USER_RETURN_START });

    let headers = {
        'authorization': token
    };
    axios.get(url, { headers })
        .then(res => dispatch({ type: USER_RETURN_SUCCESS, payload: res.data }))
        .catch(err => {
            // dispatch(addNotifHelper('Session expired. Please log in again.', 'error'));
            dispatch({ type: USER_RETURN_FAILURE })
            userLogout();
        });
}

export const updateUser = (id, user) => dispatch => {
    dispatch({ type: UPDATE_USER_START });
    let token = localStorage.getItem('token');
    let headers = {
        'authorization': token
    }
    axios.put(`${process.env.REACT_APP_API}/users/${id}`, { ...user }, { headers })
        .then(res => {
            dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
            // dispatch(addNotifHelper(`Updated Your Profile!`, 'success'));
        })
        .catch(err => {
            dispatch({ type: UPDATE_USER_FAILURE });
            // dispatch(addNotifHelper(err, 'error'));
        });
}