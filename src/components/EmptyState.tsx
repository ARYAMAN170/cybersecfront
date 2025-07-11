
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 text-gray-500 dark:text-gray-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 10, -10, 0] 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <Search className="h-16 w-16 mb-6 text-gray-300 dark:text-gray-600" />
      </motion.div>
      
      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
        No articles found
      </h3>
      <p className="text-center max-w-md">
        Try adjusting your search criteria or filters to find cybersecurity news articles.
      </p>
      
      <motion.div
        className="mt-6 text-sm text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        💡 Tip: Clear your search or enable more news sources
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
