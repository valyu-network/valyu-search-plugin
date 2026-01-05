# Valyu Search Plugin for Claude

Specialized search tool that provides Claude Code with direct access to Valyu's search APIs through a simple CLI interface.

## Features

**8 Search Types:**
- `web` - General web search
- `finance` - Financial data (stocks, earnings, SEC filings, crypto)
- `paper` - Academic papers (arXiv, PubMed)
- `bio` - Biomedical research and clinical trials
- `patent` - Patent databases
- `sec` - SEC regulatory filings
- `economics` - Economic indicators (BLS, FRED, World Bank)
- `news` - News articles

**Plus:**
- `answer` - AI-powered answers with sources
- `contents` - Extract content from URLs
- `deepresearch` - Async deep research reports

**Zero Dependencies:**
- Direct API calls using Node.js built-in `fetch`
- No npm packages required
- Just Node.js 18+ and your Valyu API key

## Installation

```bash
# Add the marketplace
/plugin marketplace add valyu-network/valyu-search-plugin

# Install the plugin
/plugin install valyu-search-plugin@valyu-marketplace
```

## API Key Setup

Get your API key from [platform.valyu.ai](https://platform.valyu.ai) ($10 free credits).

### Automatic Setup (Recommended)

Just start using the plugin! On first use, Claude will:
1. Detect that no API key is configured
2. Ask you to paste your API key
3. Save it automatically to `~/.valyu/config.json`
4. Retry your search

```
You: Valyu(web, "AI news 2025")
Claude: "To use Valyu search, I need your API key. Get one free at https://platform.valyu.ai"
You: val_abc123...
Claude: [saves key and runs search]
```

### Manual Setup (Alternative)

If you prefer to set up manually:

**Option 1: Environment Variable**

For Zsh (macOS default):
```bash
echo 'export VALYU_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc
```

For Bash:
```bash
echo 'export VALYU_API_KEY="your-api-key-here"' >> ~/.bashrc
source ~/.bashrc
```

**Option 2: Config File**

```bash
mkdir -p ~/.valyu
echo '{"apiKey": "your-api-key-here"}' > ~/.valyu/config.json
```

**Option 3: VSCode Settings** (for GUI-launched VSCode)

Add to your `settings.json`:
```json
{
  "terminal.integrated.env.osx": {
    "VALYU_API_KEY": "your-api-key-here"
  }
}
```

### Key Lookup Priority

The plugin checks for API keys in this order:
1. `VALYU_API_KEY` environment variable
2. `~/.valyu/config.json` file

## Usage

### Search

```
Valyu(searchType, "query", maxResults)
```

**Search Types:** `web`, `finance`, `paper`, `bio`, `patent`, `sec`, `economics`, `news`

```bash
# Web search
Valyu(web, "AI developments 2025", 10)

# Biomedical research
Valyu(bio, "cancer immunotherapy clinical trials")

# Financial data
Valyu(finance, "Apple Q4 2024 earnings", 8)

# Academic papers
Valyu(paper, "transformer neural networks", 15)
```

### Answer

Get AI-powered answers with source citations:

```bash
Valyu(answer, "What is quantum computing?")
Valyu(answer, "Latest AI news", --fast)
```

### Contents

Extract content from URLs:

```bash
Valyu(contents, "https://example.com/article")
Valyu(contents, "https://example.com", --summary)
```

### DeepResearch

Create async research reports:

```bash
Valyu(deepresearch, create, "AI market trends 2025")
Valyu(deepresearch, status, "task-id-here")
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

Valyu AI

## Links

- Get API Key: https://platform.valyu.ai
- Valyu Docs: https://docs.valyu.ai
