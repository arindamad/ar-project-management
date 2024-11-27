import connectMongo from '@/lib/db';
import User from '@/models/User';
import Task from '@/models/Task';

export async function GET(req, { params }) {
  await connectMongo();

  const user = await User.findById(params.id).populate('tasks');
  if (!user) return new Response('User not found', { status: 404 });

  return new Response(JSON.stringify(user), { status: 200 });
}
