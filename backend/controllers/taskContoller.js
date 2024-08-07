const { Task } = require('../models');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.create({ title, description, userId });
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.findAll({ where: { userId } });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    task.status = status;

    await task.save();

    res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByPk(id);

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
