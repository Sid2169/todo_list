/**
 * @module src/modules/projectListInstance
 * @description Singleton project list instance 
 */

import { ProjectList } from "./ProjectList.js";

const STORAGE_KEY = 'projectListData';

const projectList = new ProjectList();

projectList.loadFromLocal(STORAGE_KEY);

export { projectList };