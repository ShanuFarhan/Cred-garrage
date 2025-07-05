// Mock API Service Layer
// Simulates real API calls with delays and realistic data

const API_DELAY = 1500; // Simulate network delay

// Mock user data
const mockUserData = {
  name: "Ava Williams",
  level: 7,
  xp: 1420,
  maxXp: 2000,
  rewardPoints: 5320,
  rank: "Gold",
  avatar: "data:image/png;base64,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",
  totalSavings: 12450,
  memberSince: "2 Years",
  monthlyPoints: 850,
  nextMilestone: 6380,
  currentStreak: 15
};

// Mock benefits data
const mockBenefitsData = [
  {
    id: 1,
    title: "10% off on Swiggy",
    description: "Save on food delivery orders",
    value: "10%",
    type: "cashback",
    icon: "Percent",
    gradient: "from-blue-500 to-purple-600",
    action: "Claim",
    isActive: true,
    expiresAt: "2025-08-01"
  },
  {
    id: 2,
    title: "Special Gift Card",
    description: "₹500 voucher for your next purchase",
    value: "₹500",
    type: "voucher",
    icon: "Gift",
    gradient: "from-emerald-500 to-teal-600",
    action: "View",
    isActive: true,
    expiresAt: "2025-07-15"
  },
  {
    id: 3,
    title: "Premium Membership",
    description: "Unlock exclusive benefits",
    value: "FREE",
    type: "membership",
    icon: "Crown",
    gradient: "from-yellow-500 to-orange-600",
    action: "Upgrade",
    isActive: false,
    expiresAt: null
  },
  {
    id: 4,
    title: "Lightning Deal",
    description: "Flash sale on electronics",
    value: "25%",
    type: "sale",
    icon: "Zap",
    gradient: "from-red-500 to-pink-600",
    action: "Shop",
    isActive: true,
    expiresAt: "2025-07-10"
  },
  {
    id: 5,
    title: "Free Delivery",
    description: "No delivery charges this month",
    value: "FREE",
    type: "shipping",
    icon: "Truck",
    gradient: "from-indigo-500 to-blue-600",
    action: "Use",
    isActive: true,
    expiresAt: "2025-07-31"
  },
  {
    id: 6,
    title: "Bonus Points",
    description: "Double points on next purchase",
    value: "2X",
    type: "points",
    icon: "Star",
    gradient: "from-purple-500 to-indigo-600",
    action: "Activate",
    isActive: false,
    expiresAt: "2025-08-15"
  }
];

// Mock analytics data
const mockAnalyticsData = {
  pointsHistory: [
    { month: 'Jan', points: 2100 },
    { month: 'Feb', points: 2800 },
    { month: 'Mar', points: 3200 },
    { month: 'Apr', points: 4100 },
    { month: 'May', points: 4800 },
    { month: 'Jun', points: 5320 }
  ],
  savingsHistory: [
    { month: 'Jan', savings: 1200 },
    { month: 'Feb', savings: 1800 },
    { month: 'Mar', savings: 2400 },
    { month: 'Apr', savings: 3100 },
    { month: 'May', savings: 3800 },
    { month: 'Jun', savings: 4500 }
  ]
};

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Functions
export const apiService = {
  // Fetch user profile data
  async getUserProfile() {
    await delay(API_DELAY);
    return {
      success: true,
      data: mockUserData
    };
  },

  // Fetch benefits data
  async getBenefits() {
    await delay(API_DELAY);
    return {
      success: true,
      data: mockBenefitsData
    };
  },

  // Fetch analytics data
  async getAnalytics() {
    await delay(API_DELAY);
    return {
      success: true,
      data: mockAnalyticsData
    };
  },

  // Claim a benefit
  async claimBenefit(benefitId) {
    await delay(1000);
    return {
      success: true,
      message: `Benefit ${benefitId} claimed successfully!`,
      data: {
        benefitId,
        claimedAt: new Date().toISOString()
      }
    };
  },

  // Update user profile
  async updateProfile(updates) {
    await delay(1200);
    return {
      success: true,
      message: "Profile updated successfully!",
      data: { ...mockUserData, ...updates }
    };
  },

  // Simulate error scenarios
  async simulateError() {
    await delay(1000);
    throw new Error("Network error occurred");
  }
};

// Error handling wrapper
export const withErrorHandling = async (apiCall) => {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
};
