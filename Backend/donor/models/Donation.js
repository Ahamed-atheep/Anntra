import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickupRequestId: { type: String, unique: true },
  foodType: { type: String, required: true, enum: ['veg', 'non-veg'] },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  pickupAddress: { type: String, required: true },
  pickupTime: { type: Date, required: true },
  instructions: { type: String },
  imageUrl: { type: String },
  status: {
    type: String,
    enum: ['submitted', 'assigned', 'in-progress', 'collected', 'distributed', 'completed'],
    default: 'submitted'
  },
  volunteerName: { type: String },
  volunteerContact: { type: String },
  peopleServed: { type: Number, default: 0 },
  isFresh: { type: Boolean, default: true },
  safetyAgreed: { type: Boolean, required: true }
}, { timestamps: true });

donationSchema.pre('save', function(next) {
  if (!this.pickupRequestId) {
    this.pickupRequestId = `PR${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

export default mongoose.model('Donation', donationSchema);
