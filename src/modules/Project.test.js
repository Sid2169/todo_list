// ===========================================================
// Project.test.js
// ===========================================================
// Unit tests for the Project class using Jest
// ===========================================================

import { Project } from './Project';
import { jest } from '@jest/globals';


// Mock crypto.randomUUID for predictable IDs
global.crypto = {
  randomUUID: jest.fn(() => 'mock-uuid-1234'),
};

describe('Project Class', () => {
  let project;

  beforeEach(() => {
    project = new Project('Test Project', 'Initial description');
  });

  // -----------------------------------------------------------
  // Constructor Tests
  // -----------------------------------------------------------
  test('should initialize with correct name, description, and timestamps', () => {
    const data = project.readProject();

    expect(data.name).toBe('Test Project');
    expect(data.description).toBe('Initial description');
    expect(data.id).toBe('mock-uuid-1234');
    expect(data.todoList).toEqual([]);
    expect(data.creationDate instanceof Date).toBe(true);
    expect(data.lastUpdated instanceof Date).toBe(true);
  });

  // -----------------------------------------------------------
  // addTask() Tests
  // -----------------------------------------------------------
  test('should add a task and update lastUpdated timestamp', () => {
    const oldLastUpdated = project.readProject().lastUpdated;

    const task = { id: 'task-1', title: 'Test Task' };
    project.addTask(task);

    const updated = project.readProject();
    expect(updated.todoList).toHaveLength(1);
    expect(updated.todoList[0]).toEqual(task);
    expect(updated.lastUpdated.getTime()).toBeGreaterThanOrEqual(oldLastUpdated.getTime());
  });

  // -----------------------------------------------------------
  // updateProject() Tests
  // -----------------------------------------------------------
  test('should update name and description correctly', () => {
    const oldTimestamp = project.readProject().lastUpdated;

    project.updateProject('Updated Project', 'New description');
    const updated = project.readProject();

    expect(updated.name).toBe('Updated Project');
    expect(updated.description).toBe('New description');
    expect(updated.lastUpdated.getTime()).toBeGreaterThanOrEqual(oldTimestamp.getTime());
  });

  test('should retain old values if no parameters are provided', () => {
    const prev = project.readProject();
    project.updateProject(); // no args
    const updated = project.readProject();

    expect(updated.name).toBe(prev.name);
    expect(updated.description).toBe(prev.description);
  });

  // -----------------------------------------------------------
  // deleteTask() Tests
  // -----------------------------------------------------------
  test('should delete a task by its ID', () => {
    const tasks = [
      { id: 't1', title: 'Task 1' },
      { id: 't2', title: 'Task 2' },
    ];

    tasks.forEach(t => project.addTask(t));

    project.deleteTask('t1');
    const updated = project.readProject();

    expect(updated.todoList).toHaveLength(1);
    expect(updated.todoList[0].id).toBe('t2');
  });

  test('should not delete if task ID does not exist', () => {
    const task = { id: 't1', title: 'Task 1' };
    project.addTask(task);
    project.deleteTask('non-existent-id');
    const updated = project.readProject();

    expect(updated.todoList).toHaveLength(1);
    expect(updated.todoList[0].id).toBe('t1');
  });

  // -----------------------------------------------------------
  // readProject() Data Integrity Tests
  // -----------------------------------------------------------
  test('readProject should return a deep copy of data', () => {
    const snapshot = project.readProject();
    snapshot.name = 'Changed';
    snapshot.todoList.push({ id: 'x', title: 'Fake' });

    const current = project.readProject();
    expect(current.name).toBe('Test Project'); // unaffected
    expect(current.todoList).toHaveLength(0);
  });
});
