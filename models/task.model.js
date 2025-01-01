import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
    },
  description: { 
    type: String,
    required: true 
    },
  dueDate: { 
    type: Date,
    required: true 
},
  status: { 
    type: String, 
    enum: ['pending', 'completed'], 
    default: 'pending' },
  assignedTo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  assignedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true }
});

const Task = mongoose.model('Task', taskSchema);

export default Task
