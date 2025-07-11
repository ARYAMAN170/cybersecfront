
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { NewsItem } from '../types';
import NewsCard from './NewsCard';

interface CriticalAlertsProps {
  alerts: NewsItem[];
  onBookmark: (item: NewsItem) => void;
}

const CriticalAlerts: React.FC<CriticalAlertsProps> = ({ alerts, onBookmark }) => {
  if (alerts.length === 0) return null;

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-1 shadow-lg">
        <div className="bg-white dark:bg-gray-900 rounded-md p-6">
          <div className="flex items-center space-x-3 mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </motion.div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Critical Security Alerts
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {alerts.length} critical issue{alerts.length !== 1 ? 's' : ''} requiring immediate attention
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <NewsCard 
                  item={alert} 
                  onBookmark={onBookmark}
                  isBookmarked={false} // You'd need to pass actual bookmark state here
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CriticalAlerts;
