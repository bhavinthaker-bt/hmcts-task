import axios from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';

import { app } from '../../main/app';

describe('GET / (Task Route)', () => {
  let axiosStub: sinon.SinonStub;

  beforeEach(() => {
    // Stub axios
    axiosStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render task-list with tasks when API returns 200', async () => {
    const tasks = [{ id: 1, title: 'Test Task' }];
    axiosStub.resolves({
      data: { statusCode: 200, data: { tasks } },
    });
    await request(app)
      .get('/')
      .expect(res => expect(res.status).to.equal(200));
  });
  it('should render task-list with empty object{} when API returns 500', async () => {
    const tasks = [];
    axiosStub.resolves({
      data: { statusCode: 500, data: { tasks } },
    });
    await request(app)
      .get('/')
      .expect(res => expect(res.status).to.equal(200));
  });
  it('should render error page when axios throws an error', async () => {
    axiosStub.rejects(new Error('Network Error'));
    await request(app)
      .get('/')
      .expect(res => expect(res.status).to.equal(200));
  });
});
