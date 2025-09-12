import axios from 'axios';
import { Application } from 'express';

export default function (app: Application): void {
  app.get('/updatetask/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      // eslint-disable-next-line
      console.log('Task-UI :: updatetask :: record ID of update record', taskId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.get(`http://localhost:4000/api/v1/tasks/${taskId}`);
      if (response.data.statusCode === 200) {
        res.render('update-task', {
          taskId,
          taskTitle: response.data.data.tasks.title,
          taskStatus: response.data.data.tasks.status,
          taskDescription: response.data.data.tasks.description,
        });
      } else {
        // eslint-disable-next-line
        console.log('Task-UI :: updatetask :: error out');
        res.render('error', {});
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error making request:', error);
      res.render('error', {});
    }
  });
  app.post('/updatetask/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
      // eslint-disable-next-line
      const payLoad = {
        title: req.body.taskTitle,
        description: req.body.taskDescription,
        status: req.body.taskStatus,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await axios.patch(`http://localhost:4000/api/v1/tasks/${taskId}`, payLoad);
      if (response.data.statusCode === 200) {
        res.redirect('/');
      } else {
        // eslint-disable-next-line
        console.log('Task-UI :: updatetask :: error out');
        res.render('error', {});
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Task-UI :: updatetask :: error catch block', error);
      res.render('error', {});
    }
  });
}
