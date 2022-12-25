import React from 'react';
import { Route, Routes } from 'react-router-dom';
import User from './app/user/components/User';
import Area from './app/vendor/address/area/components/Area';
import City from './app/vendor/address/city/components/City';
import ContactType from './app/vendor/contact/contactType/components/ContactType';
import Navbar from './common/components/Navbar';
import Sidebar from './common/components/SideBar';

function App() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/user" element={<User />} />
          <Route path="/city" element={<City />} />
          <Route path="/area" element={<Area />} />
          <Route path="/contactType" element={<ContactType />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
