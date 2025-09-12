import axios from 'axios';
import { Application } from 'express';
import moment from 'moment';

import ValidateInputs from '../utils/fieldValidation';

export default function (app: Application): void {
  app.get('/createtask', async (req, res) => {
    res.render('create-task', {});
  });

  app.post('/createtask', async (req, res) => {
    try {
      const validateInputs = new ValidateInputs();
      // eslint-disable-next-line
      const fieldValidationResp: any = validateInputs.validate(req.body, undefined);
      if (fieldValidationResp[0].message !== '') {
        res.render('create-task', {
          taskTitle: req.body.taskTitle,
          taskStatus: req.body.taskStatus,
          taskDescription: req.body.taskDescription,
          taskDay: req.body['taskDueDate-Day'],
          taskMonth: req.body['taskDueDate-Month'],
          taskYear: req.body['taskDueDate-Year'],
          formErrorsGovukArray: fieldValidationResp,
        });
      } else {
        const dueDate = moment(
          `${req.body['taskDueDate-Day']} ${req.body['taskDueDate-Month']} req.body['taskDueDate-Year']`,
          'DD-MM-YYYY'
        );
        const payLoad = {
          title: req.body.taskTitle,
          description: req.body.taskDescription,
          status: req.body.taskStatus,
          due_date: dueDate,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await axios.post('http://localhost:4000/api/v1/tasks', payLoad);
        if (response?.data?.statusCode === 201) {
          const responseData: [{ title: string; description: string; status: string; due_date: string; _id: string }] =
            [response.data.data.newTask];
          res.render('confirm-task', { rows: responseData });
        } else {
          res.render('error', {});
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Task-UI :: createtask :: post :: error catch block', error);
      res.render('error', {});
    }
  });
}
