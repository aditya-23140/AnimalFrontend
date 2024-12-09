"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CirclesBackground from "@/components/background";

const User = () => {
    const [owner, setOwner] = useState(null);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/auth/profile/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, 
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setOwner(data.user);
                setPets(data.pets);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <CirclesBackground height={window.innerHeight + 100} />
            <div className="min-h-screen flex flex-col bg-gradient-to-b from-black to-gray-900 text-white">
                <Navbar />
                <main className="flex flex-col md:flex-row p-6 space-x-0 md:space-x-6 z-10">
                    <div className="w-full md:w-1/4 bg-gray-800 p-4 rounded-lg shadow-lg mb-6 md:mb-0">
                        <h2 className="text-xl font-semibold mb-4">Recent Data</h2>
                        <ul className="space-y-4">
                            <li className="p-4 bg-gray-700 rounded-lg">Recent Adoption: {pets[0]?.name}</li>
                            <li className="p-4 bg-gray-700 rounded-lg">Recent Update: {pets[1]?.name}</li>
                        </ul>
                    </div>

                    <div className="w-full md:w-3/4 bg-gray-800 p-6 rounded-lg shadow-lg">
                        <div className="flex items-center mb-6">
                            <img
                                src="/animal.png"
                                alt="Profile"
                                className="rounded-full w-24 h-24 border-2 border-gray-700"
                            />
                            <div className="ml-4">
                                <h1 className="text-2xl font-bold">{owner ? owner.username : "Loading..."}</h1>
                                <p className="text-gray-400">{owner ? owner.email : ""}</p>
                                <p className="mt-1">Some bio about the pet owner goes here.</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-4">Pets Registered</h2>
                            {pets.length > 0 ? (
                                <ul className="space-y-4">
                                    {pets.map((pet, index) => (
                                        <li key={index} className="p-4 bg-gray-700 rounded-lg relative">
                                            <div>Name: {pet.name}</div>
                                            <div>Type: {pet.type}</div>
                                            <div>Breed: {pet.breed}</div>
                                            <div>Category: {pet.category}</div>
                                            <div>Is Public: {pet.isPublic ? "Yes" : "No"}</div>
                                            {/* Render Pet Image */}
                                            {pet.photos && (
                                                <div className="mt-2 absolute top-0 right-4">
                                                    <img
                                                        src={`http://localhost:8000${pet.photos}`}
                                                        alt={pet.name}
                                                        className="w-auto h-[8em] rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400">None</p>
                            )}
                            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition duration-200">
                                <a href="/user/update">Update Pets</a>
                            </button>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
                            <div className="p-4 bg-gray-700 rounded-lg">
                                <p className="text-gray-400">No recent activity found.</p>
                                <div className="h-32 bg-gray-600 mt-2 rounded-lg"></div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default User;
