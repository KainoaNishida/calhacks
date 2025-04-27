// Mock providers since Firebase has been removed
// No imports needed as Firebase has been removed

/**
 * Mock authentication functions since Firebase has been removed
 */
export async function authenticateFacebookUser() {
  console.warn('Firebase has been removed - authenticateFacebookUser is a no-op');
  return null;
}

export async function authenticateGoogleUser() {
  console.warn('Firebase has been removed - authenticateGoogleUser is a no-op');
  return null;
}
