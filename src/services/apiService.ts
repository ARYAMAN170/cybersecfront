
import { ApiResponse } from '../types';

const API_BASE_URL = 'https://cybernews-backend-7.onrender.com/api';

// For initial data loading
export const fetchNews = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/db-news`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching news from db-news:', error);
    // Fallback mock data for development
    return {
      articles: [
        {
          id: 'mock-1',
          title: 'FAKE : Critical Zero-Day Vulnerability Discovered in Enterprise Software',
          summary: 'Security researchers have discovered a critical remote code execution vulnerability affecting millions of enterprise installations worldwide.',
          date: new Date().toISOString(),
          source: 'THN',
          url: 'https://example.com/news/1',
          severity: 'critical',
          tags: ['zero-day', 'RCE', 'enterprise'],
          cvssScore: 9.8,
          last_updated: new Date().toISOString()
        },
        {
          id: 'mock-2',
          title:'FAKE : New Ransomware Campaign Targets Healthcare Sector',
          summary: 'Cybercriminals are deploying sophisticated ransomware specifically designed to target healthcare infrastructure.',
          date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          source: 'BC',
          url: 'https://example.com/news/2',
          severity: 'high',
          tags: ['ransomware', 'healthcare'],
          cvssScore: null,
          last_updated: new Date().toISOString()
        },
        {
          id: 'mock-3',
          title: 'FAKE : Supply Chain Attack Compromises Software Repository',
          summary: 'Attackers have successfully compromised a widely-used software repository, potentially affecting thousands of applications.',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          source: 'ZDI',
          url: 'https://example.com/news/3',
          severity: 'medium',
          tags: ['supply-chain', 'repository'],
          cvssScore: 7.5,
          last_updated: new Date().toISOString()
        }
      ]
    };
  }
};

// For refresh action
export const refreshNews = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/news`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error refreshing news from /news:', error);
    // Fallback to the same mock data structure
    return {
      articles: [
        {
          id: 'refreshed-1',
          title: 'FAKE :Breaking: New Critical Vulnerability Patched',
          summary: 'A new critical vulnerability has been discovered and patched in major enterprise software.',
          date: new Date().toISOString(),
          source: 'THN',
          url: 'https://example.com/news/refreshed-1',
          severity: 'critical',
          tags: ['patch', 'critical', 'enterprise'],
          cvssScore: 9.2,
          last_updated: new Date().toISOString()
        }
      ]
    };
  }
};
