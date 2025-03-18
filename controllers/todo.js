import todomodel from "../models/todomodel.js";
import usermodel from "../models/usermodel.js";

export const getTodolist = async (req, res) => {
  try {
    const user = req.user;
    console.log("user", user);
    if (user.length == 1) {
      const todolist = await todomodel.find({ userid: user[0]._id });
      console.log(todolist);
      res.send(todolist);
    }
  } catch (err) {
    console.log(err);
  }
};
export const add_todo = async (req, res) => {
  try {
    const { task } = req.body;
    const user = req.user;
    if (!task) {
      return res.status(400).json({ message: "Task is required" });
    }

    const data = await todomodel.create({ task, userid: user[0]._id });

    res.status(201).json({ message: "Task added successfully", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const deletetodo = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const response = await todomodel.deleteOne({ _id: id });
    if (response.deletedCount === 0) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const updatestatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    const response = await todomodel.updateOne(
      { _id: id },
      { $set: { status: status } }
    );

    if (response.nModified == 0) {
      res
        .status(404)
        .json({ message: "No document found with the provided ID" });
    }
    res.status(201).json({ message: "status updated successfully" });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
