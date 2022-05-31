import { createContext, useReducer } from "react";
import alertReducer from './AlertReducer'


const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)

  // set an alert

  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type }
    })

    setTimeout(() => dispatch({ type: "REMOVE_ALERT"}), 3000)
  }

  // pass in the initial state and the function you want to use
  return <AlertContext.Provider value={{
      alert: state, 
      setAlert
    }}>

    {children}
  </AlertContext.Provider>

}

export default AlertContext