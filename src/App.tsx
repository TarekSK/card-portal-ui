import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Account from './app/account/components/Account';
import Card from './app/card/components/Card';
import Login from './app/login/components/Login';
import Profile from './app/profile/components/Profile';
import Transaction from './app/transaction/components/Transaction';
import User from './app/user/components/User';
import Area from './app/vendor/address/area/components/Area';
import City from './app/vendor/address/city/components/City';
import ContactType from './app/vendor/contact/contactType/components/ContactType';
import Vendor from './app/vendor/vendor/components/Vendor';
import Navbar from './common/components/Navbar';
import Sidebar from './common/components/SideBar';
import useToken from './common/helper/user/useToken';

function App() {
  // Token - Hook
  const { token, setToken, clearToken, setUser } = useToken();

  // Return To Login - If No Token
  if (!token) {
    return (
      <>
        <Login
          setUserToken={(userToken: string) => setToken(userToken)}
          setUser={(id: number) => setUser(id)}
        />
      </>
    );
  }

  return (
    <>
      <Navbar token={token} clearToken={clearToken} />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/account" element={<Account />} />
          <Route path="/card" element={<Card />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/user" element={<User />} />
          <Route path="/city" element={<City />} />
          <Route path="/area" element={<Area />} />
          <Route path="/contactType" element={<ContactType />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
