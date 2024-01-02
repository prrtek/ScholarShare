import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../conf/config";

export default function Create() {
  const [names, setName] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const createProject = async (e) => {
    e.preventDefault();

    // Basic validation to check if required fields are not empty
    const errors = {};
    if (!createdBy) errors.createdBy = "Please enter your name";
    if (!names) errors.names = "Please enter a project name";
    if (!photoUrl) errors.photoUrl = "Please enter a photo URL";
    if (!description) errors.description = "Please enter a project description";

    // Update state with validation errors
    setFormErrors(errors);

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const projectData = {
        createdBy,
        names,
        photoUrl,
        description,
        liveLink,
        problemStatement,
      };

      // Add the project data to Firestore
      const docRef = await addDoc(collection(db, "projects"), projectData);
      console.log("Project created with ID: ", docRef.id);

      // Reset the form fields and errors
      setCreatedBy("");
      setName("");
      setPhotoUrl("");
      setDescription("");
      setLiveLink("");
      setProblemStatement("");
      setFormErrors({});
    } catch (error) {
      console.error("Error creating project: ", error);
    }

    navigate("/project");
  };

  const handleInputChange = (field, value) => {
    // Clear the error for the specific field when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));

    // Update the state with the new value
    switch (field) {
      case "createdBy":
        setCreatedBy(value);
        break;
      case "names":
        setName(value);
        break;
      case "photoUrl":
        setPhotoUrl(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "liveLink":
        setLiveLink(value);
        break;
      case "problemStatement":
        setProblemStatement(value);
        break;
      default:
        break;
    }
  };

  return (
    <section className='p-2 font-sans'>
      <div className='flex items-center justify-center bg-primary px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
        <div className='xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md'>
          <div className='mb-2'>
            <svg
              width='50'
              height='56'
              viewBox='0 0 50 56'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z'
                fill='cyan'
              />
            </svg>
          </div>
          <h2 className='text-2xl font-bold leading-tight text-white'>
            Create New Project
          </h2>
          <form onSubmit={createProject} className='mt-8'>
            <div className='space-y-5'>
              <div>
                <label
                  htmlFor='createdBy'
                  className='text-base font-medium text-white'
                >
                  Created By
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='createdBy'
                    value={createdBy}
                    onChange={(e) =>
                      handleInputChange("createdBy", e.target.value)
                    }
                    className={`flex h-10 w-full rounded-md border ${
                      formErrors.createdBy
                        ? "border-red-500"
                        : "border-gray-300"
                    } bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                      formErrors.createdBy ? "ring-red-500" : ""
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Your Name'
                  />
                  {formErrors.createdBy && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.createdBy}
                    </p>
                  )}
                </div>
              </div>

              {/* Repeat similar logic for other form fields */}

              <div>
                <label
                  htmlFor='name'
                  className='text-base font-medium text-white'
                >
                  Project Name
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='name'
                    value={names}
                    onChange={(e) => handleInputChange("names", e.target.value)}
                    className={`flex h-10 w-full rounded-md border ${
                      formErrors.names ? "border-red-500" : "border-gray-300"
                    } bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                      formErrors.names ? "ring-red-500" : ""
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Project Name'
                  />
                  {formErrors.names && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.names}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='problemStatement'
                  className='text-base font-medium text-white'
                >
                  Problem Statement
                </label>
                <div className='mt-2'>
                  <textarea
                    id='problemStatement'
                    value={problemStatement}
                    onChange={(e) =>
                      handleInputChange("problemStatement", e.target.value)
                    }
                    className={`flex h-10 w-full rounded-md border ${
                      formErrors.problemStatement
                        ? "border-red-500"
                        : "border-gray-300"
                    } bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                      formErrors.problemStatement ? "ring-red-500" : ""
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Problem Statement'
                  />
                  {formErrors.problemStatement && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.problemStatement}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='photoUrl'
                  className='text-base font-medium text-white'
                >
                  Photo URL
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='photoUrl'
                    value={photoUrl}
                    onChange={(e) =>
                      handleInputChange("photoUrl", e.target.value)
                    }
                    className={`flex h-10 w-full rounded-md border ${
                      formErrors.photoUrl ? "border-red-500" : "border-gray-300"
                    } bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                      formErrors.photoUrl ? "ring-red-500" : ""
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Photo URL'
                  />
                  {formErrors.photoUrl && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.photoUrl}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='description'
                  className='text-base font-medium text-white'
                >
                  Description
                </label>
                <div className='mt-2'>
                  <textarea
                    id='description'
                    value={description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className={`flex h-10 w-full rounded-md border ${
                      formErrors.description
                        ? "border-red-500"
                        : "border-gray-300"
                    } bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 ${
                      formErrors.description ? "ring-red-500" : ""
                    } disabled:cursor-not-allowed disabled:opacity-50`}
                    placeholder='Project Description'
                  />
                  {formErrors.description && (
                    <p className='text-red-500 text-sm mt-1'>
                      {formErrors.description}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='liveLink'
                  className='text-base font-medium text-white'
                >
                  Link
                </label>
                <div className='mt-2'>
                  <input
                    type='text'
                    id='liveLink'
                    value={liveLink}
                    onChange={(e) =>
                      handleInputChange("liveLink", e.target.value)
                    }
                    className='flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1'
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='inline-flex w-full items-center justify-center rounded-md bg-blue-gradient px-3.5 py-2.5 font-semibold leading-7 text-primary hover:bg-secondary/80'
                >
                  Create New Project <ArrowRight className='ml-2' size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
    </section>
  );
}
