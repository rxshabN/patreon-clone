"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "../loading/page";

const paymentsuccess = () => {
  const { data: status } = useSession();
  if (status === "loading") {
    return <Loading />;
  } else {
    return (
      <div className="min-w-screen h-fit text-white text-4xl flex flex-col items-center relative top-52">
        <div className="flex flex-row gap-5 items-center mb-5 ml-[9vw]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="48"
            height="48"
            color="#7ed321"
            fill="none"
          >
            <path
              d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M8 12.5L10.5 15L16 9"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Payment Successful!
        </div>
        <Link href="/">
          <button
            type="button"
            class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Go back to main page
          </button>
        </Link>
      </div>
    );
  }
};

export default paymentsuccess;
