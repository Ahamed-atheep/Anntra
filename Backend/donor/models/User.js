import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, default: 'donor', enum: ['donor'] },
  organizationType: { type: String, enum: ['restaurant', 'hotel', 'catering', 'individual', 'grocery', 'other'] },
  phone: { type: String },
  defaultPickupLocation: { type: String },
  preferredPickupTime: { type: String },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false }
  },
  totalDonations: { type: Number, default: 0 },
  totalQuantityDonated: { type: Number, default: 0 },
  impactScore: { type: Number, default: 0 },
  peopleFed: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema);
