import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  app.get('/deletetask/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      // eslint-disable-next-line
      console.log('Task-UI :: deletetask :: record ID of delete record', taskId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await axios.delete(`http://localhost:4000/api/v1/tasks/${taskId}`);
      res.redirect('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Task-UI :: deletetask :: error catch block', error);
      res.render('error', {});
    }
  });
}
