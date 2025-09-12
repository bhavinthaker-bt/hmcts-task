/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const errorHandler = require('../../src/controllers/errorController');

describe('Error Handler Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {};
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

  it('should handle CastError and modify the message', () => {
    const err = { name: 'CastError', path: 'id', value: '123abc' };

    errorHandler(err, req, res, next);

    expect(err.message).to.equal('Invalid id : 123abc');
    expect(res.status.calledWith(500)).to.be.true; // default since no statusCode set
    expect(
      res.json.calledWithMatch({
        statusCode: 500,
        status: 'Error',
        message: 'Invalid id : 123abc',
      }),
    ).to.be.true;
  });

  it('should use provided statusCode and status', () => {
    const err = {
      name: 'CustomError',
      message: 'Something bad',
      statusCode: 400,
      status: 'fail',
    };

    errorHandler(err, req, res, next);

    expect(res.status.calledWith(400)).to.be.true;
    expect(
      res.json.calledWithMatch({
        statusCode: 400,
        status: 'fail',
        message: 'Something bad',
      }),
    ).to.be.true;
  });

  it("should set default statusCode=500 and status='Error' if not provided", () => {
    const err = { name: 'UnknownError', message: 'Unexpected issue' };

    errorHandler(err, req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(
      res.json.calledWithMatch({
        statusCode: 500,
        status: 'Error',
        message: 'Unexpected issue',
      }),
    ).to.be.true;
  });
});
