import { auth } from "@clerk/nextjs";
import prisma from "@/app/utils/connect";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export async function POST(req: Request) {
    try {

        const { userId } = auth();
        if (!userId) {

            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }


        const { title, description, date, completed, important } = await req.json();

        if (!title || !description || !date) {

            return NextResponse.json({ error: "Missing required fields", status: 400, });
        }


        if (title.length < 3) {

            return NextResponse.json({
                error: "Title must be atleast 3 characters long",
                status: 400,
            });
        }

        const task = await prisma.task.create({
            data: {

                title,
                description,
                date,
                isCompleted: completed,
                isImportant: important,

                userId,
            }
        });
        console.log("Task Created:", task);
        return NextResponse.json(task);
    } catch (error) {

        console.log("ERROR CREATING TASK: ", error);

        return NextResponse.json({ error: "Error creating task", status: 500 });

    }
}



// export async function GET(req: Request) {
//     try {
//         const { userId } = auth();

//         if (!userId) {

//             return NextResponse.json({ error: "Unauthorized", status: 401 });
//         }
//         const tasks = await prisma.task.findMany({

//             where: {
//                 userId,
//             },
//         });


//         console.log("TASKS: ", tasks);
//         return NextResponse.json(tasks);
//     } catch (error) {

//         console.log("ERROR GETTING TASK: ", error);

//         return NextResponse.json({ error: "Error getting task", status: 500 });
//     }
// }



// export async function GET(req: Request) {
//     try {
//         const { userId } = auth();
//         console.log('User ID:', userId);
//         if (!userId) {
//             return NextResponse.json({ error: "Unauthorized", status: 401 });
//         }

//         const tasks = await prisma.task.findMany({
//             where: {
//                 userId,
//             },
//         });

//         // Find a task due today and not completed
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const dueTodayTask = tasks.find(
//             (task) =>
//                 task.date instanceof Date &&
//                 task.date.getTime() === today.getTime() &&
//                 !task.isCompleted
//         );

//         if (dueTodayTask) {
//             // Return an indication that there is a task due today
//             return NextResponse.json({
//                 tasks,
//                 dueTodayTask: {
//                     title: dueTodayTask.title,
//                     date: dueTodayTask.date,
//                 },
//             });
//         }

//         console.log("TASKS: ", tasks);
//         return NextResponse.json({ tasks });
//     } catch (error) {
//         console.log("ERROR GETTING TASK: ", error);
//         return NextResponse.json({ error: "Error getting task", status: 500 });
//     }
// }


export async function GET(req: Request) {
    try {
        const { userId } = auth();
        console.log('User ID:', userId);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }

        const tasks = await prisma.task.findMany({
            where: {
                userId,
            },
        });

        // Find a task due today and not completed
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dueTodayTask = tasks.find(
            (task) =>
                task.date instanceof Date &&
                task.date.getTime() === today.getTime() &&
                !task.isCompleted
        );

        if (dueTodayTask) {
            // Return an indication that there is a task due today
            return NextResponse.json({
                tasks,
                dueTodayTask: {
                    title: dueTodayTask.title,
                    date: dueTodayTask.date,
                },
            });
        }

        console.log("TASKS: ", tasks);
        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("ERROR GETTING TASKS:", error);
        return NextResponse.json({ error: "Error getting tasks", status: 500 });
    }
}

export async function PUT(req: Request) {

    try {
        const { userId } = auth();

        const { isCompleted, id } = await req.json();

        if (!userId) {

            return NextResponse.json({ error: "Unauthorized", status: 401 });
        }
        const task = await prisma.task.update({

            where: {

                id,
            },
            data: {
                isCompleted,
            },
        });
        console.log("TASK UPDATAED: ", task);
        return NextResponse.json(task);
    } catch (error) {

        console.log("ERROR UPDATING TASK: ", error);

        return NextResponse.json({ error: "Error updating task", status: 500 });
    }
}







