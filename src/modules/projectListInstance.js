/**
 * @module src/modules/projectListInstance
 * @description Singleton project list instance
 */

import { ProjectList } from "./ProjectList.js";

const STORAGE_KEY = 'projectListData';

const projectList = new ProjectList(STORAGE_KEY);

projectList.loadFromLocal();

export { projectList };