# SEO and LEO (LLM Engine Optimization) Specification

This document describes the extended YAML frontmatter schema and plugin architecture for optimizing content for both traditional search engines (SEO) and AI/LLM systems (LEO - LLM Engine Optimization).

## Table of Contents

1. [Philosophy: Separation of Concerns](#philosophy-separation-of-concerns)
2. [Current SEO Implementation](#current-seo-implementation)
3. [Extended YAML Frontmatter Schema](#extended-yaml-frontmatter-schema)
4. [Markdown Content Markers](#markdown-content-markers)
5. [Plugin Architecture](#plugin-architecture)
6. [Template Integration](#template-integration)
7. [Complete Example](#complete-example)
8. [Implementation Priority](#implementation-priority)

---

## Philosophy: Separation of Concerns

| Responsibility | Article Writer (Markdown) | Pelican Plugin/Theme |
|----------------|---------------------------|----------------------|
| Content | Write the actual content | Render to HTML |
| Metadata hints | Provide frontmatter hints | Generate structured data |
| Schema type | Declare `Article-Type: howto` | Generate HowTo schema |
| FAQ content | Write Q&A in markdown | Extract and generate FAQ schema |
| Key points | Write `## TL;DR` section | Extract for speakable/summary |
| Citations | Provide sources | Generate citation schema |

The goal is to keep the article writer's job simple (markdown + YAML hints) while the plugin handles all complex schema.org and meta tag generation.

---

## Current SEO Implementation

### What's Already Implemented

- **JSON-LD structured data** for Blog and BlogPosting (`partial/jsonld.html`, `partial/jsonld_article.html`)
- **Open Graph tags** - og:title, og:description, og:image, etc. (`partial/og.html`, `partial/og_article.html`)
- **Twitter Cards** - summary_large_image, reading time (`partial/twitter_article.html`)
- **Canonical URLs** - Prevents duplicate content issues
- **Meta descriptions** and keywords
- **Author metadata**
- **Article dates** (published/modified)
- **Sitemap** (plugin available)
- **RSS/Atom feeds**

### What's Missing for Modern SEO/LEO

1. **FAQ Schema** - For Q&A content
2. **HowTo Schema** - For tutorials
3. **Speakable Schema** - For voice search
4. **BreadcrumbList Schema** - For navigation
5. **Enhanced BlogPosting** - wordCount, keywords, articleSection
6. **AI-friendly meta tags** - For ChatGPT, Perplexity, etc.

---

## Extended YAML Frontmatter Schema

### Current Fields (Keep As-Is)

```yaml
Title: Article Title
Date: 2024-01-15
Modified: 2024-01-20
Category: Machine Learning
Status: published
Tags:
  - python
  - ml
Slug: article-slug
Summary: Brief summary for listings
Image: /images/head/image.jpg
```

### New SEO/LEO Fields

#### Content Type (for schema.org selection)

```yaml
Article-Type: article  # article | howto | faq | tutorial | review | news | techArticle
```

The plugin generates appropriate schema based on this field:
- `article` → BlogPosting
- `howto` → HowTo + BlogPosting
- `faq` → FAQPage + BlogPosting
- `tutorial` → TechArticle
- `review` → Review
- `news` → NewsArticle

#### AI/LLM Optimization

```yaml
AI-Summary: >
  Two-sentence summary optimized for AI citation.
  This appears in AI search results and is used by LLMs for context.

Key-Takeaways:
  - First key point for readers
  - Second important insight
  - Third actionable item

Topics:
  - machine-learning
  - deep-learning
  - neural-networks

Expertise-Level: intermediate  # beginner | intermediate | advanced | expert
```

#### Enhanced SEO

```yaml
Meta-Description: >
  Custom meta description (if different from Summary).
  Limit to 155 characters for Google.

Canonical-URL: https://example.com/original  # If republished from elsewhere

No-Index: false  # Set true for pages you don't want indexed
```

#### Citations & Sources

```yaml
Sources:
  - title: Original Paper
    url: https://arxiv.org/abs/2005.11401
    author: Author Name
    date: 2023-05-01
  - title: Documentation
    url: https://docs.example.com/
```

#### Syndication Tracking

```yaml
Syndicated-To:
  - platform: dev.to
    url: https://dev.to/user/article
    date: 2024-01-16
  - platform: medium
    url: https://medium.com/@user/article
    date: 2024-01-17
  - platform: hashnode
    url: https://blog.hashnode.dev/article
    date: 2024-01-18
```

#### Structured FAQ Content

```yaml
FAQ:
  - question: What is machine learning?
    answer: Machine learning is a subset of AI that enables systems to learn from data.
  - question: How do I get started?
    answer: Start with Python and scikit-learn for classical ML, or PyTorch for deep learning.
```

#### HowTo Steps (for tutorials)

```yaml
HowTo-Steps:
  - name: Install dependencies
    text: Run pip install numpy pandas scikit-learn
    image: /images/steps/step1.png  # optional
  - name: Load the data
    text: Use pandas.read_csv() to load your dataset
  - name: Train the model
    text: Initialize and fit your model with model.fit(X, y)
```

#### Reading/Content Stats

```yaml
Word-Count: auto  # Plugin calculates if 'auto', or specify manually
Reading-Time: auto  # Plugin calculates if 'auto'
```

#### Social/Sharing Overrides

```yaml
Social-Image: /images/og/custom-social.png  # Override default OG image
Social-Title: Custom Title for Social Media  # Override for Twitter/LinkedIn
Social-Description: Custom description for social sharing
```

#### Series/Related Content

```yaml
Series: Python ML Tutorial
Series-Part: 3

Related-Slugs:
  - python-basics
  - pandas-tutorial
  - numpy-fundamentals
```

---

## Markdown Content Markers

Allow writers to mark special sections in content that plugins can extract automatically.

### TL;DR Section

```markdown
## TL;DR

<!-- tldr-start -->
This article explains how to build a RAG pipeline. The key insight is that 
chunking strategy matters more than model choice. You should start with 
LangChain for rapid prototyping.
<!-- tldr-end -->
```

The plugin extracts this for:
- Speakable schema
- AI summary (if `AI-Summary` not provided)
- Meta description fallback

### FAQ in Content

```markdown
## Frequently Asked Questions

<!-- faq-start -->
### What is machine learning?

Machine learning is a subset of artificial intelligence that enables 
systems to learn and improve from experience without being explicitly programmed.

### How long does it take to learn?

With dedicated study, you can learn the basics in 3-6 months. Mastery 
takes years of practice and continuous learning.

### Do I need a math background?

Basic linear algebra and statistics help, but many practitioners learn 
the math as needed while building projects.
<!-- faq-end -->
```

The plugin parses H3 headers as questions and following paragraphs as answers.

### Key Steps (HowTo)

```markdown
## Installation Steps

<!-- howto-start -->
### Step 1: Install Python

Download Python from python.org and run the installer. Make sure to 
check "Add Python to PATH" during installation.

### Step 2: Set up virtual environment

Open terminal and run:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### Step 3: Install dependencies

```bash
pip install numpy pandas scikit-learn
```
<!-- howto-end -->
```

### Speakable/Quotable Content

Mark important quotes or summaries for voice search:

```markdown
<!-- speakable -->
> The most important thing to remember is that machine learning 
> requires quality data more than complex algorithms. Start with 
> clean data and simple models before adding complexity.
<!-- /speakable -->
```

### Definition Blocks

```markdown
<!-- definition -->
**Machine Learning**: A subset of artificial intelligence that enables 
computers to learn from data without being explicitly programmed.
<!-- /definition -->
```

---

## Plugin Architecture

### Proposed Plugin: `seo-leo-enhancer`

```python
"""
SEO/LEO Enhancer Plugin
=======================

Reads extended frontmatter and content markers to generate:
1. Enhanced JSON-LD structured data (BlogPosting, HowTo, FAQ, etc.)
2. AI-friendly meta tags
3. Speakable specifications
4. Auto-calculated stats (word count, reading time)
5. Breadcrumb data
6. Citation formatting
"""

from pelican import signals
import re
import json

def enhance_article(article):
    """Main enhancement function called for each article."""
    
    # 1. Determine schema type from Article-Type field
    article_type = article.metadata.get('article-type', 'article')
    
    # 2. Extract TL;DR from content markers
    tldr = extract_section(article.content, 'tldr-start', 'tldr-end')
    
    # 3. Extract FAQ from frontmatter OR content markers
    faq = article.metadata.get('faq') or extract_faq_from_content(article.content)
    
    # 4. Extract HowTo steps from frontmatter OR content
    howto = article.metadata.get('howto-steps') or extract_howto_from_content(article.content)
    
    # 5. Calculate stats if 'auto'
    if article.metadata.get('word-count', 'auto') == 'auto':
        article.word_count = count_words(article.content)
        article.reading_time = max(1, article.word_count // 200)
    
    # 6. Build schema objects
    article.schemas = {
        'main': build_main_schema(article, article_type),
        'faq': build_faq_schema(faq) if faq else None,
        'howto': build_howto_schema(article, howto) if howto else None,
        'breadcrumb': build_breadcrumb(article),
        'speakable': build_speakable(article, tldr),
    }
    
    # 7. Build AI meta tags
    article.ai_meta = {
        'summary': article.metadata.get('ai-summary') or tldr or article.summary,
        'topics': article.metadata.get('topics') or [t.name for t in article.tags],
        'expertise': article.metadata.get('expertise-level', 'intermediate'),
        'key_takeaways': article.metadata.get('key-takeaways', []),
    }
    
    # 8. Process syndication links
    article.syndication = article.metadata.get('syndicated-to', [])


def extract_section(content, start_marker, end_marker):
    """Extract content between HTML comment markers."""
    pattern = f'<!--\\s*{start_marker}\\s*-->(.+?)<!--\\s*{end_marker}\\s*-->'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return None


def extract_faq_from_content(content):
    """Extract FAQ from markdown H3 headers within faq markers."""
    faq_content = extract_section(content, 'faq-start', 'faq-end')
    if not faq_content:
        return None
    
    faqs = []
    # Split by H3 headers
    parts = re.split(r'###\s+(.+?)\n', faq_content)
    for i in range(1, len(parts), 2):
        question = parts[i].strip()
        answer = parts[i + 1].strip() if i + 1 < len(parts) else ''
        if question and answer:
            faqs.append({'question': question, 'answer': answer})
    
    return faqs if faqs else None


def build_main_schema(article, article_type):
    """Build the main article schema."""
    schema_type_map = {
        'article': 'BlogPosting',
        'techArticle': 'TechArticle',
        'tutorial': 'TechArticle',
        'howto': 'BlogPosting',  # HowTo is separate
        'faq': 'BlogPosting',    # FAQPage is separate
        'news': 'NewsArticle',
        'review': 'Review',
    }
    
    schema = {
        '@context': 'https://schema.org',
        '@type': schema_type_map.get(article_type, 'BlogPosting'),
        'headline': article.title,
        'datePublished': article.date.isoformat(),
        'dateModified': (article.modified or article.date).isoformat(),
        'author': {
            '@type': 'Person',
            'name': article.author.name,
        },
        'wordCount': getattr(article, 'word_count', None),
        'keywords': [tag.name for tag in article.tags],
        'articleSection': article.category.name,
        'inLanguage': article.lang or 'en',
        'isAccessibleForFree': True,
    }
    
    return schema


def build_faq_schema(faqs):
    """Build FAQPage schema."""
    if not faqs:
        return None
    
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': [
            {
                '@type': 'Question',
                'name': faq['question'],
                'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq['answer']
                }
            }
            for faq in faqs
        ]
    }


def build_howto_schema(article, steps):
    """Build HowTo schema."""
    if not steps:
        return None
    
    return {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        'name': article.title,
        'description': article.summary,
        'step': [
            {
                '@type': 'HowToStep',
                'name': step.get('name', f'Step {i+1}'),
                'text': step.get('text', ''),
                'image': step.get('image'),
            }
            for i, step in enumerate(steps)
        ]
    }


def build_breadcrumb(article):
    """Build BreadcrumbList schema."""
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
            {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': article.settings.get('SITEURL', '/')
            },
            {
                '@type': 'ListItem',
                'position': 2,
                'name': article.category.name,
                'item': f"{article.settings.get('SITEURL', '')}/category/{article.category.slug}.html"
            },
            {
                '@type': 'ListItem',
                'position': 3,
                'name': article.title
            }
        ]
    }


def build_speakable(article, tldr):
    """Build speakable specification."""
    return {
        '@type': 'SpeakableSpecification',
        'cssSelector': [
            'article h1',
            '.tldr',
            '.article-summary',
            'article > p:first-of-type'
        ]
    }


def register():
    signals.article_generator_finalized.connect(
        lambda gen: [enhance_article(a) for a in gen.articles]
    )
```

---

## Template Integration

### New Partial: `partial/jsonld_enhanced.html`

```jinja
{# Enhanced JSON-LD with multiple schema types #}

{# Main Article Schema #}
{% if article.schemas and article.schemas.main %}
<script type="application/ld+json">
{{ article.schemas.main | tojson | safe }}
</script>
{% endif %}

{# FAQ Schema (if present) #}
{% if article.schemas and article.schemas.faq %}
<script type="application/ld+json">
{{ article.schemas.faq | tojson | safe }}
</script>
{% endif %}

{# HowTo Schema (if present) #}
{% if article.schemas and article.schemas.howto %}
<script type="application/ld+json">
{{ article.schemas.howto | tojson | safe }}
</script>
{% endif %}

{# Breadcrumb Schema #}
{% if article.schemas and article.schemas.breadcrumb %}
<script type="application/ld+json">
{{ article.schemas.breadcrumb | tojson | safe }}
</script>
{% endif %}
```

### New Partial: `partial/ai_meta.html`

```jinja
{# AI/LLM Optimization Meta Tags #}

{% if article.ai_meta %}
{# Summary for AI systems #}
<meta name="ai:summary" content="{{ article.ai_meta.summary | striptags | truncate(300) }}">

{# Topics/themes #}
<meta name="ai:topics" content="{{ article.ai_meta.topics | join(', ') }}">

{# Expertise level #}
<meta name="ai:expertise" content="{{ article.ai_meta.expertise }}">

{# Content stats #}
{% if article.word_count %}
<meta name="ai:word-count" content="{{ article.word_count }}">
<meta name="ai:reading-time" content="{{ article.reading_time }} min">
{% endif %}

{# Key takeaways as structured data #}
{% if article.ai_meta.key_takeaways %}
<meta name="ai:key-points" content="{{ article.ai_meta.key_takeaways | join(' | ') }}">
{% endif %}
{% endif %}

{# AI Crawler permissions #}
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

### New Partial: `partial/syndication.html`

```jinja
{# Display syndication links #}

{% if article.syndication %}
<div class="syndication-links">
    <p><strong>Also published on:</strong></p>
    <ul>
    {% for link in article.syndication %}
        <li>
            <a href="{{ link.url }}" rel="syndication" target="_blank">
                {{ link.platform | capitalize }}
            </a>
            {% if link.date %}
            <span class="syndication-date">({{ link.date }})</span>
            {% endif %}
        </li>
    {% endfor %}
    </ul>
</div>
{% endif %}
```

### Update `article.html`

Add to the `{% block meta %}` section:

```jinja
{% block meta %}
    {# ... existing meta tags ... #}
    
    {# Enhanced AI meta tags #}
    {% include "partial/ai_meta.html" %}
{% endblock %}

{% block content %}
    {# ... existing content ... #}
    
    {# Add syndication links before comments #}
    {% include "partial/syndication.html" %}
    
    {# ... rest of content ... #}
{% endblock %}
```

---

## Complete Example

### Full Article with Extended Frontmatter

```yaml
---
Title: How to Build a RAG Pipeline with LangChain
Date: 2024-01-15
Modified: 2024-01-20
Category: Generative AI
Status: published
Slug: build-rag-pipeline-langchain

# === Standard Fields ===
Tags:
  - langchain
  - rag
  - llm
  - python
  - vector-database
Summary: Learn to build a production-ready RAG pipeline using LangChain and ChromaDB.
Image: /images/head/rag-pipeline.jpg

# === SEO/LEO Enhanced Fields ===
Article-Type: howto
Expertise-Level: intermediate

AI-Summary: >
  This tutorial shows how to build a Retrieval-Augmented Generation (RAG) 
  pipeline using LangChain in Python. You'll learn document loading, 
  embedding creation, vector storage with ChromaDB, and query handling 
  for accurate, sourced responses.

Key-Takeaways:
  - RAG combines retrieval with generation for accurate, sourced responses
  - LangChain simplifies the pipeline with pre-built components
  - Vector databases like ChromaDB store embeddings efficiently
  - Chunking strategy significantly impacts retrieval quality
  - Start simple and iterate based on evaluation metrics

Topics:
  - retrieval-augmented-generation
  - langchain
  - vector-databases
  - embeddings
  - natural-language-processing

Meta-Description: >
  Step-by-step guide to building a RAG pipeline with LangChain and ChromaDB. 
  Includes complete code examples for document loading, embeddings, and querying.

HowTo-Steps:
  - name: Install dependencies
    text: pip install langchain chromadb openai tiktoken
  - name: Load and chunk documents
    text: Use DirectoryLoader and RecursiveCharacterTextSplitter
  - name: Create embeddings
    text: Initialize OpenAIEmbeddings for vector representation
  - name: Store in vector database
    text: Use Chroma.from_documents() to create searchable index
  - name: Build retrieval chain
    text: Create RetrievalQA chain combining retriever and LLM
  - name: Query and evaluate
    text: Test with sample questions and measure relevance

FAQ:
  - question: What is RAG?
    answer: >
      RAG (Retrieval-Augmented Generation) combines document retrieval with 
      LLM generation to provide accurate, sourced answers. Instead of relying 
      solely on the LLM's training data, RAG fetches relevant documents first.
  - question: Do I need a GPU?
    answer: >
      No, you can use OpenAI's API for embeddings and generation, which runs 
      on their servers. Local models like Llama may benefit from GPU acceleration.
  - question: How much does it cost?
    answer: >
      Using OpenAI's API, expect roughly $0.0001 per 1K tokens for embeddings 
      and $0.002 per 1K tokens for GPT-3.5-turbo generation.

Sources:
  - title: LangChain Documentation
    url: https://docs.langchain.com/
  - title: RAG Paper (Lewis et al.)
    url: https://arxiv.org/abs/2005.11401
    author: Patrick Lewis et al.
    date: 2020-05-22
  - title: ChromaDB Documentation
    url: https://docs.trychroma.com/

Syndicated-To:
  - platform: dev.to
    url: https://dev.to/ksafjan/build-rag-pipeline-langchain
    date: 2024-01-18
  - platform: hashnode
    url: https://ksafjan.hashnode.dev/rag-pipeline-langchain
    date: 2024-01-19
---

## TL;DR

<!-- tldr-start -->
Build a RAG pipeline in 6 steps: install dependencies, load and chunk documents, 
create embeddings, store in ChromaDB, build a retrieval chain, and query. 
LangChain handles the complexity, letting you focus on your use case. Start 
with OpenAI for quick prototyping, then optimize for production.
<!-- tldr-end -->

## Introduction

Retrieval-Augmented Generation (RAG) has become the go-to architecture for 
building LLM applications that need accurate, up-to-date information...

<!-- Rest of article content -->

## Frequently Asked Questions

<!-- faq-start -->
### What chunk size should I use?

Start with 500-1000 characters with 100-200 character overlap. Smaller chunks 
give more precise retrieval but may lose context. Experiment based on your 
document types.

### Can I use local models instead of OpenAI?

Yes! LangChain supports many embedding models (HuggingFace, Cohere) and LLMs 
(Llama, Mistral). Replace the OpenAI classes with your preferred alternatives.
<!-- faq-end -->
```

### Generated Schema Output

The plugin generates these JSON-LD blocks:

#### BlogPosting Schema
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "How to Build a RAG Pipeline with LangChain",
  "datePublished": "2024-01-15T00:00:00",
  "dateModified": "2024-01-20T00:00:00",
  "author": {
    "@type": "Person",
    "name": "Krystian Safjan"
  },
  "wordCount": 2450,
  "keywords": ["langchain", "rag", "llm", "python", "vector-database"],
  "articleSection": "Generative AI",
  "inLanguage": "en",
  "isAccessibleForFree": true
}
```

#### HowTo Schema
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Build a RAG Pipeline with LangChain",
  "description": "Learn to build a production-ready RAG pipeline using LangChain and ChromaDB.",
  "step": [
    {"@type": "HowToStep", "name": "Install dependencies", "text": "pip install langchain chromadb openai tiktoken"},
    {"@type": "HowToStep", "name": "Load and chunk documents", "text": "Use DirectoryLoader and RecursiveCharacterTextSplitter"},
    {"@type": "HowToStep", "name": "Create embeddings", "text": "Initialize OpenAIEmbeddings for vector representation"},
    {"@type": "HowToStep", "name": "Store in vector database", "text": "Use Chroma.from_documents() to create searchable index"},
    {"@type": "HowToStep", "name": "Build retrieval chain", "text": "Create RetrievalQA chain combining retriever and LLM"},
    {"@type": "HowToStep", "name": "Query and evaluate", "text": "Test with sample questions and measure relevance"}
  ]
}
```

#### FAQPage Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is RAG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "RAG (Retrieval-Augmented Generation) combines document retrieval with LLM generation..."
      }
    },
    {
      "@type": "Question", 
      "name": "Do I need a GPU?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, you can use OpenAI's API for embeddings and generation..."
      }
    }
  ]
}
```

---

## Implementation Priority

| Priority | Component | Description | Effort |
|----------|-----------|-------------|--------|
| 1 | Extended frontmatter parsing | Support new YAML fields in yaml_metadata plugin | Low |
| 2 | Enhanced BlogPosting schema | Add wordCount, keywords, articleSection | Low |
| 3 | BreadcrumbList schema | Add navigation breadcrumbs | Low |
| 4 | AI meta tags partial | New `ai_meta.html` template | Low |
| 5 | Content marker extraction | Parse `<!-- tldr-start -->` etc. | Medium |
| 6 | FAQ schema generator | Build FAQPage from frontmatter/content | Medium |
| 7 | HowTo schema generator | Build HowTo from frontmatter/content | Medium |
| 8 | Speakable schema | Mark content for voice search | Low |
| 9 | Syndication tracking | Display cross-post links | Low |
| 10 | Obsidian template | Template with all new fields | Low |

---

## Testing Schema Markup

Use these tools to validate generated schema:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **JSON-LD Playground**: https://json-ld.org/playground/

---

## Resources

- [Schema.org Documentation](https://schema.org/)
- [Google Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data)
- [FAQ Schema Reference](https://schema.org/FAQPage)
- [HowTo Schema Reference](https://schema.org/HowTo)
- [Speakable Schema Reference](https://schema.org/speakable)
- [LLM Engine Optimization Guide](https://viamrkting.com/a-comprehensive-guide-to-llm-optimization-preparing-your-website-for-ai)
