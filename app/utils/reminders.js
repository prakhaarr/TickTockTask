const Task = require('./Task.js');
const { sendNotification } = require('./firebase');

const moment = require("moment/moment");
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://merntask319:mern319@cluster0.qbo8zfk.mongodb.net/nextauth?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
};

// Run the reminder logic immediately for testing
(async () => {
    try {
        console.log('Script is running...');

        const today = new Date();
        const formattedToday = formatDate(today);

        console.log('Formatted Today:', formattedToday);

        // Log the date range used in the query
        const dateRangeStart = moment().startOf('day').toDate();
        const dateRangeEnd = moment().add(7, 'days').endOf('day').toDate();
        console.log('Date Range Start:', dateRangeStart);
        console.log('Date Range End:', dateRangeEnd);

        // Find tasks due within the next 7 days (adjust as needed)

        const dueTasks = await Task.find({
            date: {
                $lt: moment().add(7, 'days').endOf('day').toISOString(),
                $gte: moment().startOf('day').toISOString()
            }
        });

        console.log('Due Tasks:', dueTasks);

        dueTasks.forEach(async task => {
            console.log(`Task Date (${task.title}):`, task.date);

            // Convert task.date to moment and format to match the string format
            const taskFormattedDate = moment(task.date).format("DD/MM/YYYY");

            console.log(`Is Task Due Today?`, taskFormattedDate === formattedToday);

            // Send FCM notification if the task is due today
            if (taskFormattedDate === formattedToday) {
                await sendNotification(task.userId, `Task "${task.title}" is due today!`);
            }
        });

        console.log('Script completed successfully.');
    } catch (error) {
        console.error('Error in reminder script:', error);
    } finally {
        mongoose.disconnect(); // Ensure to close the MongoDB connection
    }
})();
