import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 p-2">
        <div className="flex flex-wrap justify-between items-center mx-auto px-4 py-2.5">
          <div className="flex items-center ml-auto">
            <a
              href="#"
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
