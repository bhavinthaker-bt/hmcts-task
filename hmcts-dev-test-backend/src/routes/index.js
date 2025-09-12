const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.param('id', taskController.validateTaskID);

// Get task by ID endpoint. Maintaining api version for enhencement purpose
router
  .route('/')
  .get(
    authController.tokenValidation,
    authController.tokenScopeValidation,
    taskController.getAllTasks,
  )
  .post(
    authController.tokenValidation,
    authController.tokenScopeValidation,
    taskController.createTask,
  );

router
  .route('/:id')
  .get(
    authController.tokenValidation,
    authController.tokenScopeValidation,
    taskController.getTask,
  )
  .patch(
    authController.tokenValidation,
    authController.tokenScopeValidation,
    taskController.updateTask,
  )
  .delete(
    authController.tokenValidation,
    authController.tokenScopeValidation,
    taskController.deleteTask,
  );

module.exports = router;
