/**
 * @module src/modules/ProjectList 
 * @description This module contain ProjectList class to create a list object containing project IDs as keys and corresponding project object as values.
 */

/**
 * Represents a single Project List within the to-do application.
 */
export class ProjectList {
    
    /**
     * Method to add new project to the project list
     * @param {object} project New project object to be added to the List.
     */
    addProject(project) {
        this[project.id] = project;
    }

    /**
     * Method to delete a project from the project list.
     * @param {string} projectId Unique id of the project to be deleted. 
     */
    deleteProject(projectId) {
        delete this[projectId];
    }
}