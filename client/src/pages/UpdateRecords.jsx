import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import backgroundImage from "../../src/assets/image5.jpg";

function UpdateRecord() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [petRecord, setPetRecord] = useState(null);
  const [petName, setPetName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petAge, setPetAge] = useState("");
  const [specialNotes, setSpecialNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPetRecord(id);
  }, [id]);

  const fetchPetRecord = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/records/petRecords/${id}`
      );
      setPetRecord(response.data);
      setPetName(response.data.petName);
      setOwnerName(response.data.ownerName);
      setPetBreed(response.data.petBreed);
      setPetAge(response.data.petAge);
      setSpecialNotes(response.data.specialNotes);
      setErrorMessage("");
    } catch (error) {
      console.error("Failed to fetch pet record:", error);
      setErrorMessage("Failed to fetch pet record");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/records/petRecords/${id}`, {
        petName,
        ownerName,
        petBreed,
        petAge,
        specialNotes,
      });
      alert("Pet record updated successfully!");
      navigate("/view");
    } catch (error) {
      console.error("Failed to update pet record:", error);
      setErrorMessage("Failed to update pet record");
    }
  };

  return (
    <div
      className="w-screen h-screen mx-auto pt-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">
          Update Pet Record
        </h1>
        {petRecord && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="petName"
                  className="block text-sm font-medium text-black"
                >
                  Pet Name
                </label>
                <input
                  type="text"
                  id="petName"
                  className="mt-1 p-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="ownerName"
                  className="block text-sm font-medium text-black"
                >
                  Owner Name
                </label>
                <input
                  type="text"
                  id="ownerName"
                  className="mt-1 p-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="petBreed"
                  className="block text-sm font-medium text-black"
                >
                  Pet Breed
                </label>
                <input
                  type="text"
                  id="petBreed"
                  className="mt-1 p-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={petBreed}
                  onChange={(e) => setPetBreed(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="petAge"
                  className="block text-sm font-medium text-black"
                >
                  Pet Age
                </label>
                <input
                  type="text"
                  id="petAge"
                  className="mt-1 p-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={petAge}
                  onChange={(e) => setPetAge(e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="specialNotes"
                  className="block text-sm font-medium text-gray-700"
                >
                  Special Notes
                </label>
                <textarea
                  id="specialNotes"
                  className="mt-1 p-2 border border-gray-300 block w-full rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Record
              </button>
              <Link to="/view">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-slate-600 hover:bg-slate-700 ml-5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
              </Link>
            </div>
            {errorMessage && (
              <p className="mt-4 text-sm text-red-600" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default UpdateRecord;
