import connectMongo from '@/lib/db';
import Task from '@/models/Task';

export async function GET(req) {
  const managerId = req.user.id; // Assuming middleware adds `req.user`
  await connectMongo();

  const tasks = await Task.find({ createdBy: managerId }).populate('assignedTo');
  return new Response(JSON.stringify(tasks), { status: 200 });
}
