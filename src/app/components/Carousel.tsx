"use client"

import React, { useState, useEffect } from 'react'
import WorkCard from './WorkCard'; 
import { AnimatePresence, motion } from "framer-motion";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  const works = [
     {
      title: "CapCheck",
      description: "From the final group project on the Northcoders' bootcamp, CapCheck is a comprehensive mushroom identification app featuring an interactive map with real-time sighting locations, rainfall overlays, and searchable species markers, plus a database of over 250 mushrooms with advanced filtering by edibility and season. The app includes personalized user profiles with photo uploads, discovery tracking, and achievement systems, all built with a mobile-first design supporting both iOS and Android platforms.",
      description2:"CapCheck is built with React Native and Expo for cross-platform mobile development, featuring TypeScript, React Navigation, and React Native Maps with Google Maps integration for interactive mapping functionality. The backend utilizes FastAPI with Python for the API layer, PostgreSQL for data storage, and integrates external services like OpenWeatherMap for weather overlays, all hosted on the Render cloud platform.",
      imageUrl: "/capcheck.png",
      isModal: true,
      videoUrl: "https://0eswuvlc9p7jubst.public.blob.vercel-storage.com/CapCheck-Demo-fUHd6hUvzVbCJAKTX83ClzFKjzk7mK.mp4" 
    },
     {
      title: "Duologue: poetry slot machine",
      description: "A  poetry fruit machine that produces unique alignments and word patterns from the long poem \Duologue\. Using react and pure CSS to create a simple slot machine experience and random phrase generator, based on one of my poems. All logic in JS and CSS, no backend.",
      imageUrl: "/duologue.png",
      url: "https://duologue-slot-machine.netlify.app/"
    },
    {
      title: "Tic-Tac-Toe",
      description: "A basic two-player Tic-Tac-Toe game built with React and CSS, desktop-only. The game features a simple and intuitive interface, allowing players to take turns marking their spaces on a 3x3 grid. It's built with canvas for rendering and includes basic game logic to determine the winner or a draw.",
      imageUrl: "/ttt.png",
      url: "https://nought.netlify.app/"
    },
    {
      title: "Planet of the Day",
      description: "A React application that displays a new planet every day from NASA's API, showcasing the beauty of our solar system through a modal info page. The app features a clean and responsive design, allowing users to explore, on different days, various planets with detailed information and images, randomly selected from Nasa's API.",
      imageUrl: "/potd.png",
      url: "https://planetoftheday.netlify.app/"
    },
    {
      title: "Nc News App",
      description: "A solo project from the Northcoder's bootcampA full-stack news application built with React and Node.js, featuring user authentication, article creation, and commenting. My first experience with a full-stack application using react, constructing APIs to a database hosted on Render, and deploying a React frontend to Netlify.",
      imageUrl: "/nc-news.png",
      url: "https://ncnews-t0mmy-pearson.netlify.app/"
    },
    {
      title: "A Quick To-Do list",
      description: "React application that allows users to create, manage, and track their tasks. Quick and easy to use. A tutorial completed during the Northcoders bootcamp, this app features a simple and intuitive interface for task management, allowing users to add, edit, and delete tasks with ease. It includes basic functionality such as task completion tracking and local storage for persistence.",
      imageUrl: "/Tdl.png",
      url: "https://yourquicktodolist.netlify.app/"
    }
  ];

  const getVisibleWorks = () => {
    let numCards = 1;
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 768) numCards = 3; // md
      else if (window.innerWidth >= 640) numCards = 2; // sm
    }
    const visible = [];
    for (let i = 0; i < numCards; i++) {
      visible.push(works[(currentIndex + i) % works.length]);
    }
    return visible;
  };

  // Update on resize for responsiveness
    useEffect(() => {
    const handleResize = () => setCurrentIndex(0);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % works.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + works.length) % works.length);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <div className="carousel-container relative max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-4 border-b border-[#9e0060]-200 border-r border-[#9e0060]-200 border-l border-[#9e0060]-200">
      <h2 className="text-2xl font-semibold mb-4 text-center">Projects</h2>
      {/* Carousel wrapper */}
      <div className="carousel-slide relative overflow-hidden rounded-lg w-full flex justify-center border-b border-[#9e0060]-200">
        <div className="flex w-full justify-center gap-2 sm:gap-4 relative min-h-[350px]">
          <AnimatePresence initial={false} custom={direction}>
            {getVisibleWorks().map((work, idx) => (
              <motion.div
                key={work.title + currentIndex + idx}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex-shrink-0 flex justify-center w-full max-w-xs sm:max-w-sm md:max-w-md"
              >
                <WorkCard
                  work={work}
                  onModalOpen={work.isModal && work.title === "CapCheck" ? openModal : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-0 sm:left-4 top-8 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#9e0060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-8 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200 z-10"
      >
        <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#9e0060]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5l7 7-7 7" />
        </svg>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4" onClick={closeModal}>
          <div
            className="bg-white rounded-lg p-3 sm:p-4 max-w-xs sm:max-w-2xl w-full mx-2 sm:mx-4 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors z-30"
            >
              x
            </button>
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 pr-6 sm:pr-8 text-black">CapCheck Demo</h2>
            <video
              controls
              autoPlay
              className="w-full h-auto rounded max-h-48 sm:max-h-80"
            >
              <source src="https://0eswuvlc9p7jubst.public.blob.vercel-storage.com/CapCheck-Demo-fUHd6hUvzVbCJAKTX83ClzFKjzk7mK.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-2 sm:mt-4">
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {works[0].description2}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


