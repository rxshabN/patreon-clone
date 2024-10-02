"use client";
import { React, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Loading from "../loading/page";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to the homepage
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  } else {
    return (
      <div className="min-w-screen h-fit text-white text-4xl flex flex-col items-center relative top-52">
        <div className="flex flex-col items-center gap-5 mb-5">
          <div className="flex flex-row gap-5 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="140"
              height="140"
              color="#7ed321"
              fill="none"
            >
              <path
                d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 12.5L10.5 15L16 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">Payment Successful!</div>
        </div>
        <Link href="/">
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Go back to main page
          </button>
        </Link>
      </div>
    );
  }
};

export default PaymentSuccess;
