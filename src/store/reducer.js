import * as prototype from "./prototype";

export const Login = (state = {loading: true, errMess: null, isAuthenticated: false, profile_status: "false" }, action) => {
    switch (action.type) {
      case prototype.LOGIN_LOADING:
        return {...state, loading: true, errMess: null, isAuthenticated: false, profile_status: "false"}
      
      case prototype.LOGIN_FAILED:
        return {...state, loading: false, errMess: action.payload, isAuthenticated: false, profile_status: "false" }
  
      case prototype.LOGIN_USER:
        return {...state, loading: false, errMess: null, isAuthenticated: true, profile_status: action.payload }
      
      case prototype.LOGOUT_LOADING:
        return { ...state, loading: true, errMess: null, isAuthenticated: true}
      
      case prototype.LOG_OUT:
        return { ...state, loading: true, errMess: null, isAuthenticated: false, profile_status: "false"}
  
      default:
        return state
    }
}

export const Sign_up = (state = { isloading: true, errMess: null, message: null}, action) => {

    switch (action.type) {
  
      case prototype.SIGNUP_LOADING:
        return { ...state, isloading: true, errMess: null, message: null}
      
      case prototype.SIGNUP_FAILED:
        return { ...state, isloading: false, errMess: action.payload, message: null}
      
      case prototype.SIGNUP_USER:
        return { ...state, isloading: false, errMess: null, message: action.payload}
  
      default:
        return state
    }
}


export const Profile = (state = { isloading: true, errMess: null, message: null}, action) => {

    switch (action.type) {
  
      case prototype.GET_PROFILE_LOADING:
        return { ...state, isloading: true, errMess: null, message: null}
      
      case prototype.GET_PROFILE_FAILED:
        return { ...state, isloading: false, errMess: action.payload, message: null}
      
      case prototype.GET_PROFILE_USER:
        return { ...state, isloading: false, errMess: null, message: action.payload}
  
      default:
        return state
    }
}

export const BookingItems = (state = { isloading: true, errMess: null, message: null}, action) => {

    switch (action.type) {
  
      case prototype.GET_ITEMS_LOADING:
        return { ...state, isloading: true, errMess: null, message: null}
      
      case prototype.GET_ITEMS_FAILED:
        return { ...state, isloading: false, errMess: action.payload, message: null}
      
      case prototype.GET_ITEMS_USER:
        return { ...state, isloading: false, errMess: null, message: action.payload}
  
      default:
        return state
    }
}

export const Customers = (state = { isloading: true, errMess: null, message: null}, action) => {

    switch (action.type) {
  
      case prototype.GET_CUSTOMERS_LOADING:
        return { ...state, isloading: true, errMess: null, message: null}
      
      case prototype.GET_CUSTOMERS_FAILED:
        return { ...state, isloading: false, errMess: action.payload, message: null}
      
      case prototype.GET_CUSTOMERS_USER:
        return { ...state, isloading: false, errMess: null, message: action.payload}
  
      default:
        return state
    }
}

export const Analytics = (state = { isloading: true, errMess: null, message: null}, action) => {

    switch (action.type) {
  
      case prototype.GET_ANALYTICS_LOADING:
        return { ...state, isloading: true, errMess: null, message: null}
      
      case prototype.GET_ANALYTICS_FAILED:
        return { ...state, isloading: false, errMess: action.payload, message: null}
      
      case prototype.GET_ANALYTICS_USER:
        return { ...state, isloading: false, errMess: null, message: action.payload}
  
      default:
        return state
    }
}