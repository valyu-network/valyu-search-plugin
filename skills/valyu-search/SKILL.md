---
name: valyu-search
description: CLI tool for specialized search using Valyu API directly. Use when user requests searches with syntax like "Valyu(searchType, query, maxResults)" or needs domain-specific research. Provides command-line access to web search, academic papers, financial data, biomedical research, patents, SEC filings, economic indicators, and AI-powered answers via direct API calls.
---

# Valyu Search

Execute specialized searches using the Valyu CLI tool with simple syntax: `Valyu(searchType, query, maxResults)`

The third parameter (maxResults) is optional and defaults to 10.

## Installation

The skill includes a `valyu` CLI tool that makes direct API calls to Valyu (no SDK dependency).

Requirements:
1. Node.js (for running the CLI - uses built-in fetch)
2. Set environment variable: `export VALYU_API_KEY=your-api-key`
3. Make scripts executable (already done in packaged skill)

## Usage from Bash

When user requests `Valyu(searchType, query, maxResults)`, execute:

```bash
scripts/valyu <searchType> <query> [maxResults]
```

The tool outputs JSON results to stdout.

## Search Types

### web
```bash
scripts/valyu web "AI developments 2025" 10
```
General web search for current information and news.

### finance
```bash
scripts/valyu finance "Apple Q4 earnings" 8
```
Financial data including stocks, earnings, SEC filings, crypto, forex.

**Sources:** valyu-stocks, valyu-sec-filings, valyu-earnings-US, valyu-balance-sheet-US, valyu-income-statement-US, valyu-cash-flow-US, valyu-dividends-US, valyu-insider-transactions-US, valyu-crypto, valyu-forex

### paper
```bash
scripts/valyu paper "transformer architectures" 15
```
Academic research papers and scholarly articles.

**Sources:** valyu-arxiv, valyu-biorxiv, valyu-medrxiv, valyu-pubmed

### bio
```bash
scripts/valyu bio "cancer immunotherapy"
```
Biomedical research, clinical trials, drug information.

**Sources:** valyu-pubmed, valyu-biorxiv, valyu-medrxiv, valyu-clinical-trials, valyu-drug-labels

### patent
```bash
scripts/valyu patent "quantum computing algorithms" 5
```
Patent databases and intellectual property.

**Sources:** valyu-patents

### sec
```bash
scripts/valyu sec "Tesla 10-K filing"
```
SEC regulatory filings (10-K, 10-Q, 8-K).

**Sources:** valyu-sec-filings

### economics
```bash
scripts/valyu economics "US unemployment rate" 5
```
Economic indicators and statistics.

**Sources:** valyu-bls, valyu-fred, valyu-world-bank, valyu-worldbank-indicators, valyu-usaspending

### news
```bash
scripts/valyu news "tech layoffs 2025" 20
```
Recent news articles and media.

### answer
```bash
scripts/valyu answer "What is quantum computing?"
```
AI-generated answers with sources (uses Answer API).

## Output Format

### Search Results
```json
{
  "success": true,
  "type": "search",
  "searchType": "web",
  "query": "AI news",
  "resultCount": 10,
  "results": [
    {
      "title": "Latest AI Developments",
      "url": "https://example.com/ai-news",
      "content": "Full article content...",
      "source": "web",
      "relevance_score": 0.95
    }
  ],
  "cost": 0.025
}
```

### Answer Results
```json
{
  "success": true,
  "type": "answer",
  "query": "What is quantum computing?",
  "answer": "Quantum computing is...",
  "sources": [
    {
      "title": "Source Title",
      "url": "https://example.com"
    }
  ],
  "cost": 0.032
}
```

## Examples

```bash
# Web search with 10 results
scripts/valyu web "healthiest foods 2025 for weight loss" 10

# Biomedical research (default 10)
scripts/valyu bio "diabetes treatment innovations"

# Financial data with 8 results
scripts/valyu finance "Microsoft earnings Q4 2024" 8

# Academic papers with 15 results
scripts/valyu paper "machine learning interpretability" 15

# AI-powered answer
scripts/valyu answer "Explain the transformer architecture"

# News search with 20 results
scripts/valyu news "AI regulation European Union" 20
```

## Processing Results

```bash
# Capture output
result=$(scripts/valyu web "AI news" 5)

# Parse with jq
echo "$result" | jq '.results[] | {title, url}'

# Check success
if echo "$result" | jq -e '.success' > /dev/null; then
  echo "Search successful"
fi

# Get result count
count=$(echo "$result" | jq '.resultCount')
echo "Found $count results"
```

## Error Handling

Errors are returned as JSON:
```json
{
  "success": false,
  "error": "Error message here"
}
```

Exit codes:
- `0` - Success
- `1` - Error (check JSON output for details)

## Requirements

- **Node.js** - For running the CLI tool (uses built-in fetch, no external dependencies)
- **Environment variable:** `VALYU_API_KEY`
- **Get API key:** https://platform.valyu.ai ($10 free credits)
- **No npm packages required** - Direct API calls only

## Architecture

```
scripts/
├── valyu          # Bash wrapper (use this)
└── valyu.mjs      # Node.js CLI implementation (direct API calls)
```

The implementation uses Node.js built-in `fetch` to make direct API calls, no external dependencies needed.
