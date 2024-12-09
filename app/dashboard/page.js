"use client";
import React, { useState,useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { src: "/ichigo.jpg", alt: "Slide 1" },
    { src: "/bg.avif", alt: "Slide 2" },
    { src: "/ichigo.jpg", alt: "Slide 3" },
  ];

  const cards = [
    { topic: "Cats" },
    { topic: "Dogs" },
    { topic: "Goats" },
    { topic: "Cows" },
  ];

  const galleryImages = [
    { src: "/cat-1.jpg", alt: "Gallery Image 1" },
    { src: "/dog-1.jpg", alt: "Gallery Image 2" },
    { src: "/goat-1.jpg", alt: "Gallery Image 3" },
    { src: "/cow-1.jpg", alt: "Gallery Image 4" },
    { src: "/cat-2.jpg", alt: "Gallery Image 5" },
    { src: "/dog-2.jpg", alt: "Gallery Image 6" },
    { src: "/goat-2.jpg", alt: "Gallery Image 7" },
    { src: "/cow-2.jpg", alt: "Gallery Image 8" },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    clearInterval();
  };


  return (
    <div>
      <Navbar />
      <main className="min-h-[79vh] relative">
        <div id="carousel" className="relative w-full">
          <div className="relative h-56 overflow-hidden md:h-96">
            <AnimatePresence>
              {slides.map((slide, index) => (
                index === currentSlide && (
                  <motion.div
                    key={index}
                    className="absolute w-full h-full"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  >
                    <Image
                      src={slide.src}
                      className="block w-full h-full object-cover"
                      alt={slide.alt}
                      width={500}
                      height={300}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-600" : "bg-white"}`}
                  onClick={() => handleSlideChange(index)} // Reset timer on click
                ></button>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-center bg-no-repeat bg-gray-700 relative py-10 lg:py-20 z-10">
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black opacity-50"></div>
          <div className="relative z-10 px-4 mx-auto max-w-screen-xl text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
              Welcome to PetGle
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
              At PetGle, we make pet identification easy and efficient, ensuring your furry friends are always recognized!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="/home"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Get started
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
              <a
                href="/about"
                className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
              >
                Learn more
              </a>
            </div>
          </div>
        </section>



        <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group opacity-0 pointer-events-auto"
          onClick={handlePrev}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group opacity-0 pointer-events-auto"
          onClick={handleNext}
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
            <svg
              className="w-4 h-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
  {galleryImages.map((image, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-full overflow-hidden"
    >
      <Image
        className="h-40 w-full object-cover rounded-lg" // Set a fixed height and use object-cover
        src={image.src}
        alt={image.alt}
        width={400} // Adjust width as necessary
        height={200} // Adjust height as necessary
      />
    </motion.div>
  ))}
</div>


        <div className="flex flex-wrap items-center justify-center pt-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="max-w-sm w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-transform duration-300 transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{card.topic}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Discover a range of resources for your beloved pets at PetGle.
              </p>
              <a
                href="#"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Learn more
                <svg
                  className="w-3 h-3 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
