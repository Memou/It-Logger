import {
    GET_LOGS,
    SET_LOADING,
    LOGS_ERROR
  } from './types';
  
// Get logs from server
export const getLogs = () => async dispatch => {
    try {
      setLoading();
  
      const res = await fetch('/logs');
      const data = await res.json();
  
      dispatch({
        type: GET_LOGS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: LOGS_ERROR,
        payload: err.response.statusText
      });
    }
  };
 
  
  // Add new log
  // Delete log from server
  // Update log on server
  
  // Search server logs
  
  // Set current log
  
  // Clear current log
  // Set loading to true
  export const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };