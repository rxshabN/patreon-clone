"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchuser, updateProfile } from "@/actions/useractions";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/app/loading/page";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setform] = useState({});
  const [loading, setLoading] = useState(true); // State for loading

  // Wrap getData in useCallback to memoize it
  const getData = useCallback(async () => {
    try {
      if (session && session.user) {
        setLoading(true); // Start loading
        let u = await fetchuser(session.user.name);
        setform(u);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false); // End loading
    }
  }, [session]); // Dependency on session to ensure it updates when session changes

  useEffect(() => {
    if (status === "authenticated") {
      getData();
    }
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status, getData]); // This effect handles redirection based on status

  useEffect(() => {
    getData(); // Calling getData directly
  }, [getData]); // This will ensure it runs when getData changes

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let ndata = Object.fromEntries(formData);

    // Show the success toast immediately
    toast.success("Profile updated!", {
      position: "top-center",
      autoClose: 1800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
      transition: Flip,
    });

    setLoading(true); // Start loading

    try {
      let response = await updateProfile(ndata, session.user.name);
      if (response.ok) {
        // Redirect to payment page immediately after loading
        router.push(`/${ndata.username || session.user.name}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose="1800"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Flip}
      />
      {loading || !router.isReady ? (
        <Loading />
      ) : (
        <>
          <div className="container mx-auto py-5 px-10">
            <h1 className="text-center my-5 text-3xl font-bold">
              Welcome to your Dashboard
            </h1>
            <form className="max-w-2xl mx-auto" onSubmit={handleSubmit}>
              <div className="my-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name ? form.name : ""}
                  onChange={handleChange}
                  id="name"
                  placeholder="Enter your name"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="email"
                  className="flex flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  value={form.email ? form.email : ""}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter your email"
                  className="block w-full p-2 text-gray-400 border cursor-not-allowed border-gray-300 rounded-lg text-xs bg-gray-200 focus:ring-0 focus:border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-500 dark:text-gray-400"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="username"
                  className="flex flex-row gap-1 mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={form.username ? form.username : ""}
                  onChange={handleChange}
                  id="username"
                  placeholder="Enter your username"
                  className="block w-full p-2 text-gray-900 border cursor-not-allowed border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="profilepic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Profile Picture (as URL)
                </label>
                <input
                  type="text"
                  name="profilepic"
                  value={form.profilepic ? form.profilepic : ""}
                  onChange={handleChange}
                  id="profilepic"
                  placeholder="Enter your profile picture"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="description1"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description line 1
                </label>
                <input
                  type="text"
                  name="description1"
                  value={form.description1 ? form.description1 : ""}
                  onChange={handleChange}
                  id="description1"
                  placeholder="Enter first line of your description"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-2">
                <label
                  htmlFor="description2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description line 2
                </label>
                <input
                  type="text"
                  name="description2"
                  value={form.description2 ? form.description2 : ""}
                  onChange={handleChange}
                  id="description2"
                  placeholder="Enter second line of your description"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="block w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-b focus:ring-4 focus:outline-noned dark:focus:ring-blue-800 font-medim text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
