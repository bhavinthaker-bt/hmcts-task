import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import { app } from '../../main/app';

describe('GET / (Task Route)', () => {
  let axiosStub: sinon.SinonStub;
  // let validateStub: sinon.SinonStub;
  beforeEach(() => {
    // Stub axios
    axiosStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render create-list with tasks when API returns 200', async () => {
    const tasks = [
      {
        title: 'test title',
        description: 'test description',
        status: 'Completed',
        due_date: '2025-09-12T00:00:00.000Z',
        _id: '68c40c271aa74ace86de1832',
        created: '2025-09-12T12:03:51.443Z',
        __v: 0,
      },
    ];
    axiosStub.resolves({
      data: { statusCode: 200, data: { newTask: { tasks } } },
    });
    await request(app)
      .get('/createtask')
      .expect(res => expect(res.status).to.equal(200));
  });
  // create task - post
  // it('should render error page when axios throws an error', async () => {
  //   validateStub.returns([{ message: '' }]);
  //   axiosStub.rejects(new Error('Network Error'));

  //   await request(app)
  //     .post('/createtask')
  //     .expect(res => expect(res.status).to.equal(200));
  // });
  it('should render create-task list post call with missing values', async () => {
    axiosStub.resolves({
      data: { statusCode: 500, status: 'Error', message: 'Task validation failed: title: title is required field' },
    });
    const formData = {
      taskTitle: '',
      taskDescription: '',
      taskStatus: 'Not Started',
      'taskDueDate-Day': '12',
      'taskDueDate-Month': '09',
      'taskDueDate-Year': '2025',
    };
    await request(app)
      .post('/createtask')
      .send(formData)
      .expect(res => expect(res.status).to.equal(200));
  });

  it('should render create-task list post call', async () => {
    axiosStub.resolves({
      data: { statusCode: 500, status: 'Error', message: 'Task validation failed: title: title is required field' },
    });
    const formData = {
      taskTitle: 'test title',
      taskDescription: 'test description',
      taskStatus: 'In Progress',
      'taskDueDate-Day': '12',
      'taskDueDate-Month': '09',
      'taskDueDate-Year': '2025',
    };
    await request(app)
      .post('/createtask')
      .send(formData)
      .expect(res => expect(res.status).to.equal(200));
  });
});
