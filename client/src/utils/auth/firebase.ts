// Placeholder file to avoid import errors after removing Firebase
// This file provides mock implementations of previously Firebase-dependent functions

// Mock auth object
export const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: null) => void) => {
    callback(null);
    return () => {}; // Return unsubscribe function
  },
};

// Mock refresh token function
export const refreshToken = async () => {
  console.warn('Firebase has been removed - refreshToken is a no-op');
  return null;
};

// Mock getCurrentUser function
export const getCurrentUser = () => {
  console.warn('Firebase has been removed - getCurrentUser is a no-op');
  return null;
};
