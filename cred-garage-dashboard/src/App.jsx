import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from './context/AppContext'
import AnalyticsChart from './components/AnalyticsChart'
import {
  Moon,
  Sun,
  User,
  Percent,
  Gift,
  Zap,
  Crown,
  Star,
  Truck,
  Award,
  TrendingUp,
  ChevronRight
} from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

// Mock Data
const userData = {
  name: "Ava Williams",
  level: 7,
  xp: 1420,
  maxXp: 2000,
  rewardPoints: 5320,
  rank: "Gold",
  avatar: "data:image/png;base64,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"
}

const benefitsData = [
  {
    id: 1,
    title: "10% off on Swiggy",
    description: "Save on food delivery orders",
    value: "10%",
    type: "cashback",
    icon: Percent,
    gradient: "from-blue-500 to-purple-600",
    action: "Claim"
  },
  {
    id: 2,
    title: "Special Gift Card",
    description: "₹500 voucher for your next purchase",
    value: "₹500",
    type: "voucher",
    icon: Gift,
    gradient: "from-emerald-500 to-teal-600",
    action: "View"
  },
  {
    id: 3,
    title: "Exclusive Offer",
    description: "Get access to limited-time deals",
    value: "VIP",
    type: "exclusive",
    icon: Crown,
    gradient: "from-orange-500 to-red-600",
    action: "View"
  },
  {
    id: 4,
    title: "Lightning Deals",
    description: "Flash sales and instant discounts",
    value: "Flash",
    type: "deals",
    icon: Zap,
    gradient: "from-yellow-500 to-orange-600",
    action: "Explore"
  },
  {
    id: 5,
    title: "Bonus Points",
    description: "Earn 2x points on all purchases",
    value: "2x",
    type: "points",
    icon: Star,
    gradient: "from-pink-500 to-purple-600",
    action: "Activate"
  },
  {
    id: 6,
    title: "Free Delivery",
    description: "No delivery charges for 30 days",
    value: "Free",
    type: "delivery",
    icon: Truck,
    gradient: "from-green-500 to-emerald-600",
    action: "Claim"
  }
]

// Skeleton Components
const SkeletonCard = () => (
  <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 animate-pulse">
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
      </div>
    </div>
    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
)

const SkeletonProfile = () => (
  <div
    data-testid="loading-skeleton"
    className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 animate-pulse"
  >
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
      <div className="flex-1">
        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>
    </div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
)

const SkeletonProgress = () => (
  <div className="bg-gray-200 dark:bg-gray-700 rounded-xl p-6 animate-pulse">
    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
    <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
  </div>
)

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('cred-theme')
    return saved ? JSON.parse(saved) : false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [animatedXP, setAnimatedXP] = useState(0)
  const [animatedPoints, setAnimatedPoints] = useState(0)

  // Persist theme to localStorage
  useEffect(() => {
    localStorage.setItem('cred-theme', JSON.stringify(isDark))
  }, [isDark])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      // Animate XP counter
      const xpTimer = setInterval(() => {
        setAnimatedXP(prev => {
          if (prev < userData.xp) {
            return Math.min(prev + 20, userData.xp)
          }
          clearInterval(xpTimer)
          return prev
        })
      }, 20)

      // Animate points counter
      const pointsTimer = setInterval(() => {
        setAnimatedPoints(prev => {
          if (prev < userData.rewardPoints) {
            return Math.min(prev + 100, userData.rewardPoints)
          }
          clearInterval(pointsTimer)
          return prev
        })
      }, 30)

      return () => {
        clearInterval(xpTimer)
        clearInterval(pointsTimer)
      }
    }
  }, [isLoading])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const progressPercentage = (animatedPoints / 6380) * 100

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`}>
      <div
        data-testid="main-container"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      >
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  CRED Garage
                </div>
              </div>

              <motion.button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-700" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* User Profile Section */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton-profile"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SkeletonProfile />
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <motion.img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {userData.name}
                        </h2>
                        <p className="text-purple-600 dark:text-purple-400 font-medium">
                          {userData.rank}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Level {userData.level}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {animatedXP} / {userData.maxXp} XP
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(animatedXP / userData.maxXp) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Benefits
                      </h3>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Benefits Grid */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Benefits
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Explore your exclusive rewards and offers
                </p>
              </div>

              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {[...Array(6)].map((_, index) => (
                      <SkeletonCard key={index} />
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="benefits-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {benefitsData.map((benefit, index) => (
                      <motion.div
                        key={benefit.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        className={`relative overflow-hidden bg-gradient-to-br ${benefit.gradient} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />
                        <div className="relative z-10">
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                              <benefit.icon className="w-6 h-6" />
                            </div>
                            <span className="text-2xl font-bold opacity-90">
                              {benefit.value}
                            </span>
                          </div>

                          <h3 className="text-lg font-semibold mb-2">
                            {benefit.title}
                          </h3>
                          <p className="text-white/80 text-sm mb-4">
                            {benefit.description}
                          </p>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg py-2 px-4 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                          >
                            <span>{benefit.action}</span>
                            <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reward Points Section */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="skeleton-progress"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <SkeletonProgress />
                  </motion.div>
                ) : (
                  <motion.div
                    key="progress"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                      Reward Points
                    </h3>

                    <div className="relative w-40 h-40 mx-auto mb-6">
                      <CircularProgressbar
                        value={progressPercentage}
                        // text={`${animatedPoints}`}
                        styles={buildStyles({
                          textSize: '16px',
                          pathColor: isDark ? '#a855f7' : '#8b5cf6',
                          textColor: isDark ? '#ffffff' : '#1f2937',
                          trailColor: isDark ? '#374151' : '#e5e7eb',
                          backgroundColor: 'transparent',
                        })}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">
                            {animatedPoints}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            points
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {6380 - animatedPoints} points to Silver
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Earn More</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Analytics Chart Section */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <AnalyticsChart
                title="Points & Savings Trend"
                type="area"
                isDark={isDark}
              />
            </motion.div>
          )}

          {/* Additional Stats Section */}
          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total Savings
                    </h4>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹12,450
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Member Since
                    </h4>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      2 Years
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      This Month
                    </h4>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      +850 pts
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
