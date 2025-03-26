import * as prototype from "./prototype";
// import axios from "axios";
import api from "../services/api"

//login loading dispatching function
export const login_loading = () => ({
    type: prototype.LOGIN_LOADING,
});

// login failed dispatching function
export const login_failed = (response) => ({
    type: prototype.LOGIN_FAILED,
    payload: response,
});

//login dispatching function
export const login_success = (response) => ({
    type: prototype.LOGIN_USER,
    payload: response,
});

export const logOut = () => async (dispatch) => {
    dispatch(login_loading());
    localStorage.clear();
}

export const signInFunction = (cred) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    dispatch(login_loading(true));
    const mail = cred.username?.trim();
    const pass = cred.password?.trim();
    let obj = {
      username: mail,
      password: pass,
      acctType: cred?.acctType
    };
    try {
        let response = await api
        .post("/api/auth/login", obj);
  
        if (response.data !== null) {
            dispatch(login_success(response.data.data));
            // localStorage.setItem("token", token);
            
        }
        return response.data;
    } catch (error) {
        console.log("error", error);
        dispatch(login_failed(error.response.data.message));
    }
};

//signup loading dispatching function
export const signup_loading = () => ({
    type: prototype.SIGNUP_LOADING,
});

// login failed dispatching function
export const signup_failed = (response) => ({
    type: prototype.SIGNUP_FAILED,
    payload: response,
});

//login dispatching function
export const signup_success = (response) => ({
    type: prototype.SIGNUP_USER,
    payload: response,
});

//profile loading dispatching function
export const profile_loading = () => ({
    type: prototype.GET_PROFILE_LOADING,
});

// profile failed dispatching function
export const profile_failed = (response) => ({
    type: prototype.GET_PROFILE_FAILED,
    payload: response,
});

// profile dispatching function
export const profile_success = (response) => ({
    type: prototype.GET_PROFILE_USER,
    payload: response,
});

export const GetProfile = (cred) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    try {
        let response = await api
        .get("/api/business/get-profile");
  
        if (response.data !== null) {
            dispatch(profile_success(response.data.data));
        }
    } catch (error) {
        console.log("error", error);
        dispatch(profile_failed(error.response.data.message));
    }
};

export const CreateProfile = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    dispatch(profile_loading(true));
    try {
        let response = await api
            .post("/api/business/create-profile", credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
  
        if (response.data !== null) {
            dispatch(profile_success(response.data.data));
        }
        return response.data.data;
    } catch (error) {
        console.log("error", error);
        dispatch(profile_failed(error.response.data.message));
    }
};

// items loading dispatching function
export const items_loading = () => ({
    type: prototype.GET_ITEMS_LOADING,
});

// items failed dispatching function
export const items_failed = (response) => ({
    type: prototype.GET_ITEMS_FAILED,
    payload: response,
});

// items dispatching function
export const items_success = (response) => ({
    type: prototype.GET_ITEMS_USER,
    payload: response,
});

export const GetItems = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    try {
        let response = await api
        .get(`/api/booking/created-booking-item/${credentials}`);
  
        if (response.data !== null) {
            dispatch(items_success(response.data.data.businessItems));
        }
        return response.data.data.businessItems;
    } catch (error) {
        console.log("error", error);
        dispatch(items_failed(error.response.data.message));
    }
};

export const AddItem = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    // dispatch(items_loading(true));
    try {
        let response = await api
            .post("/api/booking/create-booking-item", credentials);
  
        if (response.data !== null) {
            dispatch(items_success(response.data.data));
        }
        return response.data.data;
    } catch (error) {
        console.log("error", error);
        dispatch(items_failed(error.response.data.message));
    }
};


// customers loading dispatching function
export const customers_loading = () => ({
    type: prototype.GET_CUSTOMERS_LOADING,
});

// customers failed dispatching function
export const customers_failed = (response) => ({
    type: prototype.GET_CUSTOMERS_FAILED,
    payload: response,
});

// customers dispatching function
export const customers_success = (response) => ({
    type: prototype.GET_CUSTOMERS_USER,
    payload: response,
});

export const GetCustomers = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    dispatch(customers_loading(true));
    try {
        let response = await api
        .get(`/api/customer/get-customer/${credentials}`);
  
        if (response.data !== null) {
            dispatch(customers_success(response.data.data));
        }
    } catch (error) {
        console.log("error", error);
        dispatch(customers_failed(error.response.data.message));
    }
};

export const AddCustomer = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    dispatch(customers_loading(true));
    try {
        let response = await api
            .post("/api/customer/create-customer", credentials, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });
  
        if (response.data !== null) {
            dispatch(customers_success(response.data.data));
        }
    } catch (error) {
        console.log("error", error);
        dispatch(customers_failed(error.response.data.message));
    }
};

// customers loading dispatching function
export const analytics_loading = () => ({
    type: prototype.GET_ANALYTICS_LOADING,
});

// customers failed dispatching function
export const analytics_failed = (response) => ({
    type: prototype.GET_ANALYTICS_FAILED,
    payload: response,
});

// customers dispatching function
export const analytics_success = (response) => ({
    type: prototype.GET_ANALYTICS_USER,
    payload: response,
});


export const GetAnalytics = (credentials) => async (dispatch) => {
    // upon calling this fuction first dispatch a loading status into the store
    try {
        let response = await api
        .get(`/api/businessAnalytics/get-analytics/${credentials.businessId}/${credentials.timeframe}`);
  
        if (response.data !== null) {
            dispatch(analytics_success(response.data.data));
        }
    } catch (error) {
        console.log("error", error);
        dispatch(analytics_failed(error.response.data.message));
    }
};