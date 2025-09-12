const Task = require('../models/taskModels');
// const ApiError = require('../utils/apiError');

const errRecNotFound = (res) => {
  res
    .status(200)
    .json({
      statusCode: 404,
      message: `Document(s) not found in Database`,
    })
    .end();
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    console.log(`Task-API :: Success :: retrived all the task from DB`);
    if (tasks && tasks.length > 1) {
      res
        .status(200)
        .json({
          statusCode: 200,
          status: 'success',
          totalRecords: tasks.length,
          data: {
            tasks,
          },
        })
        .end();
    } else {
      errRecNotFound(res);
    }
  } catch (err) {
    console.log(
      `Task-API :: Error :: cannot retrive all the task from DB ${err}`,
    );
    next(err);
    // next(new ApiError(err.message, err.statusCode));
  }
};

const getTask = async (req, res, next) => {
  try {
    const tasks = await Task.findById(req.params.id);
    console.log(
      `Task-API :: Success :: retrived record for Id: ${req.params.id}`,
    );
    if (tasks) {
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        data: {
          tasks,
        },
      });
    } else {
      errRecNotFound(res);
    }
  } catch (err) {
    console.log(
      `Task-API :: Error :: cannot retrived record for Id: ${req.params.id} error: ${err}`,
    );
    next(err);
  }
};

const createTask = async (req, res, next) => {
  const payLoad = req.body;
  try {
    const newTask = await Task.create(payLoad);
    const newId = newTask.id;
    console.log(`Task-API :: Success :: task creation successful ${newId}`);
    res.status(201).json({
      statusCode: 201,
      status: 'success',
      message: `new resource is created /api/v1/tasks/${newId}`,
      data: {
        newTask,
      },
    });
  } catch (err) {
    console.log(`Task-API :: Error :: task creation failed ${err}`);
    next(err);
    // next(new ApiError(err.message, err.statusCode));
  }
};

const updateTask = async (req, res, next) => {
  try {
    const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (tasks) {
      console.log(`Task-API :: Success :: updated record Id: ${req.params.id}`);
      res.status(200).json({
        statusCode: 200,
        status: 'success',
        data: {
          tasks,
        },
      });
    } else {
      errRecNotFound(res);
    }
  } catch (err) {
    console.log(
      `Task-API :: Error :: cannot update record Id: ${req.params.id} error: ${err}`,
    );
    next(err);
    // next(new ApiError(err.message, err.statusCode));
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    console.log(`Task-API :: Success :: deleted record Id: ${req.params.id}`);
    res.status(204).json({
      statusCode: 204,
      status: 'success',
    });
  } catch (err) {
    console.log(
      `Task-API :: Error :: cannot delete record Id: ${req.params.id} error: ${err}`,
    );
    next(err);
    // next(new ApiError(err.message, err.statusCode));
  }
};

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
