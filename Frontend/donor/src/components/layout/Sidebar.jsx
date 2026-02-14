import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, PlusCircle, MapPin, History, Award, MessageSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: PlusCircle, label: 'Create Donation', path: '/create-donation' },
    { icon: MapPin, label: 'Track Donation', path: '/track-donation' },
    { icon: History, label: 'Donation History', path: '/history' },
    { icon: Award, label: 'Rewards', path: '/rewards' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-white h-screen shadow-lg fixed left-0 top-0 z-50"
    >
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-primary-600">🍽️ Food Rescue</h1>
        <p className="text-sm text-gray-500">Donor Portal</p>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
