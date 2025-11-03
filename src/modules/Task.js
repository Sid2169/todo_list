/**
 * @module src/modules/Task
 * @description Provides Tasks Class for creation of task instances.
 */

/**
 * Class representing a single task object.
 * Handles creation, editing, retrieval, switching completed status of tasks within to-do app.
 */
export class Task {
  // Private fields
  #name;
  #detail;
  #parentProject;
  #dueDate;
  #priority;
  #taskId;
  #creationDate;
  #lastUpdated;
  #completed;

  /**
   * @param {string} name - Name of the task instance
   * @param {string} detail - A description of the task.
   * @param {string} parentProject - Name of the parent project.
   * @param {Date} dueDate - The date when the task is due.
   * @param {string} priority - Priority of the task(low, medium, high).
   */
  constructor(name, detail, parentProject, dueDate, priority) {
    if (!["low", "medium", "high"].includes(priority)) {
      throw new Error("Invalid priority value");
    }

    /** @type {string} */
    this.#name = name;

    /** @type {string} */
    this.#detail = detail;

    /** @type {string} */
    this.#parentProject = parentProject;

    /** @type {Date} */
    this.#dueDate = new Date(dueDate);

    /** @type {string} */
    this.#priority = priority;

    /** @type {string} */
    this.#taskId = crypto.randomUUID();

    /** @type {Date} */
    this.#creationDate = new Date();

    /** @type {Date} */
    this.#lastUpdated = new Date();

    /** @type {boolean} */
    this.#completed = false;
  }

  /**
   * Method for editing the task.
   * @param {string} newName - New name of the task after edit.
   * @param {string} newDetail - New detail of the taks after edit.
   * @param {Date} newDueDate - New due date after edit.
   * @param {string} newPriority - New priority after edit.
   */
  editTask(
    newName = this.#name,
    newDetail = this.#detail,
    newDueDate = this.#dueDate,
    newPriority = this.#priority
  ) {
    this.#name = newName;
    this.#detail = newDetail;
    this.#dueDate = new Date(newDueDate);
    this.#priority = newPriority;
    this.#lastUpdated = new Date();
  }

  /**
   * Method for retrieving the task.
   * @returns {Task} - Returns this task as object.
   */
  readTask() {
    return {
      name: this.#name,
      detail: this.#detail,
      parentProject: this.#parentProject,
      dueDate: new Date(this.#dueDate),
      priority: this.#priority,
      taskId: this.#taskId,
      creationDate: new Date(this.#creationDate),
      lastUpdated: new Date(this.#lastUpdated),
      completed: this.#completed,
    };
  }

  /**
   * Method for switching task status.
   */
  switchStatus() {
    this.#completed = !this.#completed;
    this.#lastUpdated = new Date();
  }
}
