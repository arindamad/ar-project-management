import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Employee', 'Manager', 'Admin'], default: 'Employee' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
