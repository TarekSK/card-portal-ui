import React, { useState } from 'react';

const useToken = () => {
  // Token - Handler
  const tokenHandler = 'token';
  const userHandler = 'u_id';

  // Token - Get
  const getToken = () => {
    // Token - Get
    const token = sessionStorage.getItem(tokenHandler);
    const userToken = token ?? JSON.parse(token!);
    return userToken!;
  };
  // Token
  const [token, setToken] = useState<string | undefined>(getToken());

  // Token - Set
  const saveToken = (userToken: string) => {
    // Save Token in Session Storage
    sessionStorage.setItem(tokenHandler, JSON.stringify(userToken));
    // Token - Set
    setToken(userToken);
  };

  // Token - Clear
  const clearToken = () => {
    // Token - Remove
    sessionStorage.removeItem(tokenHandler);
    // Token - Set
    setToken(undefined);
  };

  // User - Set
  const setUser = (id: number) => {
    // Save UserId in Session Storage
    sessionStorage.setItem(userHandler, JSON.stringify(id));
  };

  // User - Get
  const getUser = () => {
    // User - Get
    const userId = sessionStorage.getItem(userHandler);
    return Number(userId!);
  };

  return {
    setToken: saveToken,
    token,
    clearToken: clearToken,
    setUser,
    getUser,
  };
};

export default useToken;
