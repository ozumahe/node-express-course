const Tasks = require("../module/task");

const getAllTask = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error.errors.name.message });
  }
};
const createTask = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.errors.name.message });
  }
};

const getTask = (req, res) => {
  try {
  } catch (error) {}

  res.json({ id: req.params.id });
};
const updateTask = (req, res) => {
  res.send("update task");
};
const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = { getAllTask, createTask, getTask, updateTask, deleteTask };
