import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthProvider } from '../contexts/AuthContext';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-secure-store
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Simple component to test AuthProvider
const TestComponent = () => {
  return null;
};

describe('babyLLM Frontend', () => {
  describe('AuthProvider', () => {
    it('should render without crashing', () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });
  });

  describe('App Structure', () => {
    it('should have proper project structure', () => {
      // Test that required files exist
      expect(require('../contexts/AuthContext')).toBeDefined();
      expect(require('../app/_layout')).toBeDefined();
    });
  });
});
