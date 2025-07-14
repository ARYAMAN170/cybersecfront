import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, BookmarkMinus, ArrowUpRight } from 'lucide-react';
import { NewsItem } from '../types';

interface NewsCardProps {
  item: NewsItem;
  onBookmark: (item: NewsItem) => void;
  isBookmarked: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, onBookmark, isBookmarked }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSourceColor = (source?: string) => {
    switch (source) {
      case 'THN':
        return 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-200 dark:border-pink-800';
      case 'BC':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800';
      case 'ZDI':
        return 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  const getTagColor = (index: number) => {
    const colors = [
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200',
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200',
      'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-200',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200',
      'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-200',
      'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-200'
    ];
    return colors[index % colors.length];
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown Date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow w-full min-w-0" // Changed min-width
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-4 sm:p-5"> {/* Reduced padding on mobile */}
        {/* Header */}
        <div className="flex justify-between items-start mb-3 gap-2"> {/* Added gap */}
          <div className={`px-2.5 py-0.5 rounded-md text-xs sm:text-sm font-medium border ${getSourceColor(item.source)}`}>
            {getSourceName(item.source)}
          </div>

          <motion.button
            onClick={() => onBookmark(item)}
            className={`p-1.5 sm:p-2 rounded-md ${
              isBookmarked
                ? 'bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-300'
                : 'bg-gray-50 text-gray-400 dark:bg-gray-700 dark:text-gray-500'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isBookmarked ? (
              <BookmarkMinus className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
            ) : (
              <Bookmark className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
            )}
          </motion.button>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 leading-snug sm:leading-tight">
          {item.title || 'Security Update'}
        </h3>

        {/* Summary */}
        <div className="mb-3 sm:mb-4">
          <p className={`text-sm sm:text-base text-gray-600 dark:text-gray-300 ${!isExpanded ? 'line-clamp-3' : ''} ${!item.summary && 'italic text-gray-400 dark:text-gray-500'}`}>
            {item.summary?.trim() || 'No summary available for this update.'}
          </p>

          {item.summary && item.summary.length > 120 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-xs sm:text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              {isExpanded ? 'Show less' : 'Read full summary'}
            </button>
          )}
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
            {item.tags.map((tag, index) => (
              <motion.span
                key={index}
                className={`px-2 py-0.5 text-xs rounded-full ${getTagColor(index)}`}
                whileHover={{ scale: 1.05 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {formatDate(item.date)}
          </div>

          {item.url && (
            <motion.a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md bg-gray-100 text-gray-700 font-medium text-xs sm:text-sm hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              whileHover={{ x: 2 }}
            >
              <span>Read</span>
              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

function getSourceName(source?: string) {
  switch (source) {
    case 'THN': return 'The Hacker News';
    case 'BC': return 'Bleeping Computer';
    case 'ZDI': return 'Zero Day Initiative';
    default: return source || 'Security';
  }
}

export default NewsCard;
