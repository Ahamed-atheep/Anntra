# 🍽️ Food Rescue Donor Portal

A production-level MERN stack web application for food donors to manage donations, track pickups, and measure their impact.

## 🚀 Features

- **Secure Authentication** - JWT-based login/register system
- **Dashboard Overview** - Real-time stats and impact metrics
- **Create Donations** - Easy form to schedule food pickups
- **Track Donations** - Live status tracking with progress stepper
- **Donation History** - Complete history with filters
- **Rewards System** - Badges, ranks, and achievements
- **Feedback System** - Rate volunteers and pickup experience
- **Profile Management** - Update preferences and settings

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Framer Motion (animations)
- Recharts (analytics)
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (password hashing)

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd Backend/donor
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/food-rescue-donor
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd Frontend/donor
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🗄️ Database Models

### User Model
- name, email, password (hashed)
- role, organizationType
- totalDonations, totalQuantityDonated
- impactScore, peopleFed
- notificationPreferences

### Donation Model
- donorId, pickupRequestId
- foodType, category, quantity
- pickupAddress, pickupTime
- status (submitted → assigned → in-progress → collected → distributed → completed)
- volunteerName, volunteerContact

### Feedback Model
- donorId, donationId
- pickupRating, volunteerRating
- comments, suggestions

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new donor
- `POST /api/auth/login` - Login donor
- `GET /api/auth/profile` - Get profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Donations
- `POST /api/donations` - Create donation (protected)
- `GET /api/donations` - Get all donations (protected)
- `GET /api/donations/stats` - Get dashboard stats (protected)
- `GET /api/donations/:id` - Get donation by ID (protected)

### Feedback
- `POST /api/feedback` - Submit feedback (protected)
- `GET /api/feedback` - Get all feedback (protected)

## 🎨 UI Features

- ✅ Responsive design (mobile + desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Loading skeletons
- ✅ Toast notifications
- ✅ Professional green theme
- ✅ Glassmorphism cards
- ✅ Interactive charts

## 🚀 Deployment

### Backend (Render/Railway/AWS)
1. Set environment variables
2. Deploy from GitHub
3. Update MongoDB URI to production

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API base URL

## 📝 Usage

1. **Register** as a donor
2. **Login** to access dashboard
3. **Create donation** with food details
4. **Track** pickup status in real-time
5. **View history** of all donations
6. **Earn rewards** based on impact
7. **Submit feedback** after completion
8. **Manage profile** and preferences

## 🔒 Security

- Password encryption with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- CORS enabled

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ for Food Rescue Initiative

---

**Note**: This is a production-ready application. Make sure to change JWT_SECRET and use environment variables in production.
