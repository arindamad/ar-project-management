import connectMongo from '@/lib/db';
import Task from '@/models/Task';
import User from '@/models/User';

export async function POST(req) {
  await connectMongo();

  const { title, description, dueDate, assignedTo } = await req.json();
  const task = new Task({ title, description, dueDate, assignedTo });

  await task.save();

  // Add task to the employee's list
  await User.findByIdAndUpdate(assignedTo, { $push: { tasks: task._id } });

  return new Response(JSON.stringify(task), { status: 201 });
}
