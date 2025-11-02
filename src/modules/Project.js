// Project.js
// ===========================================================
// Module: Defines the Project class used to represent a project
// in the to-do list application. Each project holds metadata
// (name, description, timestamps, unique ID) and manages its
// associated tasks within an internal todoList array.
// ===========================================================

/**
 * Represents a single project within the to-do application.
 * Each project maintains its own metadata and list of tasks.
 */
export class Project {

    /**
     * @param {string} name - The name/title of the project.
     * @param {string} description - A short summary or purpose of the project.
     */
    constructor(name, description) {
        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.description = description;

        /** @type {Date} - Timestamp of project creation. */
        this.creationDate = new Date();

        /** @type {Date} - Timestamp of the last project update. */
        this.lastUpdated = new Date();

        /** @type {string} - Unique identifier for this project. */
        this.id = crypto.randomUUID();

        /**
         * @type {Array<Object>} 
         * Array of task objects belonging to this project.
         * Each task should ideally have its own `id` property.
         */
        this.todoList = [];
    }

    /**
     * Adds a new task object to this project's todo list.
     * 
     * @param {Object} task - The task object to be added.
     */
    addTask(task) {
        this.todoList.push(task);
        this.lastUpdated = new Date();
    }

    /**
     * Returns the current state of this project instance.
     * Useful for debugging, serialization, or data retrieval.
     * 
     * @returns {Project} The current project object.
     */
    readProject() {
        return this;
    }

    /**
     * Updates the project’s name and description.
     * Also refreshes the `lastUpdated` timestamp.
     * 
     * @param {string} newName - The new name for the project.
     * @param {string} newDescription - The new description for the project.
     */
    updateProject(newName, newDescription) {
        this.name = newName;
        this.description = newDescription;
        this.lastUpdated = new Date();
    }

    /**
     * Deletes a task from the project’s todo list based on its ID.
     * 
     * @param {string} taskId - The unique identifier of the task to remove.
     */
    deleteTask(taskId) {
        this.todoList = this.todoList.filter(task => task.id !== taskId);
        this.lastUpdated = new Date();
    }
}
