import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const createTask = async (req, res) => {
  const { title, description, dueDate, status, assignedTo } = req.body;
  
  try {
   
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      assignedTo,
      assignedBy: req.user._id, 
    });

    
    const newTask = await task.save();
    res.status(201).json({ message: "Task Created Successfully", newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error occurred in task creation" });
  }
};

  
  export const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(201).json({ message: "task Fetched Successfully", tasks });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occuring in task fetching" });
    }
  };
  
  export const updateTask = async (req, res) => {
    const { title, description, dueDate, status, assignedTo } = req.body;
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, status, assignedTo }, {
        new: true,
      });
      await task.save()
      res.status(201).json({ message: "Task Updated Successfully", task });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occuring in task updating" });
    }
  };
  
  export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(201).json({ message: "Task Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Error occuring in task Deletion" });
    }
  };
export const assignTask = async (req, res) => {
  const { title, description, dueDate, assignedTo } = req.body;
  const { userId } = req.params; 
  
  try {
    
    const user = await User.findById(assignedTo);
    if (!user) return res.status(404).send('User not found');
    
    
    const task = new Task({
      title,
      description,
      dueDate,
      assignedTo,
      assignedBy: userId, 
    });

    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const assignTaskToTeamMember = async (req, res) => {
  const { id } = req.params;  
  const { title, description, dueDate, status } = req.body;

  try {
   
    const assignedUser = await User.findById(id);
    if (!assignedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const task = new Task({
      title,
      description,
      dueDate,
      status,
      assignedTo: id,  
      assignedBy: req.user._id, 
    });

    
    const newTask = await task.save();
    res.status(201).json({ message: "Task assigned successfully", newTask });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error });
  }
};


export const getUserTasks = async (req, res) => {
  const { userId } = req.params;
  
  try {
    const tasks = await Task.find({ assignedTo: userId }).populate('assignedBy', 'name email');
    if (!tasks.length) return res.status(404).send('No tasks found for this user');
    
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;
  
  try {
    const task = await Task.findByIdAndUpdate(taskId, { status }, { new: true });
    if (!task) return res.status(404).send('Task not found');
    
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

