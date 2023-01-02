import React, { useState } from 'react';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useToken from '../helper/user/useToken';

interface NavbarProps {
  token: string;
  clearToken: () => void;
}

const Navbar = ({ token, clearToken }: NavbarProps) => {
  // handle Logout
  const handleLogout = async () => {
    // Clear Token
    await clearToken();
  };
  // Loout
  const renderedLogout = () => {
    if (token) {
      return (
        <>
          <Link
            to="/profile"
            className="group relative mr-3 flex justify-center rounded-md border border-transparent
             bg-blue-500 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <span
              className="pr-3 left-0 align-middle"
              style={{ paddingTop: '3px' }}
            >
              <FiUser />
            </span>
            My Profile
          </Link>

          <button
            type="button"
            className="group relative flex justify-center rounded-md border border-transparent
             bg-slate-500 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            onClick={async () => await handleLogout()}
          >
            <span
              className="pr-3 left-0 align-middle"
              style={{ paddingTop: '3px' }}
            >
              <FiLogOut />
            </span>
            Logout
          </button>
        </>
      );
    }
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 p-2">
        <div className="flex flex-wrap justify-between items-center mx-auto px-4 py-2.5">
          <div className="flex items-center ml-auto">{renderedLogout()}</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
