// Example: scheduleNotifications.js

const schedule = require('node-schedule');
const { sendNotification } = require('./notificationService');
const { getUserEmail } = require('./userService'); // Implement this to get user email

// Schedule a job to run every day at midnight
schedule.scheduleJob('0 0 * * *', async () => {
    const overdueTasks = await Task.findMany({
        where: {
            dueDate: {
                lt: new Date(), // Find tasks with due dates in the past
            },
            completed: false,
        },
    });

    // Send notifications for overdue tasks
    overdueTasks.forEach(async task => {
        const userEmail = await getUserEmail(task.userId);
        if (userEmail) {
            const notificationMessage = `Task "${task.title}" is overdue!`;
            await sendNotification(userEmail, 'Task Overdue Notification', notificationMessage);
        }
    });
});
