# Article Writing Guide for SEO/LEO Optimization

This guide explains how to write articles that are optimized for both traditional search engines (SEO) and AI/LLM systems (LEO - LLM Engine Optimization).

## Table of Contents

1. [Quick Start](#quick-start)
2. [YAML Frontmatter Reference](#yaml-frontmatter-reference)
3. [Content Markers](#content-markers)
4. [Article Types](#article-types)
5. [Best Practices](#best-practices)
6. [Examples](#examples)
7. [Validation](#validation)

---

## Quick Start

### Minimum Required Frontmatter

```yaml
---
Title: Your Article Title
Date: 2024-01-15
Category: Machine Learning
Status: published
Tags:
  - python
  - ml
Summary: >
  A brief 1-2 sentence summary that appears in listings and social shares.
---
```

### Recommended for SEO/LEO

Add these fields for better search engine and AI visibility:

```yaml
---
Title: Your Article Title
Date: 2024-01-15
Category: Machine Learning
Status: published
Tags:
  - python
  - ml
Summary: >
  A brief 1-2 sentence summary.
Image: /images/head/your-image.jpg

# SEO/LEO Enhancement
Article-Type: article
Expertise-Level: intermediate
AI-Summary: >
  Two sentences optimized for AI citation. This is what ChatGPT 
  or Perplexity might quote when referencing your article.
Key-Takeaways:
  - First key insight readers should remember
  - Second actionable point
  - Third important concept
---
```

---

## YAML Frontmatter Reference

### Standard Fields

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `Title` | Yes | Article title (max 60 chars for SEO) | `How to Build a RAG Pipeline` |
| `Date` | Yes | Publication date | `2024-01-15` |
| `Modified` | No | Last modification date | `2024-01-20` |
| `Category` | Yes | Single category | `Machine Learning` |
| `Status` | Yes | `published`, `draft`, or `hidden` | `published` |
| `Tags` | Recommended | List of tags | `- python`<br>`- ml` |
| `Slug` | No | URL slug (auto-generated if omitted) | `build-rag-pipeline` |
| `Summary` | Recommended | Brief description (155 chars for Google) | `Learn to build...` |
| `Image` | Recommended | Header/social image path | `/images/head/rag.jpg` |

### SEO/LEO Fields

| Field | Purpose | Values | When to Use |
|-------|---------|--------|-------------|
| `Article-Type` | Schema selection | `article`, `howto`, `faq`, `tutorial` | Always for specialized content |
| `Expertise-Level` | AI context | `beginner`, `intermediate`, `advanced`, `expert` | Always recommended |
| `AI-Summary` | LLM citation | 2-sentence summary | When you want control over AI quotes |
| `Key-Takeaways` | Structured insights | List of 3-5 points | For educational content |
| `Topics` | Semantic topics | List of topic slugs | When tags aren't specific enough |
| `Meta-Description` | Custom SEO description | Max 155 chars | When Summary is too long |
| `Canonical-URL` | Original source | Full URL | When republishing content |
| `No-Index` | Hide from search | `true` or `false` | For private/test pages |

### Structured Data Fields

#### FAQ (for Q&A content)

```yaml
FAQ:
  - question: What is machine learning?
    answer: >
      Machine learning is a subset of AI that enables systems 
      to learn from data without explicit programming.
  - question: How long does it take to learn?
    answer: >
      With dedicated study, expect 3-6 months for basics.
```

#### HowTo Steps (for tutorials)

```yaml
Article-Type: howto
HowTo-Steps:
  - name: Install dependencies
    text: Run pip install numpy pandas scikit-learn
  - name: Load your data
    text: Use pandas.read_csv() to import your dataset
  - name: Train the model
    text: Call model.fit(X_train, y_train) to train
```

#### Syndication (for cross-posted content)

```yaml
Syndicated-To:
  - platform: dev.to
    url: https://dev.to/username/article-slug
    date: 2024-01-16
  - platform: medium
    url: https://medium.com/@username/article-slug
    date: 2024-01-17
```

---

## Content Markers

The `seo_leo_enhancer` plugin extracts structured content from special HTML comment markers in your article body. This is useful when you want the content visible to readers AND used for structured data.

### TL;DR Section

Marks a summary that will be:
- Used as AI summary fallback (if `AI-Summary` not set)
- Added to speakable schema for voice search
- Potentially featured in AI search results

```markdown
## TL;DR

<!-- tldr-start -->
This article explains how to build a RAG pipeline in 6 steps. 
The key insight is that chunking strategy matters more than 
model selection. Start with LangChain for rapid prototyping.
<!-- tldr-end -->

## Introduction

Now let's dive into the details...
```

**Best Practices:**
- Keep TL;DR to 2-4 sentences
- Include the main takeaway
- Make it standalone (someone should understand the article's value)

### FAQ Section

Marks Q&A content that will generate FAQPage schema:

```markdown
## Frequently Asked Questions

<!-- faq-start -->
### What is RAG?

RAG (Retrieval-Augmented Generation) combines document retrieval 
with LLM generation to provide accurate, sourced answers.

### Do I need a GPU?

No, you can use cloud APIs like OpenAI for embeddings and 
generation. Local models may benefit from GPU acceleration.

### What's the best chunk size?

Start with 500-1000 characters with 100-200 overlap. Adjust 
based on your document types and retrieval quality.
<!-- faq-end -->
```

**Rules:**
- Use `###` (H3) headers for questions
- Answer immediately follows the question
- Keep answers concise (2-4 sentences ideal for featured snippets)

### HowTo Section

Marks step-by-step instructions that will generate HowTo schema:

```markdown
## Getting Started

<!-- howto-start -->
### Step 1: Set up your environment

Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate
```

### Step 2: Install dependencies

Install the required packages:
```bash
pip install langchain chromadb openai
```

### Step 3: Configure API keys

Set your OpenAI API key as an environment variable:
```bash
export OPENAI_API_KEY="your-key-here"
```
<!-- howto-end -->
```

**Rules:**
- Use `###` (H3) headers for step names
- "Step N:" prefix is optional (plugin removes it)
- Include code examples where relevant

---

## Article Types

### Standard Article

For general blog posts, news, opinions:

```yaml
Article-Type: article  # or omit entirely
```

**Generated Schema:** BlogPosting

### Tutorial / How-To

For step-by-step guides:

```yaml
Article-Type: howto
HowTo-Steps:
  - name: First step
    text: Description...
```

**Generated Schema:** BlogPosting + HowTo

### FAQ Article

For Q&A focused content:

```yaml
Article-Type: faq
FAQ:
  - question: Question 1?
    answer: Answer 1...
```

**Generated Schema:** BlogPosting + FAQPage

### Technical Article

For deep technical content:

```yaml
Article-Type: tutorial
Expertise-Level: advanced
```

**Generated Schema:** TechArticle

---

## Best Practices

### For SEO

1. **Title**: Keep under 60 characters, include primary keyword
2. **Summary/Meta-Description**: Under 155 characters, compelling
3. **Image**: Always include a header image (1200x630px for social)
4. **Tags**: Use 5-10 relevant tags, include variations
5. **Internal Links**: Link to related articles on your site

### For LEO (AI/LLM Optimization)

1. **AI-Summary**: Write specifically for citation (factual, standalone)
2. **Key-Takeaways**: Make them quotable and actionable
3. **TL;DR**: Include one - AI systems love summaries
4. **Structure**: Use clear headings, lists, and short paragraphs
5. **Definitions**: Define key terms explicitly
6. **FAQ**: Include common questions - AI assistants cite these heavily

### Content Structure

```markdown
## TL;DR
<!-- tldr-start -->
Brief summary...
<!-- tldr-end -->

## Introduction
Set context and preview what's coming...

## Main Content
### Subheading 1
Content...

### Subheading 2
Content...

## Step-by-Step (if applicable)
<!-- howto-start -->
### Step 1: ...
<!-- howto-end -->

## FAQ (if applicable)
<!-- faq-start -->
### Question?
Answer...
<!-- faq-end -->

## Conclusion
Summarize and call to action...
```

---

## Examples

### Example 1: Standard Tech Article

```yaml
---
Title: Understanding Python Decorators
Date: 2024-01-15
Category: Python
Status: published
Tags:
  - python
  - decorators
  - functions
  - best-practices
Summary: >
  Learn how Python decorators work and when to use them. 
  Includes practical examples for caching, logging, and timing.
Image: /images/head/python-decorators.jpg

Article-Type: article
Expertise-Level: intermediate
AI-Summary: >
  Python decorators are functions that modify other functions' 
  behavior without changing their code. They're commonly used 
  for logging, caching, authentication, and timing.
Key-Takeaways:
  - Decorators wrap functions to add behavior
  - Use @functools.wraps to preserve function metadata
  - Common uses include caching, logging, and access control
---

## TL;DR

<!-- tldr-start -->
Decorators are functions that wrap other functions to extend their 
behavior. Use `@decorator` syntax above function definitions. Always 
use `@functools.wraps` to preserve the wrapped function's metadata.
<!-- tldr-end -->

## Introduction
...
```

### Example 2: Tutorial with HowTo Schema

```yaml
---
Title: How to Deploy a Flask App to AWS Lambda
Date: 2024-01-20
Category: DevOps
Status: published
Tags:
  - flask
  - aws
  - lambda
  - serverless
  - deployment
Summary: >
  Step-by-step guide to deploying Flask applications on AWS Lambda 
  using Zappa for serverless hosting.
Image: /images/head/flask-lambda.jpg

Article-Type: howto
Expertise-Level: intermediate
AI-Summary: >
  Deploy Flask apps to AWS Lambda using Zappa. This serverless 
  approach eliminates server management and scales automatically.
Key-Takeaways:
  - Zappa simplifies Flask-to-Lambda deployment
  - Configure via zappa_settings.json
  - Use environment variables for secrets
  - Monitor with CloudWatch logs

HowTo-Steps:
  - name: Install Zappa
    text: pip install zappa flask
  - name: Initialize Zappa
    text: Run zappa init and follow the prompts
  - name: Configure settings
    text: Edit zappa_settings.json with your AWS region and S3 bucket
  - name: Deploy
    text: Run zappa deploy production
  - name: Update
    text: For updates, run zappa update production
---

## TL;DR

<!-- tldr-start -->
Deploy Flask to AWS Lambda in 5 steps using Zappa: install, init, 
configure, deploy, update. Zero server management, automatic scaling, 
pay only for what you use.
<!-- tldr-end -->

...
```

### Example 3: FAQ-Heavy Article

```yaml
---
Title: Docker FAQ - Common Questions Answered
Date: 2024-01-25
Category: DevOps
Status: published
Tags:
  - docker
  - containers
  - devops
  - faq
Summary: >
  Answers to the most common Docker questions for developers 
  getting started with containerization.
Image: /images/head/docker-faq.jpg

Article-Type: faq
Expertise-Level: beginner
AI-Summary: >
  This FAQ covers Docker basics including images vs containers, 
  Dockerfile creation, volume mounting, and container networking.

FAQ:
  - question: What's the difference between an image and a container?
    answer: >
      An image is a read-only template with instructions for creating 
      a container. A container is a runnable instance of an image.
  - question: How do I persist data in Docker?
    answer: >
      Use volumes with -v flag or VOLUME in Dockerfile. Volumes 
      persist data even when containers are removed.
  - question: How do containers communicate?
    answer: >
      Containers on the same network can communicate by container 
      name. Create networks with docker network create.
---

## Introduction

New to Docker? Here are answers to the questions every developer asks...

## Frequently Asked Questions

<!-- faq-start -->
### What's the difference between Docker and a VM?

Docker containers share the host OS kernel, making them lighter and 
faster than VMs. VMs include a full guest OS, providing stronger 
isolation but more overhead.

### Should I use Docker Compose or Kubernetes?

Docker Compose is simpler and great for local development and small 
deployments. Kubernetes is for production-scale orchestration of 
many containers across multiple hosts.

### How do I reduce Docker image size?

Use multi-stage builds, Alpine base images, combine RUN commands, 
and add a .dockerignore file. Smaller images deploy faster.
<!-- faq-end -->
```

---

## Validation

### Check Your Schema

After building your site (`make html`), validate generated schema:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Enter your article URL
   - Check for BlogPosting, FAQPage, HowTo, BreadcrumbList

2. **Schema.org Validator**: https://validator.schema.org/
   - Paste your page URL or HTML
   - Verify all schema types are valid

3. **Browser DevTools**:
   - Open article in browser
   - View Page Source
   - Search for `application/ld+json`
   - Verify JSON structure

### Check AI Meta Tags

In browser DevTools console:
```javascript
document.querySelectorAll('meta[name^="ai:"]').forEach(m => 
  console.log(m.name, ':', m.content)
);
```

Expected output:
```
ai:summary : Your AI summary text...
ai:topics : tag1, tag2, tag3
ai:section : Category Name
ai:word-count : 1234
ai:reading-time : 6 min
```

---

## Quick Reference Card

```yaml
# === REQUIRED ===
Title: Max 60 chars
Date: YYYY-MM-DD
Category: Single Category
Status: published
Tags:
  - tag1
  - tag2

# === RECOMMENDED ===
Summary: Max 155 chars for Google
Image: /images/head/image.jpg
Article-Type: article | howto | faq | tutorial
Expertise-Level: beginner | intermediate | advanced | expert

# === OPTIONAL SEO/LEO ===
AI-Summary: 2 sentences for AI citation
Key-Takeaways:
  - Point 1
  - Point 2
  - Point 3
FAQ:
  - question: Q1?
    answer: A1
HowTo-Steps:
  - name: Step name
    text: Step description
Syndicated-To:
  - platform: dev.to
    url: https://...
    date: YYYY-MM-DD
```

### Content Markers

```markdown
<!-- tldr-start -->
Summary text here...
<!-- tldr-end -->

<!-- faq-start -->
### Question?
Answer...
<!-- faq-end -->

<!-- howto-start -->
### Step 1: Name
Description...
<!-- howto-end -->
```
