import React from "react";
import Link from "next/link";
import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-16 text-center">
        How to use this website
      </h1>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          1. Sign Up or Login to your account
        </h2>
        <div className="relative md:w-[600px] overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-02 031211.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          2. Use any of the providers to login to your account
        </h2>
        <div className="relative md:w-[600px] overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-02 031242.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          3. Updating your profile in the dashboard
        </h2>
        <div className="relative md:w-[600px] overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-03 141539.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">4. Making a payment</h2>
        <div className="mb-5 md:w-[600px] relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-03 141507.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          5. Proceed with any of the payment options below
        </h2>
        <div className="mb-5 md:w-[600px] relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-03 141639.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-4">
          6. Payment is successful
        </h2>
        <div className="mb-5 md:w-[600px] relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <Image
            width={600}
            height={500}
            src="/Screenshot 2024-10-03 141713.png"
            className="border-2 border-gray-300 rounded-lg object-cover"
            loading="eager"
            alt="instruction"
          />
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          <button
            type="button"
            className="text-white bg-linear-to-r from-purple-500 to-pink-500 hover:bg-linear-to-l focus:ring-4 focus:outline-hidden focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg md:text-2xl text-md px-5 py-2.5 text-center me-2 mb-4"
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
