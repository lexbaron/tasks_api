const { Task } = require('../models/tasks.model');
const { User } = require('../models/users.model')

const { catchAsync } = require('../utils/catchAsync.util');

const getAllTasks = catchAsync(  async(req, res, next) =>{
    const tasks = await Task.findAll({
        attributes: ["id", "userId", "title", "limitDate", "startDate", "finishDate", "status"],
        include: {model: User, attributes: ["id", "name", "email", "status"]}
    });

    res.status(200).json({
        status: "success",
        tasks
    })
});

const getTaskByStatus = catchAsync(async (req, res, next) => {
	const { tasks } = req;

	res.status(200).json({
		status: 'success',
		tasks,
	});
});

const createTask = catchAsync(  async(req, res, next) =>{
    const { title, userId, limitDate } = req.body;

    const newTask = await Task.create({
        title,
        userId,
        startDate: new Date(),
        limitDate
    });

    res.status(201).json({
        status: "success",
        newTask
    })
});

const updateTask = catchAsync(  async(req, res, next) =>{
    const { task } = req;

	const { finishDate } = req.body;

    if(new Date(finishDate)  < new Date(task.limitDate)){
        await task.update({ status: "completed", finishDate });
    }else if(new Date(finishDate) > new Date(task.limitDate)){
        await task.update({ status: "late", finishDate })
    }else{
        await task.update({ status: "completed", finishDate })
    }

	res.status(204).json({ status: 'success' });
});

const deleteTask = catchAsync(  async(req, res, next) =>{
    const { task } = req;

	await task.update({ status: 'cancelled' });

	res.status(204).json({ status: 'success' });
});

module.exports = { getAllTasks, getTaskByStatus, createTask, deleteTask, updateTask };