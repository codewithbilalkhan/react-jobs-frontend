import React, { useState } from 'react'
import logo from '../assets/images/logosjob.png'  
import { NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'


const Navbar = () => {
  const { user, logout, isAuthenticated, isEmployer } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const LinkClass = ({isActive}) => isActive ? 'bg-gray-900 text-white rounded-md px-3 py-2' : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
  
  const MobileLinkClass = ({isActive}) => isActive ? 'bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium' : 'text-white hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <div>
      <nav className="bg-orange-700 border-b border-orange-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            {/* <!-- Logo --> */}
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/" onClick={closeMobileMenu}>
            {/* <img className='h-10 w-auto' src={logo} alt="React Jobs" /> */}
             
              <span className="text-white text-2xl font-bold ml-2"
                >J O B E E</span
              >
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex space-x-2 items-center">
              <NavLink
                to="/"
                className={LinkClass}
                >Home
                </NavLink>
              <NavLink
                to="/jobs"
                 className={LinkClass}
                >Jobs
                </NavLink>
              
              {/* Show different links based on authentication and role */}
              {isAuthenticated ? (
                <>
                  {isEmployer() && (
                    <>
                      <NavLink
                        to="/add-job"
                        className={LinkClass}
                      >
                        Add Job
                      </NavLink>
                      <NavLink
                        to="/employer-dashboard"
                        className={LinkClass}
                      >
                        Dashboard
                      </NavLink>
                    </>
                  )}
                  <span className="text-white px-3 py-2 text-sm">
                    Welcome, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={LinkClass}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className={LinkClass}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-orange-800">
            <NavLink
              to="/"
              className={MobileLinkClass}
              onClick={closeMobileMenu}
              >Home
              </NavLink>
            <NavLink
              to="/jobs"
               className={MobileLinkClass}
               onClick={closeMobileMenu}
              >Jobs
              </NavLink>
            
            {/* Show different links based on authentication and role */}
            {isAuthenticated ? (
              <>
                {isEmployer() && (
                  <>
                    <NavLink
                      to="/add-job"
                      className={MobileLinkClass}
                      onClick={closeMobileMenu}
                    >
                      Add Job
                    </NavLink>
                    <NavLink
                      to="/employer-dashboard"
                      className={MobileLinkClass}
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </NavLink>
                  </>
                )}
                <div className="text-white px-3 py-2 text-base font-medium border-t border-orange-600 mt-2 pt-4">
                  Welcome, {user?.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="text-white hover:bg-gray-900 hover:text-white block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={MobileLinkClass}
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className={MobileLinkClass}
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
    </div>
  )
}

export default Navbar
