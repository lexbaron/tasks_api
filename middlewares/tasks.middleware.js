const { Task } = require('../models/tasks.model');

const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const taskExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (!task) {
		return next(new AppError('Task not found', 404));
	}

	req.task = task;
	next();
});

const taskStatus = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const task = await Task.findOne({ where: { id } });

	if (task.status !== "active") {
		return next(new AppError('Task is not active', 404));
	}

	req.task = task;
	next();
});

const statusExists = catchAsync(async (req, res, next) => {
	const { status } = req.params;

    const validStatus = ["active", "completed", "late", "cancelled"]

    if(!validStatus.includes(status)){
        return next(new AppError('Task status not found', 404));
    }

	const tasks = await Task.findAll({ where: { status } }); 

	req.tasks = tasks;
	next();
});



module.exports = { taskExists, statusExists, taskStatus };