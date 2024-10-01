"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const PaymentPage = ({ username }) => {
  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
    contact: "",
  });
  const [currentuser, setcurrentuser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchparams = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      let u = await fetchuser(username);
      setcurrentuser(u);
      let dbpayments = await fetchpayments(username);
      setPayments(dbpayments);
    };

    getData();
  }, [username]); // Add username as a dependency if it can change

  const pay = async (amount) => {
    if (paymentform.name.length === 0 || paymentform.name.length < 3) {
      toast.error(
        "Name is required and must be greater than 3 characters in length",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
      return;
    }

    if ((paymentform.message?.length || 0) < 4) {
      toast.error(
        "Message is required and must be greater than 3 characters in length",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        }
      );
      return;
    }

    if (
      !paymentform.contact ||
      paymentform.contact.length !== 10 ||
      !/^\d{10}$/.test(paymentform.contact)
    ) {
      toast.error("Invalid contact number", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      return;
    }

    if (!amount) {
      toast.error("Invalid amount!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      return;
    }
    let a = await initiate(amount, username, paymentform);
    let orderId = a.id;
    var options = {
      key: process.env.NEXT_PUBLIC_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Patreon Clone by RishabN",
      description: "Payment Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        contact: paymentform.contact,
      },
      notes: {
        address: "Virtual Address",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div
        className={
          currentuser.profilepic === 0 || !currentuser.profilepic
            ? "cover w-full h-[35vh]"
            : "cover w-full h-[30vh] pt-10 flex justify-center"
        }
      >
        <div
          className={
            currentuser.profilepic === 0 || !currentuser.profilepic
              ? ""
              : "absolute overflow-hidden border-2 rounded-full size-40"
          }
        >
          <Image
            src={
              currentuser.profilepic === 0 || !currentuser.profilepic
                ? "/Untitled_design-removebg-preview.png"
                : currentuser.profilepic
            }
            alt="image of user profile pic"
            width={330}
            height={330}
            className={
              currentuser.profilepic === 0 || !currentuser.profilepic
                ? "mx-auto w-[330px]"
                : "mx-auto w-[330px] object-cover size-full"
            }
          />
        </div>
      </div>
      <div className="info flex flex-col gap-2 justify-center items-center text-slate-300">
        <h2 className="font-bold text-lg text-center welcome">
          Welcome, {username}
        </h2>
        <div id="descriptionline1">{currentuser.description1}</div>
        <div id="descriptionline2">{currentuser.description2}</div>
        <div className="payment flex md:flex-row flex-col gap-3 w-[80%] mt-11 mb-8">
          <div className="supporters md:w-1/2 w-full bg-slate-900 text-white rounded-lg md:p-10 p-2 h-[60vh] overflow-y-auto">
            <h2 className="text-2xl text-center font-bold my-5">
              Transaction History
            </h2>
            <ul className="mx-4 text-md">
              {payments.length === 0 && (
                <li className="my-4 flex gap-2 items-center">
                  No transactions to be displayed.
                </li>
              )}
              {payments.map((p, i) => {
                return (
                  <li key={i} className="my-4 flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#ffffff"
                      fill="none"
                    >
                      <path
                        d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span>
                      {p.name} donated{" "}
                      <span className="font-bold">₹{p.amount}</span> with
                      message <br />
                      &quot;{p.message}&quot;
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="makePayment md:w-1/2 w-full bg-slate-900 text-white rounded-lg p-10">
            <h2 className="text-2xl my-5 font-bold text-center">
              Make a payment
            </h2>
            <div className="flex flex-col gap-2 mb-2">
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="border border-gray-600 p-2 rounded-md bg-slate-700 text-slate-300 focus:outline-none"
                value={paymentform.name}
                onChange={handleChange}
              />
              <input
                name="message"
                type="text"
                placeholder="Message"
                className="border border-gray-600 p-2 rounded-md bg-slate-700 text-slate-300 focus:outline-none"
                value={paymentform.message}
                onChange={handleChange}
              />
              <input
                name="contact"
                type="text"
                placeholder="Contact No."
                className="border border-gray-600 p-2 rounded-md bg-slate-700 text-slate-300 focus:outline-none"
                value={paymentform.contact}
                onChange={handleChange}
              />
              <input
                name="amount"
                type="text"
                placeholder="Amount"
                className="border border-gray-600 p-2 rounded-md bg-slate-700 text-slate-300 focus:outline-none"
                value={paymentform.amount}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={() => pay(paymentform.amount)}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
