/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const Task = require('../../src/models/taskModels');
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../../src/controllers/taskController');

describe('Task Controller', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
      end: sinon.stub().returnsThis(),
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllTasks', () => {
    it('should return all tasks when tasks exist', async () => {
      const fakeTasks = [{ id: '1' }, { id: '2' }];
      sinon.stub(Task, 'find').resolves(fakeTasks);

      await getAllTasks(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWithMatch({
          statusCode: 200,
          status: 'success',
          totalRecords: 2,
        }),
      ).to.be.true;
    });

    it('should return not found when no tasks exist', async () => {
      sinon.stub(Task, 'find').resolves([]);

      await getAllTasks(req, res, next);

      expect(
        res.json.calledWithMatch({
          statusCode: 404,
          message: 'Document(s) not found in Database',
        }),
      ).to.be.true;
    });

    it('should call next on error', async () => {
      sinon.stub(Task, 'find').rejects(new Error('DB error'));

      await getAllTasks(req, res, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('getTask', () => {
    it('should return a task when found', async () => {
      req.params.id = '123';
      const fakeTask = { id: '123' };
      sinon.stub(Task, 'findById').resolves(fakeTask);

      await getTask(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWithMatch({
          statusCode: 200,
          status: 'success',
          data: { tasks: fakeTask },
        }),
      ).to.be.true;
    });

    it('should return not found when task does not exist', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findById').resolves(null);

      await getTask(req, res, next);

      expect(
        res.json.calledWithMatch({
          statusCode: 404,
          message: 'Document(s) not found in Database',
        }),
      ).to.be.true;
    });

    it('should call next on error', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findById').rejects(new Error('DB error'));

      await getTask(req, res, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      req.body = { name: 'Test Task' };
      const fakeTask = { id: '123', name: 'Test Task' };
      sinon.stub(Task, 'create').resolves(fakeTask);

      await createTask(req, res, next);

      expect(res.status.calledWith(201)).to.be.true;
      expect(
        res.json.calledWithMatch({
          statusCode: 201,
          status: 'success',
          data: { newTask: fakeTask },
        }),
      ).to.be.true;
    });

    it('should call next on error', async () => {
      sinon.stub(Task, 'create').rejects(new Error('DB error'));

      await createTask(req, res, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('updateTask', () => {
    it('should update a task when found', async () => {
      req.params.id = '123';
      req.body = { name: 'Updated Task' };
      const updatedTask = { id: '123', name: 'Updated Task' };
      sinon.stub(Task, 'findByIdAndUpdate').resolves(updatedTask);

      await updateTask(req, res, next);

      expect(res.status.calledWith(200)).to.be.true;
      expect(
        res.json.calledWithMatch({
          statusCode: 200,
          status: 'success',
          data: { tasks: updatedTask },
        }),
      ).to.be.true;
    });

    it('should return not found when task does not exist', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findByIdAndUpdate').resolves(null);

      await updateTask(req, res, next);

      expect(
        res.json.calledWithMatch({
          statusCode: 404,
          message: 'Document(s) not found in Database',
        }),
      ).to.be.true;
    });

    it('should call next on error', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findByIdAndUpdate').rejects(new Error('DB error'));

      await updateTask(req, res, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findByIdAndDelete').resolves();

      await deleteTask(req, res, next);

      expect(res.status.calledWith(204)).to.be.true;
      expect(
        res.json.calledWithMatch({
          statusCode: 204,
          status: 'success',
        }),
      ).to.be.true;
    });

    it('should call next on error', async () => {
      req.params.id = '123';
      sinon.stub(Task, 'findByIdAndDelete').rejects(new Error('DB error'));

      await deleteTask(req, res, next);

      expect(next.calledOnce).to.be.true;
    });
  });
});
