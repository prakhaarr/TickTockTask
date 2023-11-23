const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true }, // Change the type to String
    userId: { type: String, required: true },
}, { collection: 'Task', strict: false }); // Specify the collection name

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
