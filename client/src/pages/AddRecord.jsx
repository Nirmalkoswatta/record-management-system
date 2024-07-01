import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImage from "../../src/assets/image5.jpg";

function AddRecord() {
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending data to the backend
      await axios.post("http://localhost:3000/api/records/petRecords", {
        petName,
        ownerName,
        petBreed,
        petAge,
        specialNotes,
      });
      // Resetting the form and error message
      setPetName("");
      setOwnerName("");
      setPetBreed("");
      setPetAge("");
      setSpecialNotes("");
      setErrorMessage("");
      alert("Pet record added successfully!");
    } catch (error) {
      // Handling errors
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to add pet record");
      }
    }
  };

  return (
    <div
      className="w-screen h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-md mx-auto pt-8">
        <h1 className="text-4xl font-bold pb-3">Add Pets</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="petName"
            >
              Pet Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="petName"
              type="text"
              placeholder="Enter pet's name"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="ownerName"
            >
              Owner Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ownerName"
              type="text"
              placeholder="Enter owner's name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="petBreed"
            >
              Pet Breed
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="petBreed"
              type="text"
              placeholder="Enter pet's breed"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="petAge"
            >
              Pet Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="petAge"
              type="nu"
              placeholder="Enter pet's age"
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="specialNotes"
            >
              Special Notes
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specialNotes"
              placeholder="Enter any special notes about the pet"
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Record
            </button>
            <Link to="/view">
              <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Back
              </button>
            </Link>
          </div>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default AddRecord;
