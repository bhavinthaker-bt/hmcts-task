import { ValidationError } from '@dwp/govuk-casa';
import { expect } from '@jest/globals';

import ValidateInputs from '../../main/utils/fieldValidation';

describe('ValidateInputs', () => {
  let validator: ValidateInputs;

  beforeEach(() => {
    validator = new ValidateInputs();
  });

  it('should return error when taskTitle is missing', () => {
    const result = validator.validate(
      {
        taskStatus: 'open',
        taskDescription: 'desc',
        'taskDueDate-Day': '01',
        'taskDueDate-Month': '12',
        'taskDueDate-Year': '2025',
      },
      undefined
    );
    expect(result[0]).toBeInstanceOf(ValidationError);
    // expect(result[0].errorMsg.summary).toBe('Please enter task title');
    // expect(result[0].errorMsg.field).toBe('taskTitle');
  });

  it('should return error when taskStatus is missing', () => {
    const result = validator.validate(
      {
        taskTitle: 'My Task',
        taskDescription: 'desc',
        'taskDueDate-Day': '01',
        'taskDueDate-Month': '12',
        'taskDueDate-Year': '2025',
      },
      undefined
    );
    expect(result[0]).toBeInstanceOf(ValidationError);
    // expect(result[0].errorMsg.summary).toBe('Please select task status');
    // expect(result[0].errorMsg.field).toBe('taskStatus');
  });

  it('should return error when due date contains non-numeric values', () => {
    const result = validator.validate(
      {
        taskTitle: 'My Task',
        taskStatus: 'open',
        taskDescription: 'desc',
        'taskDueDate-Day': 'aa',
        'taskDueDate-Month': 'bb',
        'taskDueDate-Year': 'cccc',
      },
      undefined
    );
    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  it('should return error when due date is invalid', () => {
    const result = validator.validate(
      {
        taskTitle: 'My Task',
        taskStatus: 'open',
        taskDescription: 'desc',
        'taskDueDate-Day': '31',
        'taskDueDate-Month': '02',
        'taskDueDate-Year': '2025',
      },
      undefined
    );

    expect(result[0]).toBeInstanceOf(ValidationError);
  });

  // it('should return error when taskDescription is missing', () => {
  //   const result = validator.validate({
  //     taskTitle: 'My Task',
  //     taskStatus: 'open',
  //     'taskDueDate-Day': '01',
  //     'taskDueDate-Month': '12',
  //     'taskDueDate-Year': '2025',
  //   });

  //   expect(result[0].errorMsg.summary).toBe('Please select task description');
  //   expect(result[0].errorMsg.field).toBe('taskDescription');
  // });

  // it('should return no error for valid input', () => {
  //   const result = validator.validate({
  //     taskTitle: 'My Task',
  //     taskStatus: 'open',
  //     taskDescription: 'desc',
  //     'taskDueDate-Day': '01',
  //     'taskDueDate-Month': '12',
  //     'taskDueDate-Year': '2025',
  //   });

  //   expect(result[0].errorMsg.summary).toBe('');
  //   expect(result[0].errorMsg.field).toBe('');
  //   expect(result[0].errorMsg.fieldHref).toBe('');
  // });
});
