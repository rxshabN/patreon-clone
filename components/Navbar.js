"use client"; // Ensure this component is treated as a client component
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link"; // Import Link from Next.js
import { fetchuser } from "@/actions/useractions"; // Import your user fetching function

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);
  const [showhamburger, setshowhamburger] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");

  const fetchUpdatedUserData = async () => {
    if (session && session.user) {
      try {
        let userData = await fetchuser(session.user.name);
        setUpdatedUsername(userData.username || session.user.name);
      } catch (error) {
        console.error("Error fetching updated user data:", error);
      }
    }
  };

  const handleDropdownToggle = () => {
    setshowdropdown(!showdropdown);
    fetchUpdatedUserData();
  };

  const handleMenuItemClick = () => {
    setshowhamburger(false); // Close the hamburger menu when a menu item is clicked
  };

  const handleLogout = () => {
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  };

  return (
    <nav className="relative bg-black text-white flex justify-between px-4 items-center md:h-16 md:flex-row p-2">
      {/* Left side: Title */}
      <div className="logo font-bold text-lg">
        <Link href={"/"}>Patreon Clone</Link>
      </div>

      {/* Right side: Hamburger menu for small screens */}
      <button
        className="md:hidden text-white"
        onClick={() => setshowhamburger(!showhamburger)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

      {/* Main Menu for larger screens */}
      <ul className="hidden md:flex md:items-center gap-4">
        <Link href={"/"}>
          <li onClick={handleMenuItemClick}>Home</li>
        </Link>
        <Link href="/projects">
          <li onClick={handleMenuItemClick}>My Projects</li>
        </Link>
        {session && (
          <>
            <button
              onClick={handleDropdownToggle}
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false);
                }, 100);
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-[185px] ml-[310px]`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                {updatedUsername && (
                  <li>
                    <Link
                      href={`/${updatedUsername || session.user.name}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Payments Page
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      handleLogout();
                      handleMenuItemClick();
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {!session && (
          <Link href={"/login"}>
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Sign Up / Login
              </span>
            </button>
          </Link>
        )}
        {session && (
          <button
            onClick={() => {
              handleLogout();
              handleMenuItemClick();
            }}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-red-600 group-hover:from-red-500 group-hover:to-red-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800"
          >
            <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Logout
            </span>
          </button>
        )}
      </ul>

      {/* Hamburger Menu Items */}
      {showhamburger && (
        <div className="md:hidden absolute right-0 top-8 w-full bg-black text-white">
          <ul className="flex flex-col items-center gap-5 py-2">
            <Link href={"/"}>
              <li onClick={handleMenuItemClick}>Home</li>
            </Link>
            <Link href="/projects">
              <li onClick={handleMenuItemClick}>My Projects</li>
            </Link>
            {session && (
              <>
                <li>
                  <Link href="/dashboard" onClick={handleMenuItemClick}>
                    Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    href={`/${updatedUsername || session.user.name}`} // Always render the Payments Page link
                    onClick={handleMenuItemClick}
                  >
                    Payments Page
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    onClick={() => {
                      handleLogout();
                      handleMenuItemClick();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!session && (
              <li>
                <Link href={"/login"} onClick={handleMenuItemClick}>
                  Sign Up / Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
