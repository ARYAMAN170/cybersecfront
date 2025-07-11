
import { NewsItem } from '../types';

export const mockNewsData: NewsItem[] = [
  {
    id: '1',
    title: 'Critical Zero-Day Vulnerability Found in Popular Enterprise Software',
    summary: 'Security researchers have discovered a critical remote code execution vulnerability affecting millions of enterprise installations worldwide.',
    date: '2025-07-02T10:30:00Z',
    source: 'ZDI',
    url: 'https://example.com/news/1',
    severity: 'critical',
    tags: ['zero-day', 'RCE', 'enterprise'],
    cvssScore: 9.8,
    last_updated: '2025-07-02T10:30:00Z'
  },
  {
    id: '2',
    title: 'New Ransomware Campaign Targets Healthcare Sector',
    summary: 'Cybercriminals are deploying sophisticated ransomware specifically designed to target healthcare infrastructure and patient data.',
    date: '2025-07-02T09:15:00Z',
    source: 'BC',
    url: 'https://example.com/news/2',
    severity: 'high',
    tags: ['ransomware', 'healthcare', 'data-breach'],
    cvssScore: null,
    last_updated: '2025-07-02T09:15:00Z'
  },
  {
    id: '3',
    title: 'CISA Issues Emergency Directive for Federal Agencies',
    summary: 'The Cybersecurity and Infrastructure Security Agency has issued an emergency directive requiring immediate patching.',
    date: '2025-07-02T08:45:00Z',
    source: 'THN',
    url: 'https://example.com/news/3',
    severity: 'critical',
    tags: ['cisa', 'emergency', 'federal'],
    cvssScore: null,
    last_updated: '2025-07-02T08:45:00Z'
  },
  {
    id: '4',
    title: 'Supply Chain Attack Compromises Major Software Repository',
    summary: 'Attackers have successfully compromised a widely-used software repository, potentially affecting thousands of downstream applications.',
    date: '2025-07-01T16:20:00Z',
    source: 'BC',
    url: 'https://example.com/news/4',
    severity: 'high',
    tags: ['supply-chain', 'repository', 'malware'],
    cvssScore: null,
    last_updated: '2025-07-01T16:20:00Z'
  },
  {
    id: '5',
    title: 'AI-Powered Phishing Attacks Show 300% Increase',
    summary: 'Security researchers report a dramatic increase in sophisticated phishing attacks leveraging artificial intelligence.',
    date: '2025-07-01T14:10:00Z',
    source: 'THN',
    url: 'https://example.com/news/5',
    severity: 'medium',
    tags: ['ai', 'phishing', 'social-engineering'],
    cvssScore: null,
    last_updated: '2025-07-01T14:10:00Z'
  },
  {
    id: '6',
    title: 'Critical Infrastructure Under Targeted Attack',
    summary: 'Nation-state actors are targeting critical infrastructure systems with advanced persistent threats.',
    date: '2025-07-01T12:30:00Z',
    source: 'ZDI',
    url: 'https://example.com/news/6',
    severity: 'critical',
    tags: ['apt', 'infrastructure', 'nation-state'],
    cvssScore: null,
    last_updated: '2025-07-01T12:30:00Z'
  }
];

export const mockCriticalAlerts: NewsItem[] = mockNewsData.filter(
  item => item.severity === 'critical'
);
