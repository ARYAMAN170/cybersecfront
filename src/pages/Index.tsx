import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import NewsCard from '../components/NewsCard';
import BookmarkDrawer from '../components/BookmarkDrawer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import { fetchNews, refreshNews } from '../services/apiService';
import { NewsItem, FilterState } from '../types';

const Index = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState<NewsItem[]>([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    sources: {
      'THN': true,
      'BC': true,
      'ZDI': true
    },
    dateFilter: 'all'
  });

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('cybersec-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Fetch initial data from db-news
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await fetchNews();
        setNewsData(response.articles);
        setLastUpdated(new Date());
      } catch (error) {
        console.error('Error fetching initial news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Auto refresh functionality using /news endpoint
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(async () => {
        try {
          const response = await refreshNews();
          setNewsData(response.articles);
          setLastUpdated(new Date());
          console.log('Auto-refreshing data from /news endpoint...');
        } catch (error) {
          console.error('Error auto-refreshing data:', error);
        }
      }, 300000); // 5 minutes
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Filter news based on current filters
  useEffect(() => {
    let filtered = newsData;

    // Filter by search term
    if (filters.searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Filter by sources
    const activeSources = Object.entries(filters.sources)
      .filter(([_, active]) => active)
      .map(([source, _]) => source);
    
    if (activeSources.length > 0) {
      filtered = filtered.filter(item => activeSources.includes(item.source));
    }

    // Filter by date
    const now = new Date();
    if (filters.dateFilter === 'today') {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.toDateString() === now.toDateString();
      });
    } else if (filters.dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(item => new Date(item.date) >= weekAgo);
    }

    setFilteredNews(filtered);
  }, [newsData, filters]);

  const handleBookmark = (item: NewsItem) => {
    const isBookmarked = bookmarks.some(bookmark => bookmark.id === item.id);
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== item.id);
    } else {
      updatedBookmarks = [...bookmarks, item];
    }
    
    setBookmarks(updatedBookmarks);
    localStorage.setItem('cybersec-bookmarks', JSON.stringify(updatedBookmarks));
  };

  // Manual refresh using /news endpoint
  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await refreshNews();
      setNewsData(response.articles);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        lastUpdated={lastUpdated}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        onRefresh={refreshData}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleBookmarks={() => setShowBookmarks(!showBookmarks)}
        loading={loading}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Main News Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Latest Cybersecurity News
                  </h2>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {filteredNews.length} articles found
                  </div>
                </div>
                
                {loading ? (
                  <LoadingSkeleton />
                ) : filteredNews.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

                    {filteredNews.map((item, index) => (
                      <motion.div
  key={item.id}
  className="break-inside-avoid"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
  <NewsCard 
    item={item} 
    onBookmark={handleBookmark}
    isBookmarked={bookmarks.some(b => b.id === item.id)}
  />
</motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
      
      <BookmarkDrawer 
        isOpen={showBookmarks}
        onClose={() => setShowBookmarks(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleBookmark}
      />
    </div>
  );
};

export default Index;
