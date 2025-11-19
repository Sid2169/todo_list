/**
 * @module src/modules/ProjectList
 * @description Provides the ProjectList class for managing a collection of project objects,
 * where each project is indexed by its unique ID.
 */

/**
 * Class representing a list of projects.
 * Handles creation, addition, retrieval, and deletion of projects within the to-do app.
 */
export class ProjectList {
  #projects;
  #STORAGE_KEY;

  /**
   * Create a new ProjectList instance.
   * Initializes an empty project map.
   * 
   * @param {string} storageKey - Local Storage key for project list instance
   */
  constructor(storageKey = "defaultKey") {
    /**
     * Internal storage for projects, using project IDs as keys.
     * @type {Object.<string, object>}
     * @private
     */
    this.#projects = {};

    /**
     * Storage Key for local storage
     * @type {string}
     * @private
     */
    this.#STORAGE_KEY = storageKey;
  }

  /**
   * Add a new project to the project list.
   * If a project with the same ID already exists, it will be overwritten.
   *
   * @param {object} project - The project object to be added.
   * @param {string} project.id - The unique identifier for the project.
   * @throws {Error} Throws an error if project or project.id is missing.
   */
  addProject(project) {
    if (!project || !project.id) {
      throw new Error(
        "Invalid project: project object and project.id are required."
      );
    }

    this.#projects[project.id] = project;
  }

  /**
   * Retrieve a project by its ID.
   *
   * @param {string} projectId - The unique identifier of the project to retrieve.
   * @returns {object|null} The project object if found, otherwise null.
   */
  getProject(projectId) {
    return this.#projects[projectId] || null;
  }

  /**
   * Delete a project from the project list.
   *
   * @param {string} projectId - The unique ID of the project to delete.
   * @returns {boolean} True if the project existed and was deleted, false otherwise.
   */
  deleteProject(projectId) {
    if (!this.#projects.hasOwnProperty(projectId)) {
      return false;
    }

    delete this.#projects[projectId];
    return true;
  }

  /**
   * Retrieve all projects in the list.
   *
   * @returns {object[]} Array of all project objects.
   */
  getAllProjects() {
    // Return copies to avoid external mutations
    return Object.values(this.#projects).map((project) => ({ ...project }));
  }
  
  /**
   * Save the project list to localStorage.
   */
  saveToLocal() {
    const data = JSON.stringify(this.#projects);
    localStorage.setItem(this.#STORAGE_KEY, data);
    return true;
  }

  /**
   * Load the project list from localStorage
   * Replace the current project list.
   */
  loadFromLocal() {
    const stored = localStorage.getItem(this.#STORAGE_KEY);
    if(!stored) {
      this.#projects = {};
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      if (typeof parsed !== "object" || parsed === null) {
        this.#projects = {};
        return;
      }

      this.#projects = parsed;
    } catch {
      this.#projects = {};
    }
  }
}