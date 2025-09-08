import React, { createContext, useContext, useReducer } from 'react';

// Action types for logging
const LOG_ACTION = 'LOG_ACTION';

// Initial state for logs
const initialState = {
  logs: [],
};

// Reducer to handle logging actions
function logReducer(state, action) {
  switch (action.type) {
    case LOG_ACTION:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      };
    default:
      return state;
  }
}

// Create context for logging
const LoggingContext = createContext();

// Provider component to wrap app and provide logging functionality
export function LoggingProvider({ children }) {
  const [state, dispatch] = useReducer(logReducer, initialState);

  // Function to add a log entry
  const log = (message) => {
    const timestamp = new Date().toISOString();
    dispatch({ type: LOG_ACTION, payload: { message, timestamp } });
  };

  return (
    <LoggingContext.Provider value={{ logs: state.logs, log }}>
      {children}
    </LoggingContext.Provider>
  );
}

// Custom hook to use logging in components
export function useLogging() {
  return useContext(LoggingContext);
}
