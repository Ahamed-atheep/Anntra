import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { donationAPI } from '../services/api';
import { CheckCircle, Circle, Phone, MapPin } from 'lucide-react';

const TrackDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const { data } = await donationAPI.getAll();
      setDonations(data.donations.filter(d => d.status !== 'completed'));
    } catch (error) {
      console.error('Failed to load donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusSteps = [
    { key: 'submitted', label: 'Request Submitted' },
    { key: 'assigned', label: 'Volunteer Assigned' },
    { key: 'in-progress', label: 'Pickup In Progress' },
    { key: 'collected', label: 'Collected Successfully' },
    { key: 'distributed', label: 'Distributed' },
    { key: 'completed', label: 'Completed' }
  ];

  const getStepIndex = (status) => statusSteps.findIndex(s => s.key === status);

  if (loading) {
    return <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Track Donations</h1>
        <p className="text-gray-600 mt-2">Monitor your active donation pickups</p>
      </div>

      {donations.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No active donations to track</p>
        </div>
      ) : (
        donations.map((donation) => {
          const currentStep = getStepIndex(donation.status);
          
          return (
            <motion.div
              key={donation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{donation.category}</h3>
                  <p className="text-sm text-gray-500">ID: {donation.pickupRequestId}</p>
                </div>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  {donation.status.replace('-', ' ').toUpperCase()}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-4">
                  {statusSteps.map((step, index) => (
                    <div key={step.key} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStep ? 'bg-primary-500' : 'bg-gray-200'
                      }`}>
                        {index <= currentStep ? (
                          <CheckCircle className="text-white" size={20} />
                        ) : (
                          <Circle className="text-gray-400" size={20} />
                        )}
                      </div>
                      <p className={`text-xs mt-2 text-center ${
                        index <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="relative h-1 bg-gray-200 -mt-8 mb-8">
                  <div
                    className="absolute h-full bg-primary-500 transition-all duration-500"
                    style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Pickup Address</p>
                    <p className="text-sm font-medium text-gray-800">{donation.pickupAddress}</p>
                  </div>
                </div>
                {donation.volunteerName && (
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Volunteer</p>
                      <p className="text-sm font-medium text-gray-800">{donation.volunteerName}</p>
                      <p className="text-xs text-gray-500">{donation.volunteerContact}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })
      )}
    </div>
  );
};

export default TrackDonation;
