/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const { expect } = require('chai');
// eslint-disable-next-line import/no-extraneous-dependencies
const sinon = require('sinon');
const {
  tokenValidation,
  tokenScopeValidation,
} = require('../../src/controllers/authController');

describe('Auth Middleware', () => {
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

  describe('tokenValidation', () => {
    it('should call next()', () => {
      tokenValidation(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
    });
  });

  describe('tokenScopeValidation', () => {
    it('should call next()', () => {
      tokenScopeValidation(req, res, next);

      expect(next.calledOnce).to.be.true;
      expect(res.status.notCalled).to.be.true;
      expect(res.json.notCalled).to.be.true;
    });
  });
});
