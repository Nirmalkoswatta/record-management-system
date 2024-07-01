import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import backgroundImage from "../../src/assets/image5.jpg";
import Navbar from "../components/Navbar";
import Logo from "../assets/logo.png";

function PetRecordsTable() {
  const [petRecords, setPetRecords] = useState([]);

  useEffect(() => {
    // Fetch all pet records from the backend when the component mounts
    fetchPetRecords();
  }, []);

  const fetchPetRecords = async () => {
    try {
      // Fetch pet records from the backend
      const response = await axios.get(
        "http://localhost:3000/api/records/petRecords"
      );
      // Set the fetched pet records to the state
      setPetRecords(response.data);
    } catch (error) {
      console.error("Failed to fetch pet records:", error);
    }
  };

  const handleDelete = async (id) => {
    // Delete the pet record from the backend
    try {
      await axios.delete(`http://localhost:3000/api/records/petRecords/${id}`);

      // Fetch all pet records from the backend
      fetchPetRecords();
    } catch (error) {
      console.error("Failed to delete pet record:", error);
    }
  };

  return (
    <>
      <nav
        className="relative flex w-full flex-wrap items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-slate-500 lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="flex items-center">
            <a href="#" className="flex items-center">
              <img
                src={Logo}
                alt=""
                style={{ height: "50px" }}
                className="mr-2"
              />
              <span
                className="font-serif font-normal"
                style={{
                  color: "white",
                  fontStyle: "bold",
                  fontSize: "23px",
                }}
              >
                Furry pet clinic
              </span>
            </a>
          </div>
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent4"
            data-twe-collapse-item
          >
            <ul
              className="list-style-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row"
              data-twe-navbar-nav-ref
            ></ul>
            <a href="#" className="hover-text">
              <div className="flex items-center">
                <Link to="/Home">
                  {" "}
                  <span className="font-serif hover-text__inner">Home</span>
                </Link>
              </div>
            </a>

            <div className="flex items-center pl-5">
              <button
                type="button"
                className="dark:text-gray-100 font-serif font-light me-3 bg-primary px-6 pb-2 pt-2.5 text-xs font-light font-semibold leading-normal text-white hover:bg-blue-400 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong rounded-2xl"
              >
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="p-10 w-screen h-screen mx-auto pt-8 bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h1 className="text-4xl text-white font-bold mb-4">Pet Records</h1>
        <div className="w-full flex justify-end">
          <Link to="/add">
            <button className="p-3 rounded-xl bg-green-600 font-bold hover:bg-green-500 text-white transition ease-in-out mb-3">
              Add Pets
            </button>
          </Link>
        </div>
        <table className="w-full border-collapse border rounded-xl">
          <thead>
            <tr className="bg-gray-200 rounded-xl">
              <th className="px-4 py-2 border">Pet Name</th>
              <th className="px-4 py-2 border">Owner Name</th>
              <th className="px-4 py-2 border">Breed</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Special Notes</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {petRecords.map((record, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2 border">{record.petName}</td>
                <td className="px-4 py-2 border">{record.ownerName}</td>
                <td className="px-4 py-2 border">{record.petBreed}</td>
                <td className="px-4 py-2 border">{record.petAge}</td>
                <td className="px-4 py-2 border">{record.specialNotes}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="bg-red-500 hover:bg-red-600 border-none ml-3 text-white p-2 rounded-xl"
                    onClick={() => {
                      handleDelete(record._id);
                    }}
                  >
                    Delete
                  </button>
                  <Link to={`/update/${record._id}`}>
                    <button className="bg-green-500 hover:bg-green-600 border-none ml-3 text-white p-2 rounded-xl">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PetRecordsTable;
