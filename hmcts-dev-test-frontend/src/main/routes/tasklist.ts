import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  app.get('/', async (req, res) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.get('http://localhost:4000/api/v1/tasks');
      if (response.data.statusCode === 200) {
        const responseData: [] = response.data?.data?.tasks;
        res.render('task-list', { rows: responseData });
      } else {
        // eslint-disable-next-line
        console.log('Task-UI :: listtask :: no task found in database');
        res.render('task-list', {});
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log('Task-UI :: listtask :: error catch block', error);
      res.render('error', {});
    }
  });
}
