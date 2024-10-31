import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; 
import ProjectCard from "./ProjectCard";
import { deleteProject } from "../context/actions/projectActions"; 

const Projects = () => {
  const dispatch = useDispatch(); 
  const allProjects = useSelector((state) => state.projects?.projects);
  const searchTerm = useSelector((state) =>
    state.searchTerm?.searchTerm ? state.searchTerm?.searchTerm : ""
  );
  const [projects, setProjects] = useState(allProjects); // Local state for projects
  const [filtered, setFiltered] = useState(null);

  useEffect(() => {
    if (searchTerm?.length > 0) {
      setFiltered(
        projects?.filter((project) => {
          const lowerCaseItem = project?.title.toLowerCase();
          return searchTerm
            .split("")
            .every((letter) => lowerCaseItem.includes(letter));
        })
      );
    } else {
      setFiltered(null);
    }
  }, [searchTerm, projects]);

  // Handle project deletion
  const handleDeleteProject = async (projectId) => {
    await dispatch(deleteProject(projectId)); 
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  return (
    <div className="w-full py-6 flex items-center justify-center gap-6 flex-wrap">
      {filtered ? (
        <>
          {filtered.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDelete={handleDeleteProject} // Pass onDelete function
            />
          ))}
        </>
      ) : (
        <>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onDelete={handleDeleteProject} // Pass onDelete function
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Projects;
