import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Newspaper, Calendar } from 'lucide-react';
import { FilterState } from '../types';

interface SidebarProps {
  isOpen: boolean;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, filters, setFilters, onClose }) => {
  const sources = [
    { key: 'THN', label: 'The Hacker News', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-200' },
    { key: 'BC', label: 'Bleeping Computer', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200' },
    { key: 'ZDI', label: 'Zero Day Initiative', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200' }
  ];
  
  const handleSourceToggle = (source: string) => {
    setFilters({
      ...filters,
      sources: {
        ...filters.sources,
        [source]: !filters.sources[source as keyof typeof filters.sources]
      }
    });
  };

  const handleDateFilterChange = (value: string) => {
    setFilters({
      ...filters,
      dateFilter: value as any
    });
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      {/* <div className="p-5 border-b border-gray-200 dark:border-gray-700 mt-16 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span>News Filters</span>
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow"
        >
          <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div> */}

      {/* Scrollable content */}
      <div className="overflow-y-auto flex-1">
        {/* Search */}
        <div className="p-5 border-b border-gray-200 mt-16 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search news..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Date Filter */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Time Period</span>
          </h3>
          <div className="space-y-3">
            {[
              { value: 'all', label: 'All Time' },
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'Last 7 Days' },
              { value: 'month', label: 'Last 30 Days' }
            ].map((option) => (
              <motion.div 
                key={option.value} 
                className="flex items-center group cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => handleDateFilterChange(option.value)}
              >
                <div className={`relative h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  filters.dateFilter === option.value 
                    ? 'border-blue-500 bg-blue-500 dark:border-blue-400 dark:bg-blue-400'
                    : 'border-gray-300 dark:border-gray-600 group-hover:border-blue-300'
                }`}>
                  {filters.dateFilter === option.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 bg-white rounded-full"
                    />
                  )}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {option.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sources Filter */}
        <div className="p-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>News Sources</span>
          </h3>
          <div className="space-y-3">
            {sources.map((source) => (
              <motion.div
                key={source.key}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-colors ${
                  filters.sources[source.key as keyof typeof filters.sources]
                    ? `${source.color} shadow-inner`
                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSourceToggle(source.key)}
              >
                <div className={`relative h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                  filters.sources[source.key as keyof typeof filters.sources]
                    ? 'border-transparent bg-white/80 dark:bg-gray-800/80'
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                }`}>
                  {filters.sources[source.key as keyof typeof filters.sources] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-current"
                    >
                      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  filters.sources[source.key as keyof typeof filters.sources]
                    ? 'font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {source.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Fixed position with content offset */}
      <div className="hidden lg:block">
        <motion.div
          className="fixed left-0 top-0 h-screen w-80 z-30 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-xl"
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          exit={{ x: -320 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {sidebarContent}
        </motion.div>
        
        {/* Content area with left margin */}
        <div className="ml-80">
          {/* Your news content will go here and won't be hidden by the sidebar */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 max-w-full"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="bg-white dark:bg-gray-800 h-full flex flex-col">
              {sidebarContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;