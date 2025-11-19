/**
 * @module src/modules/projectListInstance
 * @description Provides a preconfigured singleton instance of ProjectList,
 * initialized with a specific Local Storage key for persistence.
 */

import { ProjectList } from "./ProjectList.js";

/**
 * Local Storage key used by the singleton ProjectList instance.
 * @type {string}
 */
const STORAGE_KEY = "projectListData";

/**
 * Singleton instance of ProjectList.
 * Configured with a storage key to enable automatic local persistence.
 * @type {ProjectList}
 */
const projectList = new ProjectList(STORAGE_KEY);

/**
 * Load existing project data from Local Storage (if any),
 * populating the singleton instance at module initialization.
 */
projectList.loadFromLocal();

export { projectList };
