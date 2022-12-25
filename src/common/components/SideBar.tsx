import { Link } from 'react-router-dom';
import {
  FiBook,
  FiCreditCard,
  FiList,
  FiLogOut,
  FiMap,
  FiMapPin,
  FiMessageSquare,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { BiBuilding } from 'react-icons/bi';

export default function Sidebar() {
  return (
    <div className="flex-none w-64 antialiased transition-all bg-gray-50 text-white">
      <div className="fixed top-0 left-0 w-64  bg-blue-600 h-full border-r text-white ">
        <div className="flex items-center pl-4 h-14 text-2xl font-bold antialiased">
          <div>Card Portal</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow ">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-slate-50">
                  Menu
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/account"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition-all"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiList />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Accounts
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/card"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiCreditCard />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Cards
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/transaction"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiBook />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Transactions
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/transaction"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition-all"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <BiBuilding />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Vendors
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-slate-50">
                  Users
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/user"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiUsers />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Users
                </span>
              </Link>
            </li>

            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-slate-50">
                  Settings
                </div>
              </div>
            </li>

            <li>
              <Link
                to="/contactType"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition-all"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiMessageSquare />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Contact Types
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/city"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition-all"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiMap />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Cities
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/area"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition-all"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiMapPin />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Areas
                </span>
              </Link>
            </li>

            <li>
              <Link
                to="/logout"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-sky-600 pr-6 transition"
              >
                <span className="inline-flex justify-center items-center ml-4">
                  <FiLogOut />
                </span>
                <span className="ml-3 text-sm tracking-wide truncate">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
