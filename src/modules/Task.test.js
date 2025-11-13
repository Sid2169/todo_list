import { Task } from '../../src/modules/Task';

describe('Task', () => {
  let task;
  const baseData = {
    name: 'Test Task',
    detail: 'This is a test task.',
    parentProject: 'Project Alpha',
    dueDate: '2025-12-25',
    priority: 'medium',
  };

  beforeEach(() => {
    task = new Task(
      baseData.name,
      baseData.detail,
      baseData.parentProject,
      baseData.dueDate,
      baseData.priority
    );
  });

  describe('constructor', () => {
    it('should create a valid Task instance with correct properties', () => {
      const data = task.readTask();

      expect(data.name).toBe(baseData.name);
      expect(data.detail).toBe(baseData.detail);
      expect(data.parentProject).toBe(baseData.parentProject);
      expect(data.dueDate).toBeInstanceOf(Date);
      expect(data.priority).toBe(baseData.priority);
      expect(typeof data.taskId).toBe('string');
      expect(data.completed).toBe(false);
    });

    it('should throw an error for invalid priority value', () => {
      expect(
        () => new Task('Task', 'Detail', 'Project', '2025-12-25', 'urgent')
      ).toThrow('Invalid priority value');
    });

    it('should generate a unique taskId each time', () => {
      const task2 = new Task(
        baseData.name,
        baseData.detail,
        baseData.parentProject,
        baseData.dueDate,
        baseData.priority
      );

      const data1 = task.readTask();
      const data2 = task2.readTask();

      expect(data1.taskId).not.toBe(data2.taskId);
    });
  });

  describe('readTask()', () => {
    it('should return a complete and accurate task object', () => {
      const result = task.readTask();

      expect(result).toMatchObject({
        name: baseData.name,
        detail: baseData.detail,
        parentProject: baseData.parentProject,
        priority: baseData.priority,
        completed: false,
      });
      expect(result.dueDate).toBeInstanceOf(Date);
      expect(result.creationDate).toBeInstanceOf(Date);
      expect(result.lastUpdated).toBeInstanceOf(Date);
    });

    it('should return a copy of internal data (immutable)', () => {
      const taskData = task.readTask();
      taskData.name = 'Changed';
      const newData = task.readTask();
      expect(newData.name).toBe(baseData.name);
    });
  });

  describe('editTask()', () => {
    it('should update task properties and lastUpdated timestamp', () => {
      const oldData = task.readTask();
      const newValues = {
        name: 'Updated Task',
        detail: 'Updated details',
        dueDate: '2026-01-01',
        priority: 'high',
      };

      task.editTask(
        newValues.name,
        newValues.detail,
        newValues.dueDate,
        newValues.priority
      );

      const updated = task.readTask();
      expect(updated.name).toBe(newValues.name);
      expect(updated.detail).toBe(newValues.detail);
      expect(updated.priority).toBe(newValues.priority);
      expect(updated.dueDate.toISOString()).toContain('2026-01-01');
      expect(updated.lastUpdated.getTime()).toBeGreaterThanOrEqual(
        oldData.lastUpdated.getTime()
      );
    });

    it('should retain original values when parameters are not provided', () => {
      const original = task.readTask();
      task.editTask();
      const afterEdit = task.readTask();

      expect(afterEdit.name).toBe(original.name);
      expect(afterEdit.detail).toBe(original.detail);
      expect(afterEdit.priority).toBe(original.priority);
    });
  });

  describe('switchStatus()', () => {
    it('should toggle completion status and update lastUpdated timestamp', () => {
      const before = task.readTask();
      task.switchStatus();
      const after = task.readTask();

      expect(after.completed).toBe(true);
      expect(after.lastUpdated.getTime()).toBeGreaterThanOrEqual(
        before.lastUpdated.getTime()
      );

      // Toggle back to false
      task.switchStatus();
      const reverted = task.readTask();
      expect(reverted.completed).toBe(false);
    });
  });
});
