// Array to hold all projects
const projects = [];

// Create a default home project
const homeProject = project("Home");

/**
 * Factory function to create a project object.
 * @param {string} title - The title of the project.
 * @returns {Object} The project object with task management methods.
 */
function project(title) {
    // Array to hold tasks for this project
    const tasks = [];

    // Method to add a task to the project's task list
    const addTask = (task) => tasks.push(task) - 1; // Returns the index of the newly added task

    // Method to delete a task from the project's task list by index
    const deleteTask = (taskIndex) => tasks.splice(taskIndex, 1);

    return {
        title,
        tasks,
        addTask,
        deleteTask
    };
}

// Export the home project for use in other modules
export { homeProject };
