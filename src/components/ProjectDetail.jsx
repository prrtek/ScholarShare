import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../conf/config";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectDetail = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (projectSnapshot.exists()) {
          setProject({ id: projectSnapshot.id, ...projectSnapshot.data() });
        } else {
          // Handle case where project with specified ID doesn't exist
          console.log("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    try {
      // Assuming 'projects' is your Firestore collection name
      const projectDocRef = doc(db, "projects", projectId);

      // Delete the project document
      await deleteDoc(projectDocRef);

      // Navigate back to the projects list or another suitable location
      navigate("/project");

      // Alternatively, you can replace the above line with any other logic
      // to handle the user interface after successful deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!project) {
    return <p>Loading...</p>; // Add loading state or spinner
  }
  const redirectToLiveLink = () => {
    window.location.href = project.liveLink;
  };

  return (
    <div className='project-detail bg-primary shadow-lg rounded-lg overflow-hidden'>
      <div className='flex justify-center' onClick={redirectToLiveLink}>
        <img
          src={project.photoUrl}
          alt={project.names}
          className='project-photo w-3/5 h-90 object-cover rounded-lg mb-2'
        />
      </div>
      <div className='project-details text-center p-6'>
        <h2 className='text-3xl text-gradient font-semibold mb-2'>
          {project.names}
        </h2>
        {project.problemStatement && (
          <div className='mb-4'>
            <h3 className='text-lg text-secondary font-semibold mb-1 mt-1'>
              Problem Statement:
            </h3>
            <p className='text-base text-gray-600 max-w-[80vw] mx-auto line-clamp-3'>
              {project.problemStatement}
            </p>
          </div>
        )}
        <h3 className='text-lg text-secondary font-semibold mb-1'>
          Description:
        </h3>
        <p className='text-base text-gray-600 my-4 max-w-[80vw] mx-auto line-clamp-10'>
          {project.description}
        </p>
        <h3 className='text-lg text-secondary font-semibold mb-4'>
          By: {project.createdBy}
        </h3>

        {/* Display Problem Statement */}

        {/* Delete button */}
        <button
          className={`bg-red-500 text-white py-2 px-4 rounded-full ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleDeleteProject}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Project"}
        </button>

        {/* Add other project details here */}
      </div>
      <div className='absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient' />
    </div>
  );
};

export default ProjectDetail;
