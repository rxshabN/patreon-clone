import PaymentPage from "@/components/PaymentPage";
import PaymentSuccess from "../paymentsuccess/page"; // Import the PaymentSuccess component
import React from "react";
import { notFound } from "next/navigation";
import connectDb from "@/db/connectDb";
import User from "@/models/User";

const Username = async ({ params }) => {
  const checkuser = async () => {
    await connectDb();
    let u = await User.findOne({ username: params.username });
    if (!u) {
      return notFound();
    }
  };
  await checkuser();

  // Check if the redirect path is for PaymentSuccess
  if (params.username === "PaymentSuccess") {
    return <PaymentSuccess />; // Render the PaymentSuccess component directly
  }

  // If it's a valid username, render the PaymentPage
  return (
    <>
      <PaymentPage username={params.username} />
    </>
  );
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Patreon Clone`,
  };
}
