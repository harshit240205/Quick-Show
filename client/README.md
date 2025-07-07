# Quick Show - Movie Booking Application

A modern, responsive movie booking application built with React, featuring a complete user experience with favorites, bookings, and seamless navigation.

## 🚀 Features

### ✅ Completed Features

#### **Core Functionality**
- **Movie Browsing**: Browse all available movies with detailed information
- **Movie Details**: View comprehensive movie information including trailers, cast, and showtimes
- **Seat Selection**: Interactive seat layout for booking movies
- **Responsive Design**: Fully responsive design that works on all devices

#### **User Management**
- **Favorites System**: Add/remove movies to/from favorites
- **Booking System**: Book movies with seat selection and date picking
- **Booking Management**: View and cancel existing bookings
- **User Profile**: Dashboard showing user statistics and quick actions

#### **State Management**
- **Context API**: Centralized state management with React Context
- **Local Storage**: Persistent data storage for favorites and bookings
- **Real-time Updates**: Instant UI updates when adding/removing favorites or bookings

#### **User Experience**
- **Toast Notifications**: Real-time feedback for user actions
- **Empty States**: Helpful messages when no favorites or bookings exist
- **Navigation Indicators**: Visual feedback for active navigation items
- **Count Badges**: Show number of favorites and bookings in navigation

## 🛠️ Technical Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **State Management**: React Context API + useReducer
- **Notifications**: React Hot Toast
- **Authentication**: Clerk (optional)
- **Icons**: Lucide React + Custom SVGs

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation with favorites/bookings counts
│   │   ├── Footer.jsx          # Footer component
│   │   └── UserProfile.jsx     # User dashboard with statistics
│   ├── pages/
│   │   ├── Home.jsx            # Landing page with user profile
│   │   ├── Movies.jsx          # Movie grid with favorite buttons
│   │   ├── MovieDetails.jsx    # Movie details with booking/favorite actions
│   │   ├── SeatLayout.jsx      # Interactive seat selection
│   │   ├── Favorite.jsx        # Favorites page with management
│   │   └── MyBookings.jsx      # Bookings page with cancellation
│   ├── lib/
│   │   ├── AppContext.jsx      # Main state management context
│   │   └── useLocalStorage.js  # Local storage utility hook
│   └── assets/
│       ├── assets.js           # Dummy data and static assets
│       └── [images, svgs]      # Static assets
```

## 🎯 Key Components

### **AppContext.jsx**
- Centralized state management for favorites and bookings
- Local storage persistence
- Action creators for state updates
- Utility functions for checking favorite/booking status

### **Favorite.jsx**
- Displays user's favorite movies
- Allows removing movies from favorites
- Shows empty state with call-to-action
- Responsive grid layout

### **MyBookings.jsx**
- Shows all user bookings with detailed information
- Allows canceling bookings
- Displays booking dates, times, and seats
- Shows empty state with call-to-action

### **UserProfile.jsx**
- Dashboard showing user statistics
- Quick action buttons for navigation
- Visual indicators for favorites and bookings counts

## 🔧 Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎮 How to Use

### **Adding Favorites**
1. Navigate to Movies page or Movie Details
2. Click the heart icon on any movie
3. View your favorites in the Favorites page

### **Booking Movies**
1. Go to Movie Details page
2. Select a date from the date picker
3. Click "Book Now" to proceed to seat selection
4. Choose your seats and confirm booking
5. View your bookings in My Bookings page

### **Managing Bookings**
1. Go to My Bookings page
2. View all your active bookings
3. Click "Cancel Booking" to remove a booking
4. Click "View Movie" to see movie details

## 🎨 Design Features

- **Dark Theme**: Modern dark UI with accent colors
- **Hover Effects**: Smooth transitions and hover states
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Loading States**: Smooth loading and transition effects
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🔄 State Persistence

The application uses localStorage to persist:
- User favorites
- Movie bookings
- User preferences

Data persists across browser sessions and page refreshes.

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Payment integration
- [ ] Movie reviews and ratings
- [ ] Advanced seat selection with pricing
- [ ] Movie recommendations
- [ ] Push notifications
- [ ] Offline support

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Quick Show** - Your complete movie booking experience! 🎬✨
