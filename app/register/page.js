// pages/register.js
"use client";
import { useState } from "react";

export default function RegisterAnimal() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          setMessage(
            `Animal registered successfully! Animal ID: ${data.animal_id}`
          );
        } else {
          setMessage(`Error: ${data.error}`);
        }
      } else {
        setMessage(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Register Animal</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-gray-800 font-semibold text-center">
          {message}
        </p>
      )}
    </div>
  );
}
