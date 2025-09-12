/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
const Task = require('../../src/models/taskModels');

describe('Task Model', () => {
  it('should be invalid if title is missing', () => {
    const task = new Task({ status: 'pending', due_date: '2025-09-10' });
    const error = task.validateSync();

    expect(error.errors.title).to.exist;
    expect(error.errors.title.message).to.equal('title is required field');
  });

  it('should be invalid if status is missing', () => {
    const task = new Task({ title: 'Test Task', due_date: '2025-09-10' });
    const error = task.validateSync();

    expect(error.errors.status).to.exist;
    expect(error.errors.status.message).to.equal('status is required field');
  });

  it('should be invalid if due_date is missing', () => {
    const task = new Task({ title: 'Test Task', status: 'pending' });
    const error = task.validateSync();

    expect(error.errors.due_date).to.exist;
    expect(error.errors.due_date.message).to.equal(
      'due_date is required field',
    );
  });

  it('should be valid with all required fields', () => {
    const task = new Task({
      title: 'Complete assignment',
      description: 'Unit test the Task model',
      status: 'pending',
      due_date: '2025-09-10',
    });
    const error = task.validateSync();

    expect(error).to.be.undefined;
  });

  it('should allow description to be optional', () => {
    const task = new Task({
      title: 'No description task',
      status: 'pending',
      due_date: '2025-09-10',
    });
    const error = task.validateSync();

    expect(error).to.be.undefined;
    expect(task.description).to.be.undefined;
  });
});
