"use client";
import React, { useEffect, useState } from "react";

const MyProjects = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  // Check screen width on mount and update on resize
  useEffect(() => {
    document.title = "My Projects";
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-10 min-h-screen bg-gradient-to-bl from-slate-900 via-purple-900 to-slate-900 text-white py-10">
      <h1 className="text-5xl text-center mb-12 font-bold">My Projects</h1>
      <div className="container mx-auto">
        {/* Project 1: Netflix Clone */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">
            Project 1: Netflix Clone
          </span>
          {isLargeScreen ? (
            <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
              <iframe
                src="https://rxshabn.github.io/Netflix_Clone/"
                title="Netflix Clone"
                className="w-full h-[60vh]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href="https://rxshabn.github.io/Netflix_Clone/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit Netflix Clone
            </a>
          )}
          <div className="p-4">
            <h2 className="text-xl mb-2">Netflix Clone</h2>
            <p>
              This is a static webpage built using HTML and CSS. It was my first
              project and looks exactly like the Netflix landing page, but it
              isn't functional.
            </p>
          </div>
        </div>

        <div className="h-0.5 bg-white opacity-15 my-16"></div>

        {/* Project 2: Spotify Clone */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">
            Project 2: Spotify Clone
          </span>
          {isLargeScreen ? (
            <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
              <iframe
                src="https://spotifyrn.freewebhostmost.com/"
                title="Spotify Clone"
                className="w-full h-[55vh]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href="https://spotifyrn.freewebhostmost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit the Spotify Clone
            </a>
          )}
          <div className="p-4">
            <h2 className="text-xl mb-2">Spotify Clone</h2>
            <p>
              This website was built using HTML, CSS, and JS. It is completely
              responsive, functional on any device, and was my second project.
            </p>
          </div>
        </div>

        <div className="h-0.5 bg-white opacity-15 my-16"></div>

        {/* Project 3: To-do List */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">Project 3: To-do List</span>
          {isLargeScreen ? (
            <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
              <iframe
                src="https://rxshabn.github.io/To-do-list/"
                title="To-Do List"
                className="w-full h-[55vh]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href="https://rxshabn.github.io/To-do-list/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit the To-Do List App
            </a>
          )}
          <div className="p-4">
            <h2 className="text-xl mb-2">To-Do List Application</h2>
            <p>
              A React-based application that stores to-dos in local storage and
              can efficiently perform CRUD operations. Packaged using Vite +
              React.
            </p>
          </div>
        </div>

        <div className="h-0.5 bg-white opacity-15 my-16"></div>

        {/* Project 4: Password Manager */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-semibold">
            Project 4: Password Manager
          </span>
          {isLargeScreen ? (
            <div className="relative overflow-hidden rounded-lg border-4 border-[#4C212A] hover:shadow-lg hover:shadow-[#fffafa] transition-all duration-200 ease-linear">
              <iframe
                src="https://rxshabn.github.io/Password-Manager/"
                title="Password Manager"
                className="w-full h-[60vh]"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          ) : (
            <a
              href="https://rxshabn.github.io/Password-Manager/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Visit the Password Manager
            </a>
          )}
          <div className="p-4">
            <h2 className="text-xl mb-2">Password Manager</h2>
            <p>
              This application uses local storage to save and manage CRUD
              operations for passwords. It was built using React and Tailwind
              CSS.
            </p>
          </div>
        </div>

        <div className="h-0.5 bg-white opacity-15 my-16"></div>
      </div>

      <div className="text-white container mx-auto py-2">
        <h1 className="text-xl text-center mb-8">
          To view my other projects on GitHub, click on the logo
        </h1>
        <a
          href="https://github.com/rxshabN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/imageedit_3_6316064818.png"
            alt="GitHub Logo"
            width={150}
            className="mx-auto border border-collapse rounded-full hover:shadow-purple-800 hover:shadow-xl transition-all duration-200 ease-linear"
          />
        </a>
      </div>
    </div>
  );
};

export default MyProjects;
