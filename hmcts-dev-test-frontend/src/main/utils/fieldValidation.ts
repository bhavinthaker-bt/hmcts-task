import { ValidationError, ValidatorFactory } from '@dwp/govuk-casa';
import moment from 'moment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fieldValidation = inputObject => {
  const { taskTitle, taskStatus, taskDescription } = inputObject;
  const dueDay = inputObject['taskDueDate-Day'];
  const dueMonth = inputObject['taskDueDate-Month'];
  const dueYear = inputObject['taskDueDate-Year'];
  let errorMessage = '';
  let field = '';
  let fieldHref = '';
  const regex = /^\d+$/;
  const dueDate = moment(`${dueDay} ${dueMonth} ${dueYear}`, 'DD-MM-YYYY');
  if (taskTitle === undefined || taskTitle === '') {
    errorMessage = 'Please enter task title';
    field = 'taskTitle';
    fieldHref = 'taskTitle';
  } else if (taskStatus === undefined || taskStatus === '') {
    errorMessage = 'Please select task status';
    field = 'taskStatus';
    fieldHref = 'taskStatus';
  } else if (!regex.test(dueDay) || !regex.test(dueMonth) || !regex.test(dueYear)) {
    errorMessage = 'Please enter due date using number only';
    field = 'taskDueDate';
    fieldHref = 'taskDueDate';
  } else if (!dueDate.isValid()) {
    errorMessage = 'Please enter valid date';
    field = 'taskDueDate';
    fieldHref = 'taskDueDate';
  } else if (taskDescription === undefined || taskDescription === '') {
    errorMessage = 'Please select task description';
    field = 'taskDescription';
    fieldHref = 'taskDescription';
  }
  return { errorMessage, field, fieldHref };
};

class ValidateInputs extends ValidatorFactory {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  validate(value, dataContext) {
    const { errorMessage, field, fieldHref } = fieldValidation(value);
    return [
      ValidationError.make({
        errorMsg: {
          summary: errorMessage,
          field,
          fieldHref,
        },
        dataContext,
      }),
    ];
  }
}

export = ValidateInputs;
