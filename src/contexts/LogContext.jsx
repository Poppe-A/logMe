import React, { createContext, useState } from 'react';

export const LoginContext = createContext(null);

// eslint-disable-next-line react/prop-types
function LogContext({ children }) {
  const [loginStatus, updateLoginStatus] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        loginStatus,
        updateLoginStatus,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
export default LogContext;
