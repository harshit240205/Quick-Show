import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  favorites: [],
  bookings: [],
  user: null
};

// Action types
const ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  ADD_BOOKING: 'ADD_BOOKING',
  REMOVE_BOOKING: 'REMOVE_BOOKING',
  SET_USER: 'SET_USER',
  LOAD_STATE: 'LOAD_STATE'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case ACTIONS.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload)
      };
    
    case ACTIONS.ADD_BOOKING:
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    
    case ACTIONS.REMOVE_BOOKING:
      return {
        ...state,
        bookings: state.bookings.filter(booking => booking.id !== action.payload)
      };
    
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };
    
    case ACTIONS.LOAD_STATE:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('movieAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: ACTIONS.LOAD_STATE, payload: parsedState });
      } catch (error) {
        console.error('Error loading state from localStorage:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('movieAppState', JSON.stringify(state));
  }, [state]);

  // Action creators
  const addFavorite = (movie) => {
    if (!state.favorites.find(fav => fav.id === movie.id)) {
      dispatch({ type: ACTIONS.ADD_FAVORITE, payload: movie });
    }
  };

  const removeFavorite = (movieId) => {
    dispatch({ type: ACTIONS.REMOVE_FAVORITE, payload: movieId });
  };

  const addBooking = (booking) => {
    const bookingWithId = {
      ...booking,
      id: Date.now().toString(), // Simple ID generation
      bookingDate: new Date().toISOString()
    };
    dispatch({ type: ACTIONS.ADD_BOOKING, payload: bookingWithId });
  };

  const removeBooking = (bookingId) => {
    dispatch({ type: ACTIONS.REMOVE_BOOKING, payload: bookingId });
  };

  const setUser = (user) => {
    dispatch({ type: ACTIONS.SET_USER, payload: user });
  };

  const isFavorite = (movieId) => {
    return state.favorites.some(movie => movie.id === movieId);
  };

  const hasBooking = (movieId, date) => {
    return state.bookings.some(booking => 
      booking.movieId === movieId && booking.date === date
    );
  };

  const value = {
    ...state,
    addFavorite,
    removeFavorite,
    addBooking,
    removeBooking,
    setUser,
    isFavorite,
    hasBooking
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 