import React from "react";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-16 text-center">
        How to use this website
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          1. Sign Up or Login to your account
        </h2>
        <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <video
            width="100%"
            height="500"
            controls
            className="border-2 border-gray-300 rounded-lg"
          >
            <source src="signuplogin.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          2. Use any of the providers to login to your account
        </h2>
        <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <video
            width="100%"
            height="500"
            controls
            className="border-2 border-gray-300 rounded-lg"
          >
            <source src="loginusinggithub.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">3. Making a Payment</h2>
        <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <video
            width="100%"
            height="500"
            controls
            className="border-2 border-gray-300 rounded-lg"
          >
            <source src="makeapayment.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          4. Updating your profile via dashboard
        </h2>
        <div className="mb-5 relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <video
            width="100%"
            height="500"
            controls
            className="border-2 border-gray-300 rounded-lg"
          >
            <source src="updateprofile.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <span className="text-red-500 font-bold text-md">
          Note that upon changing the username, previous transactions will not
          be displayed as all transactions are associated with one username
          only. Hence the option to change email and username is disabled by
          default to avoid any unexpected loss of data.
        </span>
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;

export const metadata = {
  title: "Get Started",
};