# Valyu Search Plugin for Claude

Specialized search tool that provides Claude Code with direct access to Valyu's search APIs through a simple CLI interface.

## Features

🔍 **9 Search Types:**
- `web` - General web search
- `finance` - Financial data (stocks, earnings, SEC filings, crypto)
- `paper` - Academic papers (arXiv, PubMed)
- `bio` - Biomedical research and clinical trials
- `patent` - Patent databases
- `sec` - SEC regulatory filings
- `economics` - Economic indicators (BLS, FRED, World Bank)
- `news` - News articles
- `answer` - AI-powered answers with sources

⚡ **Zero Dependencies:**
- Direct API calls using Node.js built-in `fetch`
- No npm packages required
- Just Node.js 18+ and your Valyu API key

## Installation

### From Marketplace

```bash
# Add the marketplace (once you've pushed to GitHub)
/plugin marketplace add yourusername/valyu-search-plugin

# Install the plugin
/plugin install valyu-search-plugin@valyu-marketplace
```

### Manual Installation

1. Download the plugin
2. Set your Valyu API key:
```bash
export VALYU_API_KEY="your-api-key-here"
```
3. Use the simple `Valyu()` syntax

## Usage

### Simple Syntax

```
Valyu(searchType, query, maxResults)
```

Where:
- `searchType`: One of the 9 search types listed above
- `query`: Your search query
- `maxResults`: Optional, defaults to 10

### Examples

```bash
# Web search
Valyu(web, "AI developments 2025", 10)

# Biomedical research
Valyu(bio, "cancer immunotherapy clinical trials")

# Financial data
Valyu(finance, "Apple Q4 2024 earnings", 8)

# Academic papers
Valyu(paper, "transformer neural networks", 15)

# AI-powered answer
Valyu(answer, "What is quantum computing?")
```

Claude Code will execute these as:
```bash
scripts/valyu web "AI developments 2025" 10
scripts/valyu bio "cancer immunotherapy clinical trials"
scripts/valyu finance "Apple Q4 2024 earnings" 8
# etc...
```

## Output

All commands return JSON with structured results:

```json
{
  "success": true,
  "type": "search",
  "searchType": "web",
  "query": "AI news",
  "resultCount": 10,
  "results": [
    {
      "title": "Article Title",
      "url": "https://example.com",
      "content": "Full content...",
      "source": "web",
      "relevance_score": 0.95
    }
  ],
  "cost": 0.025
}
```

## Requirements

- Node.js 18+ (for built-in fetch API)
- Valyu API key (get $10 free credits at https://platform.valyu.ai)

## Data Sources

The plugin provides access to specialized data sources:

### Finance
- Stock prices, earnings, balance sheets, income statements
- Crypto, forex, dividends, insider transactions

### Academic
- arXiv, bioRxiv, medRxiv, PubMed

### Biomedical
- PubMed articles, clinical trials, FDA drug labels

### Economic
- BLS labor stats, FRED data, World Bank indicators

### Other
- Patents, SEC filings, real-time news

## License

MIT

## Author

Abdul

## Links

- Get API Key: https://platform.valyu.ai
- Valyu Docs: https://docs.valyu.ai
