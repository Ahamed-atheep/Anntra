import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { donationAPI, feedbackAPI } from '../services/api';
import { Star, Send } from 'lucide-react';

const Feedback = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState('');
  const [formData, setFormData] = useState({
    pickupRating: 0,
    volunteerRating: 0,
    comments: '',
    suggestions: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadCompletedDonations();
  }, []);

  const loadCompletedDonations = async () => {
    try {
      const { data } = await donationAPI.getAll();
      setDonations(data.donations.filter(d => d.status === 'completed'));
    } catch (error) {
      console.error('Failed to load donations:', error);
    }
  };

  const handleRating = (field, rating) => {
    setFormData(prev => ({ ...prev, [field]: rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDonation) {
      alert('Please select a donation');
      return;
    }

    setLoading(true);
    try {
      await feedbackAPI.create({ ...formData, donationId: selectedDonation });
      setSuccess(true);
      setFormData({ pickupRating: 0, volunteerRating: 0, comments: '', suggestions: '' });
      setSelectedDonation('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Failed to submit feedback: ' + error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ rating, onRate, label }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            className="focus:outline-none"
          >
            <Star
              size={32}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Feedback</h1>
        <p className="text-gray-600 mt-2">Share your experience and help us improve</p>
      </div>

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg"
        >
          Thank you for your feedback! 🎉
        </motion.div>
      )}

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="card space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Donation</label>
          <select
            value={selectedDonation}
            onChange={(e) => setSelectedDonation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          >
            <option value="">Choose a completed donation</option>
            {donations.map((donation) => (
              <option key={donation._id} value={donation._id}>
                {donation.category} - {new Date(donation.createdAt).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <StarRating
          rating={formData.pickupRating}
          onRate={(rating) => handleRating('pickupRating', rating)}
          label="Rate Pickup Experience"
        />

        <StarRating
          rating={formData.volunteerRating}
          onRate={(rating) => handleRating('volunteerRating', rating)}
          label="Rate Volunteer Behavior"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
            placeholder="Share your experience..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Suggestions for Improvement</label>
          <textarea
            value={formData.suggestions}
            onChange={(e) => setFormData(prev => ({ ...prev, suggestions: e.target.value }))}
            placeholder="How can we improve?"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Send size={18} />
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </motion.form>
    </div>
  );
};

export default Feedback;
