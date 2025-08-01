import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Search, Bookmark, ToggleLeft, ToggleRight } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  lastUpdated: Date;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  onRefresh: () => Promise<void>;
  onToggleSidebar: () => void;
  onToggleBookmarks: () => void;
  loading: boolean;
}

const Header: React.FC<HeaderProps> = ({
  lastUpdated,
  autoRefresh,
  setAutoRefresh,
  onRefresh,
  onToggleSidebar,
  onToggleBookmarks,
  loading
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-gradient-to-r from-purple-300 via-pink-200 to-red-200 dark:from-purple-800 dark:via-pink-800 dark:to-red-800 border-b border-white/20 shadow-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-14">
          {/* Left - Sidebar Toggle & Branding */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search button - visible only on mobile */}
            <motion.button
              onClick={onToggleSidebar}
              className="p-2 rounded-full bg-white bg-opacity-30 text-gray-700 dark:text-white hover:bg-opacity-40 transition-all duration-300 md:hidden"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <div className="flex items-center space-x-2 md:space-x-3">
              <motion.div
                className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-yellow-300 to-orange-300 dark:from-yellow-600 dark:to-orange-600 rounded-xl flex items-center justify-center shadow-sm"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <span className="text-white font-extrabold text-sm md:text-base">CS</span>
              </motion.div>
              {/* Show heading text on tablets and up */}
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-#0f0c10 dark:text-white tracking-tight">
                  CyberSec Dashboard
                </h1>
                <p className="text-xs md:text-sm text-[#1f0a26] dark:text-gray-300 text-opacity-90 font-medium">
                  Real-time cybersecurity intelligence
                </p>
              </div>
            </div>
          </div>

          {/* Right - Controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Last Updated - Hidden on mobile, shown on tablets and up */}
            <div className="hidden sm:flex flex-col items-end text-xs md:text-sm text-gray-700 dark:text-gray-300 text-opacity-90">
              <span className="font-medium">Last updated</span>
              <span className="font-bold">{formatTime(lastUpdated)}</span>
            </div>

            {/* Auto Refresh Toggle - shows "Refresh" on mobile, "Auto Refresh" on tablets and up */}
            <motion.button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center space-x-1 md:space-x-2 px-2 py-1 md:px-3 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shadow-md ${
                autoRefresh
                  ? 'bg-gradient-to-r from-green-300 to-teal-400 text-white'
                  : 'bg-white bg-opacity-30 text-gray-700 dark:text-white hover:bg-opacity-40'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {autoRefresh ? <ToggleRight className="h-4 w-4 md:h-5 md:w-5" /> : <ToggleLeft className="h-4 w-4 md:h-5 md:w-5" />}
              <span className="hidden sm:inline">Auto Refresh</span>
              <span className="sm:hidden">Refresh</span>
            </motion.button>

            {/* Manual Refresh with Loader */}
            <motion.button
              onClick={onRefresh}
              className="p-2 md:p-2.5 rounded-full bg-white bg-opacity-30 text-gray-700 dark:text-white hover:bg-opacity-40 transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: loading ? 0 : 360 }}
              whileTap={{ scale: 0.9 }}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-4 w-4 md:h-5 md:w-5 text-gray-700 dark:text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l5-5-5-5v4a12 12 0 00-12 12h4z"
                  ></path>
                </svg>
              ) : (
                <RefreshCcw className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </motion.button>

            {/* Bookmarks */}
            <motion.button
              onClick={onToggleBookmarks}
              className="p-2 md:p-2.5 rounded-full bg-white bg-opacity-30 text-gray-700 dark:text-white hover:bg-opacity-40 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bookmark className="h-4 w-4 md:h-5 md:w-5" />
            </motion.button>

            {/* Dark Mode */}
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;