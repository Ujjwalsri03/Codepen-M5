export const SET_PROJECTS = (projects) => {
    return {
        type: "SET_PROJECTS",
        projects: projects,
    }
};

export const SET_PROJECTS_NULL = () => {
    return {
        type: "SET_PROJECTS_NULL",
    }
}

export const deleteProject = (projectId) => ({
    type: "DELETE_PROJECT",
    projectId, 
});

