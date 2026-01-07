# Flex

A responsive, minimalist [Pelican](https://getpelican.com/) theme with comprehensive SEO/LEO support, dark mode, and modern features.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Note**: This is a heavily modified fork of [alexandrevicenzi/Flex](https://github.com/alexandrevicenzi/Flex). See [Changes from Original](#changes-from-original-flex) for details.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Configuration Reference](#configuration-reference)
  - [Site Settings](#site-settings)
  - [Navigation & Layout](#navigation--layout)
  - [Dark Mode & Styling](#dark-mode--styling)
  - [SEO & Social](#seo--social)
  - [Analytics & Tracking](#analytics--tracking)
  - [Comments](#comments)
  - [Newsletter](#newsletter)
  - [Advertising](#advertising)
  - [Favicon](#favicon)
  - [YouTube Embedding](#youtube-embedding)
  - [Advanced Features](#advanced-features)
- [Plugin Support](#plugin-support)
- [Article Frontmatter](#article-frontmatter)
- [Changes from Original Flex](#changes-from-original-flex)
- [Documentation](#documentation)
- [License](#license)

## Features

### Core
- **Mobile-first** responsive design
- **Dark mode** with system preference detection and manual toggle
- **Pagefind search** integration (static search)
- **Reading progress** indicator
- **Table of contents** for articles (optional)

### SEO & LLM Engine Optimization (LEO)
- **Schema.org structured data**: BlogPosting, FAQPage, HowTo, BreadcrumbList
- **Open Graph** and **Twitter Cards** meta tags
- **AI-friendly meta tags** for ChatGPT, Perplexity, and other LLMs
- **Speakable** schema for voice search
- **Canonical URLs** support

### Content Features
- **Series navigation** for multi-part articles
- **Related posts** display
- **Previous/next article** navigation
- **YouTube video embedding** (Obsidian `vid` code block format)
- **Syndication links** for cross-posted content
- **BibTeX citation** blocks
- **Applause button** support

### Integrations
- Google Analytics (GA4)
- Google Tag Manager
- Microsoft Clarity
- Google AdSense
- Giscus comments (GitHub Discussions)
- Newsletter subscriptions (Mailchimp, Buttondown, ConvertKit, Substack)
- RealFaviconGenerator support

## Quick Start

### Installation

```bash
# Clone into your Pelican themes directory
git clone https://github.com/izikeros/Flex.git pelican-themes/Flex
```

### Minimal Configuration

Add to your `pelicanconf.py`:

```python
THEME = "pelican-themes/Flex"

# Required
SITENAME = "My Blog"
SITEURL = "https://example.com"
AUTHOR = "Your Name"

# Recommended
SITETITLE = "My Blog"
SITESUBTITLE = "A blog about things"
SITELOGO = "/images/logo.png"
MAIN_MENU = True
```

## Configuration Reference

### Site Settings

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `SITENAME` | Site name (used in titles) | Required | `"My Blog"` |
| `SITETITLE` | Display title in sidebar | `SITENAME` | `"My Blog"` |
| `SITESUBTITLE` | Tagline below title | `None` | `"Thoughts on code"` |
| `SITELOGO` | Logo image URL | `None` | `"/images/logo.png"` |
| `SITEDESCRIPTION` | Meta description | `""` | `"A tech blog"` |
| `SITEURL` | Base URL (no trailing slash) | Required | `"https://example.com"` |

### Navigation & Layout

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `MAIN_MENU` | Show main navigation bar | `False` | `True` |
| `MENUITEMS` | Navigation menu items | `[]` | `[("Archives", "/archives.html")]` |
| `LINKS` | Sidebar links | `[]` | `[("About", "/pages/about.html")]` |
| `LINKS_IN_NEW_TAB` | Open links in new tab | `False` | `True`, `"external"`, `"all"` |
| `SOCIAL` | Social media links | `[]` | `[("github", "https://github.com/user")]` |
| `DISPLAY_PAGES_ON_MENU` | Show pages in sidebar | `True` | `False` |
| `PAGES_SORT_ATTRIBUTE` | Sort pages by attribute | `None` | `"title"` |
| `HOME_HIDE_TAGS` | Hide tags on homepage cards | `False` | `True` |
| `DISABLE_URL_HASH` | Disable URL hash fragments | `False` | `True` |

### Dark Mode & Styling

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `PYGMENTS_STYLE` | Code highlight style (light) | `"github"` | `"monokai"` |
| `PYGMENTS_STYLE_DARK` | Code highlight style (dark) | `None` | `"monokai"` |
| `BROWSER_COLOR` | Browser theme color | `None` | `"#333333"` |
| `CUSTOM_CSS` | Custom stylesheet path | `None` | `"static/custom.css"` |
| `USE_GOOGLE_FONTS` | Load Google Fonts | `True` | `False` |

### SEO & Social

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `REL_CANONICAL` | Enable canonical URLs | `False` | `True` |
| `ROBOTS` | Robots meta directive | `"index,follow"` | `"noindex,nofollow"` |
| `OG_LOCALE` | Open Graph locale | `"en_US"` | `"de_DE"` |
| `TWITTER_USERNAME` | Twitter handle for cards | `None` | `"username"` |
| `TWITTER_CREATOR` | Twitter creator handle | `None` | `"username"` |
| `FEATURED_IMAGE` | Default social share image | `None` | `"/images/default.jpg"` |

### Analytics & Tracking

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `GOOGLE_ANALYTICS` | GA4 measurement ID | `None` | `"G-XXXXXXXXXX"` |
| `GOOGLE_GLOBAL_SITE_TAG` | Alternative GA setup | `None` | `"G-XXXXXXXXXX"` |
| `GOOGLE_TAG_MANAGER` | GTM container ID | `None` | `"GTM-XXXXXXX"` |
| `MICROSOFT_CLARITY` | Clarity project ID | `None` | `"abcdefghij"` |

### Comments

#### Giscus (GitHub Discussions)

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `GISCUS_REPO` | GitHub repo | `None` | `"user/repo"` |
| `GISCUS_REPO_ID` | Repository ID | `None` | `"R_xxxxx"` |
| `GISCUS_CATEGORY` | Discussion category | `None` | `"Comments"` |
| `GISCUS_CATEGORY_ID` | Category ID | `None` | `"DIC_xxxxx"` |
| `GISCUS_MAPPING` | Comment mapping | `"pathname"` | `"title"` |
| `GISCUS_REACTIONS` | Enable reactions | `"1"` | `"0"` |
| `GISCUS_INPUT_POSITION` | Input box position | `"bottom"` | `"top"` |

See [docs/GISCUS_COMMENTS.md](docs/GISCUS_COMMENTS.md) for setup instructions.

### Newsletter

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NEWSLETTER_ENABLED` | Enable subscription box | `False` | `True` |
| `NEWSLETTER_PROVIDER` | Service provider | `None` | `"mailchimp"`, `"buttondown"`, `"convertkit"`, `"substack"`, `"custom"` |
| `NEWSLETTER_TITLE` | Box title | `"Stay Updated"` | `"Subscribe"` |
| `NEWSLETTER_DESCRIPTION` | Box description | Default text | `"Get updates"` |

Provider-specific settings:

| Provider | Required Variables |
|----------|-------------------|
| `mailchimp` | `NEWSLETTER_ACTION_URL` |
| `buttondown` | `NEWSLETTER_USERNAME` |
| `convertkit` | `NEWSLETTER_FORM_ID` |
| `substack` | `NEWSLETTER_PUBLICATION` |
| `custom` | `NEWSLETTER_ACTION_URL`, optional: `NEWSLETTER_METHOD`, `NEWSLETTER_EMAIL_FIELD` |

See [docs/NEWSLETTER.md](docs/NEWSLETTER.md) for detailed setup.

### Advertising

| Variable | Description | Default |
|----------|-------------|---------|
| `GOOGLE_ADSENSE` | AdSense configuration dict | `None` |
| `USE_GOOGLE_AUTO_ADS` | Enable auto ads | `False` |

AdSense configuration:

```python
GOOGLE_ADSENSE = {
    "ca_id": "ca-pub-XXXXXXXXXX",
    "page_level_ads": True,
    "ads": {
        "aside": "XXXXXXXXXX",
        "main_menu": "XXXXXXXXXX",
        "index_top": "XXXXXXXXXX",
        "index_bottom": "XXXXXXXXXX",
        "article_top": "XXXXXXXXXX",
        "article_bottom": "XXXXXXXXXX",
    }
}
```

### Favicon

#### Simple Favicon

```python
FAVICON = "/images/favicon.ico"
```

#### RealFaviconGenerator (Recommended)

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `RFG_FAVICONS` | Enable RFG package | `False` | `True` |
| `RFG_THEME_COLOR` | Browser theme color | `None` | `"#333333"` |
| `RFG_SAFARI_PINNED_TAB` | Safari pinned tab color | `None` | `"#333333"` |
| `RFG_MSAPPLICATION_TILECOLOR` | Windows tile color | `None` | `"#333333"` |

Setup:
1. Go to [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Generate and download favicon package
3. Place files in `content/` directory
4. Add to `STATIC_PATHS`: `favicon.ico`, `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`, `site.webmanifest`
5. Enable: `RFG_FAVICONS = True`

### YouTube Embedding

| Variable | Description | Default |
|----------|-------------|---------|
| `YOUTUBE_EMBED` | Enable Obsidian vid block conversion | `False` |

Usage in markdown:

````markdown
```vid
https://www.youtube.com/watch?v=VIDEO_ID
Title: Video Title
Author: Channel Name
AuthorUrl: https://www.youtube.com/@Channel
```
````

Features:
- Responsive 16:9 aspect ratio
- Privacy-enhanced (`youtube-nocookie.com`)
- Lazy loading
- Optional title/author info bar

### Advanced Features

| Variable | Description | Default |
|----------|-------------|---------|
| `ENABLE_TOC` | Enable table of contents | `False` |
| `SHOW_DATE_MODIFIED` | Show modified dates | `False` |
| `USE_MERMAID` | Enable Mermaid diagrams | `False` |
| `USE_APPLAUSE` | Enable applause button | `False` |
| `ADD_BIBTEX_NOTE` | Add BibTeX citation block | `False` |
| `BIBTEX_JOURNAL` | Journal name for BibTeX | `None` |
| `GITHUB_CORNER_URL` | GitHub corner link | `None` |
| `PROMO_BOX` | Enable sidebar promo box | `False` |
| `ADD_THIS_ID` | AddThis sharing ID | `None` |

#### Creative Commons License

```python
CC_LICENSE = {
    "slug": "by-sa",
    "name": "Creative Commons Attribution-ShareAlike",
    "version": "4.0",
    "language": "en_US"
}
COPYRIGHT_YEAR = "2024"
COPYRIGHT_NAME = "Your Name"
```

## Plugin Support

### Fully Supported Plugins

| Plugin | Purpose | Theme Integration |
|--------|---------|-------------------|
| [post_stats](https://github.com/pelican-plugins/post-stats) | Reading time, word count | Displayed in article header and meta |
| [related_posts](https://github.com/pelican-plugins/related-posts) | Related articles | Grid display after article |
| [neighbors](https://github.com/pelican-plugins/neighbors) | Prev/next navigation | Navigation buttons |
| [series](https://github.com/pelican-plugins/series) | Multi-part articles | Full series navigation UI |
| [share_post](https://github.com/pelican-plugins/share-post) | Social sharing links | Share icons in header |
| [i18n_subsites](https://github.com/pelican-plugins/i18n-subsites) | Multi-language | Translation switcher |
| [seo](https://github.com/pelican-plugins/seo) | SEO optimization | Compatible (disables built-in) |

### Recommended Companion Plugins

| Plugin | Purpose |
|--------|---------|
| [pelican-obsidian](https://github.com/izikeros/pelican-obsidian) | Obsidian wiki-links, hashtag removal, callouts to admonitions |
| [seo_leo_enhancer](docs/SEO_LEO_SPEC.md) | Auto-extract FAQ/HowTo, word count, TL;DR |
| [exclude_category](https://github.com/pelican-plugins/more-categories) | Filter categories from index |
| [yaml_metadata](https://github.com/pelican-plugins/yaml-metadata) | YAML frontmatter parsing |

### pelican-obsidian Integration

The theme works seamlessly with [pelican-obsidian](https://github.com/izikeros/pelican-obsidian):

- **Wiki-links**: `[[article-slug]]` converts to proper links
- **Hashtag removal**: Inline `#tags` removed from body text
- **Callouts to Admonitions**: Obsidian callouts render with theme's admonition CSS

```python
# pelicanconf.py
PLUGINS = ["obsidian", ...]
OBSIDIAN_CALLOUTS_USE_ADMONITION = True  # Use theme's admonition styles
```

Supported callout types: `note`, `tip`, `warning`, `danger`, `info`, `question`, `example`, `quote`, `abstract`, `success`, `failure`, `bug`, `important`, `caution`, `attention`

## Article Frontmatter

### Standard Fields

```yaml
Title: Article Title
Date: 2024-01-15
Modified: 2024-01-20
Category: Machine Learning
Tags: python, ml, tutorial
Slug: article-slug
Status: published
Summary: Brief description for listings
Image: /images/featured.jpg
```

### SEO/LEO Fields

```yaml
Article-Type: howto  # article, howto, faq, tutorial
AI-Summary: Two-sentence summary for AI systems
Key-Takeaways:
  - First key point
  - Second key point
Expertise-Level: intermediate  # beginner, intermediate, advanced
Topics: machine learning, python, data science
```

### FAQ Schema

```yaml
FAQ:
  - question: What is X?
    answer: X is a thing that does Y.
  - question: How do I Z?
    answer: You can Z by doing A, B, C.
```

Or use content markers:
```markdown
<!-- faq-start -->
### What is X?
X is a thing that does Y.
<!-- faq-end -->
```

### HowTo Schema

```yaml
Article-Type: howto
HowTo-Steps:
  - name: Install dependencies
    text: Run pip install package-name
  - name: Configure settings
    text: Edit config.yaml with your values
```

### Syndication

```yaml
Syndicated-To:
  - platform: dev.to
    url: https://dev.to/user/article
    date: 2024-01-16
  - platform: medium
    url: https://medium.com/@user/article
```

See [docs/SEO_LEO_SPEC.md](docs/SEO_LEO_SPEC.md) and [docs/ARTICLE_WRITING_GUIDE.md](docs/ARTICLE_WRITING_GUIDE.md) for complete documentation.

## Changes from Original Flex

This fork includes significant enhancements over [alexandrevicenzi/Flex](https://github.com/alexandrevicenzi/Flex):

### New Features
- **Pagefind search** - Static site search integration
- **Dark mode toggle** - Manual theme switcher with localStorage persistence
- **Reading progress bar** - Visual scroll progress indicator
- **Table of contents** - Auto-generated from headings
- **Series navigation** - Full UI for multi-part articles
- **YouTube embedding** - Obsidian `vid` code block support
- **Newsletter subscription** - Multiple provider support
- **Giscus comments** - GitHub Discussions integration
- **RealFaviconGenerator** - Cross-platform favicon support
- **Microsoft Clarity** - Analytics integration

### SEO/LEO Enhancements
- **FAQPage schema** - Structured data for Q&A content
- **HowTo schema** - Structured data for tutorials
- **BreadcrumbList schema** - Navigation structured data
- **AI meta tags** - Optimization for LLM systems
- **Speakable schema** - Voice search optimization
- **Syndication display** - Cross-posting links

### Template Changes
- **TIL (Things I Learned)** - Dedicated template for notes
- **Archives by year** - Grouped archive display
- **Article cards** - Modern card-based homepage layout
- **Filtered pagination** - Category exclusion from index
- **Admonition styling** - CSS for callout/admonition blocks

### Removed/Changed
- Disqus comments (replaced with Giscus)
- Tipue Search (replaced with Pagefind)
- Some legacy integrations

**Full diff**: [Compare with original](https://github.com/alexandrevicenzi/Flex/compare/master...izikeros:master)

## Documentation

- [SEO/LEO Specification](docs/SEO_LEO_SPEC.md) - Complete SEO and AI optimization guide
- [Article Writing Guide](docs/ARTICLE_WRITING_GUIDE.md) - How to write optimized articles
- [Giscus Setup](docs/GISCUS_COMMENTS.md) - GitHub Discussions comments
- [Newsletter Setup](docs/NEWSLETTER.md) - Email subscription configuration
- [Original Flex Wiki](https://github.com/alexandrevicenzi/Flex/wiki) - Base theme documentation

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Original theme by** [Alexandre Vicenzi](https://github.com/alexandrevicenzi)  
**Fork maintained by** [Krystian Safjan](https://github.com/izikeros)
