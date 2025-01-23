"use client";
import { useState } from "react";
import Image from "next/image";

export default function SearchAnimal() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setResults([]);

    const formData = new FormData();
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await fetch("http://localhost:8000/api/search_animal/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResults(data.matches);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Search Animal</h1>

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
          className={`w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-red-500 font-semibold text-center">{message}</p>
      )}

      {results.length > 0 && (
        <div className="mt-6 w-full max-w-lg" style={{ color: "black" }}>
          <h2 className="text-lg font-bold mb-2">Search Results</h2>
          <ul className="space-y-4">
            {results.map((result, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded shadow-sm"
              >
                <p>
                  <strong>Animal ID:</strong> {result.animal_id}
                </p>
                <p>
                  <strong>Similarity:</strong>{" "}
                  {(result.similarity * 100).toFixed(2)}%
                </p>
                <div className="flex space-x-2 mt-2">
                  {result.images.map((img, i) => (
                    <Image
                      key={i}
                      src={`http://localhost:8000/media/${img}`}
                      alt="Animal"
                      className="w-16 h-16 object-cover border border-gray-300 rounded"
                      width={64}
                      height={64}
                      onError={(e) => {
                        e.target.src = "/fallback-image.jpg"; // Fallback image if fails
                      }}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
