
export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  url: string;
  severity: string | null;
  tags: string[];
  cvssScore: number | null;
  last_updated: string;
}


export interface ApiResponse {
  articles: NewsItem[];
}

export interface FilterState {
  searchTerm: string;
  sources: {
    THN: boolean;
    BC: boolean;
    ZDI: boolean;
  };
  dateFilter: 'all' | 'today' | 'week';
}
