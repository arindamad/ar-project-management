import connectMongo from '@/lib/db';
import Task from '@/models/Task';

export async function GET(req) {
  const userId = req.user.id; // Assuming middleware adds `req.user`.
  await connectMongo();

  const tasks = await Task.find({ assignedTo: userId });
  return new Response(JSON.stringify(tasks), { status: 200 });
}
