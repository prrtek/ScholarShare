import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../conf/config";
import { Link, useNavigate } from "react-router-dom";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsRef = collection(db, "projects");
      const projectsSnapshot = await getDocs(projectsRef);
      const projectsData = projectsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className='project-list flex flex-wrap ml-8 gap-8'>
      {projects.map((project) => (
        <div
          key={project.id}
          className='project-card w-64 h-64 bg-gray-800 text-white rounded-lg shadow-md p-4'
          onClick={() => handleCardClick(project.id)}
        >
          <Link to={`/project/${project.id}`}>
            <img
              src={project.photoUrl}
              alt={project.names}
              className='project-photo w-full h-40 object-cover rounded-lg mb-2'
            />
            <div className='project-details text-center'>
              <h3 className='text-lg font-semibold'>{project.names}</h3>

              <h3 className='text-gradient mt-2'>By: {project.createdBy}</h3>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Project;
