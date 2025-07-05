import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsChart = ({ data, type = 'line', title, isDark = false }) => {
  const chartData = data || [
    { month: 'Jan', points: 2100, savings: 1200 },
    { month: 'Feb', points: 2800, savings: 1800 },
    { month: 'Mar', points: 3200, savings: 2400 },
    { month: 'Apr', points: 4100, savings: 3100 },
    { month: 'May', points: 4800, savings: 3800 },
    { month: 'Jun', points: 5320, savings: 4500 }
  ];

  const colors = {
    primary: isDark ? '#a855f7' : '#8b5cf6',
    secondary: isDark ? '#06b6d4' : '#0891b2',
    grid: isDark ? '#374151' : '#e5e7eb',
    text: isDark ? '#f3f4f6' : '#374151'
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'area') {
      return (
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.secondary} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={colors.secondary} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="month" 
            stroke={colors.text}
            fontSize={12}
          />
          <YAxis 
            stroke={colors.text}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="points"
            stroke={colors.primary}
            fillOpacity={1}
            fill="url(#colorPoints)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="savings"
            stroke={colors.secondary}
            fillOpacity={1}
            fill="url(#colorSavings)"
            strokeWidth={2}
          />
        </AreaChart>
      );
    }

    return (
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
        <XAxis 
          dataKey="month" 
          stroke={colors.text}
          fontSize={12}
        />
        <YAxis 
          stroke={colors.text}
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="points"
          stroke={colors.primary}
          strokeWidth={3}
          dot={{ fill: colors.primary, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: colors.primary, strokeWidth: 2 }}
        />
        <Line
          type="monotone"
          dataKey="savings"
          stroke={colors.secondary}
          strokeWidth={3}
          dot={{ fill: colors.secondary, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: colors.secondary, strokeWidth: 2 }}
        />
      </LineChart>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Points</span>
        </div>
        <div className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: colors.secondary }}
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">Savings (₹)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
