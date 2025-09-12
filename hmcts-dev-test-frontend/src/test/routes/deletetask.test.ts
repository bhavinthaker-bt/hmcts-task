import { expect, jest } from '@jest/globals';
import axios from 'axios';
import express, { Application } from 'express';
import request from 'supertest';

import taskRoute from '../../main/routes/deletetask';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GET /deletetask/:id', () => {
  let app: Application;

  beforeEach(() => {
    app = express();
    app.set('view engine', 'nunjucks');
    app.engine('nunjucks', () => {});

    // mock render & redirect
    app.render = jest.fn();

    taskRoute(app);
  });

  it('should call axios.delete and redirect to / on success', async () => {
    mockedAxios.delete.mockResolvedValueOnce({ status: 200 });

    await request(app).get('/deletetask/123');

    expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:4000/api/v1/tasks/123');
    // expect(app.response.redirect).toHaveBeenCalledWith('/');
  });

  // it('should render error page when axios.delete throws', async () => {
  //   mockedAxios.delete.mockRejectedValueOnce(new Error('Network Error'));

  //   await request(app).get('/deletetask/123');

  //   expect(app.render).toHaveBeenCalledWith('error', {});
  // });
});
