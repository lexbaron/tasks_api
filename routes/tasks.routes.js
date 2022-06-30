const express = require('express');
const { getAllTasks, getTaskByStatus, createTask, deleteTask, updateTask } = require('../controllers/tasks.controllers');
const { statusExists, taskExists, taskStatus } = require('../middlewares/tasks.middleware');
const { createTaskValidators } = require('../middlewares/validators.middleware')




const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks );

tasksRouter.post('/',createTaskValidators, createTask );

tasksRouter.get('/:status', statusExists, getTaskByStatus)

tasksRouter.patch('/:id', taskExists, taskStatus, updateTask);

tasksRouter.delete('/:id', taskExists, deleteTask  );

module.exports = { tasksRouter };