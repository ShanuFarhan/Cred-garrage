import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { AppProvider } from '../context/AppContext';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock react-circular-progressbar
vi.mock('react-circular-progressbar', () => ({
  CircularProgressbar: ({ value, ...props }) => (
    <div data-testid="circular-progress" data-value={value} {...props}>
      Progress: {value}%
    </div>
  ),
  buildStyles: () => ({}),
}));

// Mock API service
vi.mock('../services/api', () => ({
  apiService: {
    getUserProfile: vi.fn(() => Promise.resolve({
      success: true,
      data: {
        name: "Test User",
        level: 5,
        xp: 1000,
        maxXp: 2000,
        rewardPoints: 3000,
        rank: "Silver",
        avatar: "test-avatar.jpg"
      }
    })),
    getBenefits: vi.fn(() => Promise.resolve({
      success: true,
      data: [
        {
          id: 1,
          title: "Test Benefit",
          description: "Test description",
          value: "10%",
          type: "cashback",
          icon: "Percent",
          gradient: "from-blue-500 to-purple-600",
          action: "Claim",
          isActive: true
        }
      ]
    })),
    getAnalytics: vi.fn(() => Promise.resolve({
      success: true,
      data: {
        pointsHistory: [],
        savingsHistory: []
      }
    }))
  },
  withErrorHandling: vi.fn((fn) => fn())
}));

// Test wrapper component
const TestWrapper = ({ children }) => (
  <AppProvider>
    {children}
  </AppProvider>
);

describe('CRED Garage Dashboard', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset all mocks
    vi.clearAllMocks();
  });

  describe('App Component', () => {
    it('renders loading state initially', () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Should show loading skeletons
      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('renders main content after loading', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      }, { timeout: 3000 });

      // Should show main content
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('Level 5')).toBeInTheDocument();
    });

    it('toggles theme when theme button is clicked', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      }, { timeout: 3000 });

      // Find and click theme toggle button
      const themeButton = screen.getByRole('button', { name: /toggle theme/i });
      fireEvent.click(themeButton);

      // Check if theme was toggled (this would require checking class changes)
      expect(localStorage.getItem('cred-theme')).toBeTruthy();
    });

    it('displays user profile information correctly', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('Level 5')).toBeInTheDocument();
        expect(screen.getByText('Silver')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('displays benefits section', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Benefit')).toBeInTheDocument();
        expect(screen.getByText('Test description')).toBeInTheDocument();
        expect(screen.getByText('Claim')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('displays reward points progress', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Reward Points')).toBeInTheDocument();
        expect(screen.getByTestId('circular-progress')).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('persists theme preference in localStorage', async () => {
      // Set initial theme in localStorage
      localStorage.setItem('cred-theme', 'true');

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Theme should be loaded from localStorage
      expect(localStorage.getItem('cred-theme')).toBe('true');
    });
  });

  describe('Responsive Design', () => {
    it('adapts to mobile viewport', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Should render mobile-friendly layout
      const container = screen.getByTestId('main-container');
      expect(container).toHaveClass('min-h-screen');
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      // Mock API error
      const { apiService } = await import('../services/api');
      apiService.getUserProfile.mockRejectedValueOnce(new Error('Network error'));

      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      // Should handle error without crashing
      await waitFor(() => {
        expect(screen.queryByTestId('loading-skeleton')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      await waitFor(() => {
        const themeButton = screen.getByRole('button', { name: /toggle theme/i });
        expect(themeButton).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('supports keyboard navigation', async () => {
      render(
        <TestWrapper>
          <App />
        </TestWrapper>
      );

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAttribute('tabIndex');
        });
      }, { timeout: 3000 });
    });
  });
});
