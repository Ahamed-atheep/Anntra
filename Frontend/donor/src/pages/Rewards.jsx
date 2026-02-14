import { motion } from 'framer-motion';
import { Award, Download, Share2, Trophy } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Rewards = () => {
  const { user } = useAuth();

  const badges = [
    { name: 'First Donation', icon: '🎉', earned: user?.totalDonations >= 1 },
    { name: '10 Donations', icon: '⭐', earned: user?.totalDonations >= 10 },
    { name: '50 Donations', icon: '🏆', earned: user?.totalDonations >= 50 },
    { name: '100kg Donated', icon: '📦', earned: user?.totalQuantityDonated >= 100 },
    { name: 'Community Hero', icon: '💚', earned: user?.totalDonations >= 25 }
  ];

  const getRank = () => {
    const donations = user?.totalDonations || 0;
    if (donations >= 100) return { name: 'Diamond Donor', color: 'from-blue-400 to-purple-500' };
    if (donations >= 50) return { name: 'Gold Donor', color: 'from-yellow-400 to-orange-500' };
    if (donations >= 25) return { name: 'Silver Donor', color: 'from-gray-300 to-gray-400' };
    if (donations >= 10) return { name: 'Bronze Donor', color: 'from-orange-300 to-orange-400' };
    return { name: 'New Donor', color: 'from-green-400 to-green-500' };
  };

  const rank = getRank();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Rewards & Recognition</h1>
        <p className="text-gray-600 mt-2">Celebrate your impact and achievements</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card bg-gradient-to-r from-primary-500 to-green-500 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Trophy size={32} />
              <h2 className="text-3xl font-bold">{rank.name}</h2>
            </div>
            <p className="text-white/90">Based on {user?.totalDonations || 0} donations</p>
          </div>
          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${rank.color} flex items-center justify-center shadow-2xl`}>
            <span className="text-5xl">🏅</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Your Badges</h3>
          <div className="grid grid-cols-3 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex flex-col items-center p-4 rounded-lg ${
                  badge.earned ? 'bg-primary-50 border-2 border-primary-300' : 'bg-gray-100 opacity-50'
                }`}
              >
                <span className="text-4xl mb-2">{badge.icon}</span>
                <p className="text-xs text-center font-medium text-gray-700">{badge.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Impact Milestones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Total Donations</span>
              <span className="text-lg font-bold text-primary-600">{user?.totalDonations || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Food Donated</span>
              <span className="text-lg font-bold text-blue-600">{user?.totalQuantityDonated || 0} kg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">People Fed</span>
              <span className="text-lg font-bold text-purple-600">{user?.peopleFed || 0}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Share Your Impact</h3>
        <div className="flex gap-4">
          <button className="btn-primary flex items-center gap-2">
            <Download size={18} />
            Download Certificate
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Share2 size={18} />
            Share on Social Media
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Rewards;
