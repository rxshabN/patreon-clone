"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchpayments, initiate, fetchuser } from "@/actions/useractions";
import { useSession } from "next-auth/react";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";
import Loading from "@/app/loading/page";

const PaymentPage = ({ username }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to the homepage
    }
  }, [status, router]);

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
      amount: amount * 100,
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

  if (status === "loading") {
    return <Loading />;
  } else {
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
        <div className="cover w-full h-[30vh] pt-10 flex justify-center z-0">
          <div className="absolute overflow-hidden rounded-full size-40 z-0">
            <img
              src={
                currentuser.profilepic
                  ? currentuser.profilepic
                  : "/user-stroke-rounded.svg"
              }
              alt="invalid url"
              width={330}
              height={330}
              className="mx-auto w-[330px] object-cover size-full z-0"
            />
          </div>
        </div>
        <div className="info flex flex-col gap-2 justify-center items-center text-slate-300">
          <h2 className="font-bold text-lg text-center welcome">
            Welcome <span id="display">{currentuser.displayname}</span>
          </h2>
          <div
            id="descriptionline1"
            className="h-auto w-full overflow-auto mt-2 text-center px-1.5"
          >
            {currentuser.description1}
          </div>
          <div
            id="descriptionline2"
            className="h-auto w-full overflow-auto text-center px-1.5"
          >
            {currentuser.description2}
          </div>
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
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={paymentform.name}
                  name="name"
                />
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter message"
                  onChange={handleChange}
                  value={paymentform.message}
                  name="message"
                />
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter contact number"
                  onChange={handleChange}
                  value={paymentform.contact}
                  name="contact"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800 mb-1.5"
                  placeholder="Enter amount"
                  onChange={handleChange}
                  value={paymentform.amount}
                  name="amount"
                />
                <button
                  onClick={() => pay(Number.parseInt(paymentform.amount) * 100)}
                  // disabled={
                  //   (paymentform.name?.length || 0) < 3 ||
                  //   (paymentform.message?.length || 0) < 4
                  // }
                  type="button"
                  className="text-white bg-gradient-to-br from-purple-700 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-0.5 mr-0"
                >
                  Pay
                </button>
              </div>
              <div className="flex gap-2 mt-5">
                <button
                  className="bg-slate-800 p-3 rounded-lg"
                  onClick={() => pay(10000)}
                >
                  Pay ₹100
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg"
                  onClick={() => pay(50000)}
                >
                  Pay ₹500
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg"
                  onClick={() => pay(100000)}
                >
                  Pay ₹1000
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default PaymentPage;
