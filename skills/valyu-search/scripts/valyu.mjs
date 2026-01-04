#!/usr/bin/env node

/**
 * Valyu CLI Tool - Direct API Implementation
 * Usage: valyu <searchType> <query> [maxResults]
 * Example: valyu web "AI news" 10
 */

const VALYU_API_BASE = 'https://api.valyu.ai/v1';

// Source configurations for each search type
const SEARCH_CONFIGS = {
  web: {
    search_type: 'web'
  },
  finance: {
    search_type: 'proprietary',
    included_sources: [
      'valyu/valyu-stocks',
      'valyu/valyu-sec-filings',
      'valyu/valyu-earnings-US',
      'valyu/valyu-balance-sheet-US',
      'valyu/valyu-income-statement-US',
      'valyu/valyu-cash-flow-US',
      'valyu/valyu-dividends-US',
      'valyu/valyu-insider-transactions-US',
      'valyu/valyu-crypto',
      'valyu/valyu-forex'
    ]
  },
  paper: {
    search_type: 'proprietary',
    included_sources: [
      'valyu/valyu-arxiv',
      'valyu/valyu-biorxiv',
      'valyu/valyu-medrxiv',
      'valyu/valyu-pubmed'
    ]
  },
  bio: {
    search_type: 'proprietary',
    included_sources: [
      'valyu/valyu-pubmed',
      'valyu/valyu-biorxiv',
      'valyu/valyu-medrxiv',
      'valyu/valyu-clinical-trials',
      'valyu/valyu-drug-labels'
    ]
  },
  patent: {
    search_type: 'proprietary',
    included_sources: ['valyu/valyu-patents']
  },
  sec: {
    search_type: 'proprietary',
    included_sources: ['valyu/valyu-sec-filings']
  },
  economics: {
    search_type: 'proprietary',
    included_sources: [
      'valyu/valyu-bls',
      'valyu/valyu-fred',
      'valyu/valyu-world-bank',
      'valyu/valyu-worldbank-indicators',
      'valyu/valyu-usaspending'
    ]
  },
  news: {
    search_type: 'news'
  },
  answer: {
    useAnswer: true
  }
};

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('Usage: valyu <searchType> <query> [maxResults]');
    console.error('');
    console.error('Search types: web, finance, paper, bio, patent, sec, economics, news, answer');
    console.error('');
    console.error('Examples:');
    console.error('  valyu web "AI news 2025" 10');
    console.error('  valyu bio "cancer treatments"');
    console.error('  valyu answer "What is quantum computing?"');
    process.exit(1);
  }

  const searchType = args[0].toLowerCase();
  const query = args[1];
  const maxResults = args[2] ? parseInt(args[2]) : 10;

  if (!SEARCH_CONFIGS[searchType]) {
    console.error(`Invalid search type: ${searchType}`);
    console.error(`Valid types: ${Object.keys(SEARCH_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  if (!process.env.VALYU_API_KEY) {
    console.error('Error: VALYU_API_KEY environment variable not set');
    process.exit(1);
  }

  const apiKey = process.env.VALYU_API_KEY;
  const config = SEARCH_CONFIGS[searchType];

  try {
    let endpoint, payload;

    if (config.useAnswer) {
      // Use Answer API
      endpoint = `${VALYU_API_BASE}/answer`;
      payload = {
        query: query,
        search_type: 'all',
        data_max_price: 40.0
      };
    } else {
      // Use Search API
      endpoint = `${VALYU_API_BASE}/search`;
      payload = {
        query: query,
        max_num_results: maxResults,
        ...config
      };
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(JSON.stringify({
        success: false,
        error: `API error: ${response.status} - ${errorText}`
      }, null, 2));
      process.exit(1);
    }

    const data = await response.json();

    if (config.useAnswer) {
      // Answer API response
      console.log(JSON.stringify({
        success: true,
        type: 'answer',
        query: query,
        answer: data.contents,
        sources: data.search_results || [],
        cost: data.cost?.total_deduction_dollars || 0
      }, null, 2));
    } else {
      // Search API response
      console.log(JSON.stringify({
        success: true,
        type: 'search',
        searchType: searchType,
        query: query,
        resultCount: data.results?.length || 0,
        results: (data.results || []).map(r => ({
          title: r.title,
          url: r.url,
          content: r.content,
          source: r.source,
          relevance_score: r.relevance_score
        })),
        cost: data.total_deduction_dollars || 0
      }, null, 2));
    }
  } catch (error) {
    console.error(JSON.stringify({
      success: false,
      error: error.message
    }, null, 2));
    process.exit(1);
  }
}

main();
