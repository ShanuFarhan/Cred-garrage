import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService, withErrorHandling } from '../services/api';

// Initial state
const initialState = {
  // UI State
  isDark: (() => {
    const saved = localStorage.getItem('cred-theme');
    return saved ? JSON.parse(saved) : false;
  })(),
  isLoading: true,
  
  // Data State
  user: null,
  benefits: [],
  analytics: null,
  
  // Animation State
  animatedXP: 0,
  animatedPoints: 0,
  
  // Error State
  error: null,
  
  // Loading States
  loadingStates: {
    user: false,
    benefits: false,
    analytics: false,
    claiming: false
  }
};

// Action types
const actionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LOADING: 'SET_LOADING',
  SET_USER: 'SET_USER',
  SET_BENEFITS: 'SET_BENEFITS',
  SET_ANALYTICS: 'SET_ANALYTICS',
  SET_ANIMATED_XP: 'SET_ANIMATED_XP',
  SET_ANIMATED_POINTS: 'SET_ANIMATED_POINTS',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING_STATE: 'SET_LOADING_STATE',
  CLAIM_BENEFIT_SUCCESS: 'CLAIM_BENEFIT_SUCCESS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return { ...state, isDark: action.payload };
    
    case actionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case actionTypes.SET_BENEFITS:
      return { ...state, benefits: action.payload };
    
    case actionTypes.SET_ANALYTICS:
      return { ...state, analytics: action.payload };
    
    case actionTypes.SET_ANIMATED_XP:
      return { ...state, animatedXP: action.payload };
    
    case actionTypes.SET_ANIMATED_POINTS:
      return { ...state, animatedPoints: action.payload };
    
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    
    case actionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case actionTypes.SET_LOADING_STATE:
      return {
        ...state,
        loadingStates: {
          ...state.loadingStates,
          [action.payload.key]: action.payload.value
        }
      };
    
    case actionTypes.CLAIM_BENEFIT_SUCCESS:
      return {
        ...state,
        benefits: state.benefits.map(benefit =>
          benefit.id === action.payload.benefitId
            ? { ...benefit, isActive: false, claimedAt: action.payload.claimedAt }
            : benefit
        )
      };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('cred-theme', JSON.stringify(state.isDark));
  }, [state.isDark]);

  // Actions
  const actions = {
    // Theme actions
    toggleTheme: () => {
      dispatch({ type: actionTypes.SET_THEME, payload: !state.isDark });
    },

    setTheme: (isDark) => {
      dispatch({ type: actionTypes.SET_THEME, payload: isDark });
    },

    // Loading actions
    setLoading: (isLoading) => {
      dispatch({ type: actionTypes.SET_LOADING, payload: isLoading });
    },

    setLoadingState: (key, value) => {
      dispatch({ type: actionTypes.SET_LOADING_STATE, payload: { key, value } });
    },

    // Data actions
    setUser: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user });
    },

    setBenefits: (benefits) => {
      dispatch({ type: actionTypes.SET_BENEFITS, payload: benefits });
    },

    setAnalytics: (analytics) => {
      dispatch({ type: actionTypes.SET_ANALYTICS, payload: analytics });
    },

    // Animation actions
    setAnimatedXP: (xp) => {
      dispatch({ type: actionTypes.SET_ANIMATED_XP, payload: xp });
    },

    setAnimatedPoints: (points) => {
      dispatch({ type: actionTypes.SET_ANIMATED_POINTS, payload: points });
    },

    // Error actions
    setError: (error) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: actionTypes.CLEAR_ERROR });
    },

    // API actions
    loadUserProfile: async () => {
      actions.setLoadingState('user', true);
      try {
        const response = await withErrorHandling(() => apiService.getUserProfile());
        if (response.success) {
          actions.setUser(response.data);
        } else {
          actions.setError(response.error);
        }
      } catch (error) {
        actions.setError(error.message);
      } finally {
        actions.setLoadingState('user', false);
      }
    },

    loadBenefits: async () => {
      actions.setLoadingState('benefits', true);
      try {
        const response = await withErrorHandling(() => apiService.getBenefits());
        if (response.success) {
          actions.setBenefits(response.data);
        } else {
          actions.setError(response.error);
        }
      } catch (error) {
        actions.setError(error.message);
      } finally {
        actions.setLoadingState('benefits', false);
      }
    },

    loadAnalytics: async () => {
      actions.setLoadingState('analytics', true);
      try {
        const response = await withErrorHandling(() => apiService.getAnalytics());
        if (response.success) {
          actions.setAnalytics(response.data);
        } else {
          actions.setError(response.error);
        }
      } catch (error) {
        actions.setError(error.message);
      } finally {
        actions.setLoadingState('analytics', false);
      }
    },

    claimBenefit: async (benefitId) => {
      actions.setLoadingState('claiming', true);
      try {
        const response = await withErrorHandling(() => apiService.claimBenefit(benefitId));
        if (response.success) {
          dispatch({
            type: actionTypes.CLAIM_BENEFIT_SUCCESS,
            payload: response.data
          });
          return { success: true, message: response.message };
        } else {
          actions.setError(response.error);
          return { success: false, error: response.error };
        }
      } catch (error) {
        actions.setError(error.message);
        return { success: false, error: error.message };
      } finally {
        actions.setLoadingState('claiming', false);
      }
    },

    // Initialize app data
    initializeApp: async () => {
      actions.setLoading(true);
      
      // Load all data in parallel
      await Promise.all([
        actions.loadUserProfile(),
        actions.loadBenefits(),
        actions.loadAnalytics()
      ]);
      
      // Simulate minimum loading time for better UX
      setTimeout(() => {
        actions.setLoading(false);
      }, 2000);
    }
  };

  // Initialize app on mount
  useEffect(() => {
    actions.initializeApp();
  }, []);

  // Animation effects
  useEffect(() => {
    if (!state.isLoading && state.user) {
      // Animate XP counter
      const xpTimer = setInterval(() => {
        actions.setAnimatedXP(prev => {
          if (prev < state.user.xp) {
            return Math.min(prev + 25, state.user.xp);
          }
          clearInterval(xpTimer);
          return prev;
        });
      }, 50);

      // Animate points counter
      const pointsTimer = setInterval(() => {
        actions.setAnimatedPoints(prev => {
          if (prev < state.user.rewardPoints) {
            return Math.min(prev + 89, state.user.rewardPoints);
          }
          clearInterval(pointsTimer);
          return prev;
        });
      }, 30);

      return () => {
        clearInterval(xpTimer);
        clearInterval(pointsTimer);
      };
    }
  }, [state.isLoading, state.user]);

  return (
    <AppContext.Provider value={{ state, actions }}>
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

export default AppContext;
