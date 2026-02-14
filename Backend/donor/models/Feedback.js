import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  donorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  pickupRating: { type: Number, min: 1, max: 5, required: true },
  volunteerRating: { type: Number, min: 1, max: 5, required: true },
  comments: { type: String },
  suggestions: { type: String }
}, { timestamps: true });

export default mongoose.model('Feedback', feedbackSchema);
