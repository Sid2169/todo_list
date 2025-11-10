import { ProjectList } from './ProjectList';

describe('ProjectList', () => {
  let projectList;

  beforeEach(() => {
    projectList = new ProjectList();
  });

  describe('addProject()', () => {
    it('should add a project successfully', () => {
      const project = { id: 'p1', name: 'Project Alpha' };
      projectList.addProject(project);

      expect(projectList.getProject('p1')).toEqual(project);
    });

    it('should overwrite an existing project with the same ID', () => {
      const projectA = { id: 'p1', name: 'Project Alpha' };
      const projectB = { id: 'p1', name: 'Project Beta' };

      projectList.addProject(projectA);
      projectList.addProject(projectB);

      expect(projectList.getProject('p1')).toEqual(projectB);
    });

    it('should throw an error if project is missing', () => {
      expect(() => projectList.addProject()).toThrow(
        'Invalid project: project object and project.id are required.'
      );
    });

    it('should throw an error if project.id is missing', () => {
      expect(() => projectList.addProject({ name: 'No ID' })).toThrow(
        'Invalid project: project object and project.id are required.'
      );
    });
  });

  describe('getProject()', () => {
    it('should return the correct project when it exists', () => {
      const project = { id: 'p2', name: 'Project Gamma' };
      projectList.addProject(project);

      expect(projectList.getProject('p2')).toEqual(project);
    });

    it('should return null when the project does not exist', () => {
      expect(projectList.getProject('nonexistent')).toBeNull();
    });
  });

  describe('deleteProject()', () => {
    it('should delete an existing project and return true', () => {
      const project = { id: 'p3', name: 'Project Delta' };
      projectList.addProject(project);

      const result = projectList.deleteProject('p3');
      expect(result).toBe(true);
      expect(projectList.getProject('p3')).toBeNull();
    });

    it('should return false when trying to delete a non-existent project', () => {
      const result = projectList.deleteProject('unknown');
      expect(result).toBe(false);
    });
  });

  describe('getAllProjects()', () => {
    it('should return an array of all projects', () => {
      const p1 = { id: '1', name: 'A' };
      const p2 = { id: '2', name: 'B' };
      projectList.addProject(p1);
      projectList.addProject(p2);

      const allProjects = projectList.getAllProjects();
      expect(allProjects).toHaveLength(2);
      expect(allProjects).toEqual(expect.arrayContaining([p1, p2]));
    });

    it('should return copies, not references to internal objects', () => {
      const p1 = { id: '1', name: 'Immutable Project' };
      projectList.addProject(p1);

      const allProjects = projectList.getAllProjects();
      allProjects[0].name = 'Changed Name';

      expect(projectList.getProject('1').name).toBe('Immutable Project');
    });
  });

  describe('convertToString()', () => {
    it('should return a JSON string of the project list', () => {
      const p1 = { id: 'a', name: 'Serialized Project' };
      projectList.addProject(p1);

      const result = projectList.convertToString();
      expect(result).toBe(JSON.stringify([p1]));
    });
  });

  describe('convertToObject()', () => {
    it('should convert a JSON string back to an object', () => {
      const projects = [{ id: 'x', name: 'Deserialized Project' }];
      const jsonString = JSON.stringify(projects);

      const result = projectList.convertToObject(jsonString);
      expect(result).toEqual(projects);
    });

    it('should throw an error when parsing invalid JSON', () => {
      expect(() => projectList.convertToObject('invalid json')).toThrow();
    });
  });
});
