import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto md:px-4 px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">About This App</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">
          See the Real Patreon Website
        </h2>
        <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
          <iframe
            src="https://www.patreon.com/"
            title="Patreon Website"
            width="100%"
            height="500"
            className="border-2 border-gray-300 rounded-lg"
          ></iframe>
        </div>
      </div>

      <p className="text-lg mb-4">
        Hi, I'm <strong>Rishab Nagwani</strong>, a student at VIT Vellore from
        Mumbai. This app is a <strong>Patreon Clone</strong> built using{" "}
        <strong>Next.js</strong> and <strong>Tailwind CSS</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-2">What This App Does</h2>
      <p className="text-lg mb-4">
        The main purpose of this application is to allow users to create an
        account and accept payments on behalf of themselves using the{" "}
        <strong>Razorpay payment gateway</strong>. It provides a seamless way
        for content creators and service providers to manage their subscriptions
        and payments efficiently.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
      <p className="text-lg mb-4">
        After signing up, users can set up their profiles and start accepting
        payments. The app securely integrates with Razorpay to handle all
        payment transactions, ensuring a smooth experience for both creators and
        their supporters.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Why I Built This App</h2>
      <p className="text-lg mb-4">
        As a student, I noticed the growing need for platforms that help
        creators monetize their content. This app is my take on providing a
        user-friendly solution that makes it easier for creators to receive
        support from their fans. As of now, I'm the only creator on this app as
        it is simply a project and not a production website hence all payments
        are received in my personal bacnk account.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
      <p className="text-lg mb-4">
        I believe in community-driven development. If you have suggestions,
        feedback, or would like to contribute to this project, feel free to
        reach out!
      </p>

      <div className="flex justify-center mt-6">
        <Link href="/" className="text-blue-500 hover:underline">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Back to Homepage
          </button>
        </Link>
      </div>
    </div>
  );
};

export default About;

export const metadata = {
  title: "About Patreon Clone",
};
