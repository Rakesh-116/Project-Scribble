import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
  const { isAuthenticated, loading, user, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                Scribbly
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-100 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>

              {!loading && (
                <>
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/boards"
                        className="text-gray-100 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        My Boards
                      </Link>
                      <Link
                        to="/new-board"
                        className="text-gray-100 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Create Board
                      </Link>
                      <div className="relative ml-3 group">
                        <button className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          <span className="text-white">
                            {user?.username || "User"}
                          </span>
                          <svg
                            className="ml-1 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                          <button
                            onClick={logout}
                            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="text-gray-100 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-white text-indigo-600 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/boards"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                My Boards
              </Link>
              <Link
                to="/new-board"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Create Board
              </Link>
              <Link
                to="/profile"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
