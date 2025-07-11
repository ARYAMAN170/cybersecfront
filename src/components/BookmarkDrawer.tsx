import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark } from 'lucide-react';
import { NewsItem } from '../types';
import NewsCard from './NewsCard';

interface BookmarkDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: NewsItem[];
  onRemoveBookmark: (item: NewsItem) => void;
}

const BookmarkDrawer: React.FC<BookmarkDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Bookmark className="h-5 w-5 text-yellow-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Bookmarks
                </h2>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-full">
                  {bookmarks.length}
                </span>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {bookmarks.length === 0 ? (
                <motion.div
                  className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Bookmark className="h-12 w-12 mb-4" />
                  <p className="text-center">No bookmarks yet</p>
                  <p className="text-sm text-center mt-1">
                    Save articles to read them later
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {bookmarks.map((bookmark, index) => (
                    <motion.div
                      key={bookmark.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NewsCard
                        item={bookmark}
                        onBookmark={onRemoveBookmark}
                        isBookmarked={true}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookmarkDrawer;
