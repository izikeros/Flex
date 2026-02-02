# Flex Theme for Pelican

A responsive, minimalist Pelican theme with comprehensive SEO/LEO support, dark mode, and modern features. This is a heavily modified fork of [alexandrevicenzi/Flex](https://github.com/alexandrevicenzi/Flex).

## Project Structure

```
Flex/
├── static/
│   ├── stylesheet/style.css    # Main CSS (CSS custom properties, no preprocessor)
│   └── pygments/               # Syntax highlighting themes
├── templates/
│   ├── base.html               # Base template (head, scripts, layout)
│   ├── article.html            # Article page template
│   ├── index.html              # Home page with pagination
│   └── partial/                # Reusable template fragments
│       ├── article_*.html      # Article components (header, footer, schema)
│       ├── seo_*.html          # SEO/meta tag partials
│       └── *.html              # Other partials (sidebar, analytics, etc.)
├── translations/               # i18n files
└── docs/                       # Additional documentation
```

## Build & Test

This is a Jinja2 template theme - no build step required. To test:

```bash
# From the blog repository that uses this theme:
cd /path/to/blog
source .venv/bin/activate
pelican content -o docs -s pelicanconf.py   # Build site
pelican -lr                                  # Live reload server on port 8000
make html                                    # Alternative: use Makefile
```

## Conventions & Patterns

### CSS
- Pure CSS with CSS Custom Properties (variables) - no Sass/Less
- Variables defined in `:root` for light mode, overridden in `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`
- Mobile-first responsive design
- Class naming: lowercase with hyphens (e.g., `.article-header`, `.nav-menu`)

### Templates (Jinja2)
- Use `partial/` directory for reusable fragments
- Partial naming: `{context}_{purpose}.html` (e.g., `article_header.html`, `seo_schema.html`)
- Always provide fallbacks for optional variables: `{{ VAR|default('fallback') }}`
- Escape user content in meta tags: `{{ value|e }}`
- Check variable existence before use: `{% if VARIABLE %}`

### Configuration Variables
- All caps with underscores: `SITE_NAME`, `PYGMENTS_STYLE`
- Boolean flags: `ENABLE_*` or `SHOW_*` pattern
- Document in README.md Configuration Reference table

## Key Features to Preserve

1. **Dark mode**: System preference detection + manual toggle via `data-theme` attribute
2. **SEO/LEO**: Schema.org (BlogPosting, FAQPage, HowTo), Open Graph, Twitter Cards, AI meta tags
3. **Pagefind search**: Static search integration with `basePath` configuration
4. **Plugin compatibility**: Works with seo_leo_enhancer, exclude_category, feed_utm, obsidian

## Common Tasks

### Adding a new configuration variable
1. Add to template with fallback: `{% if NEW_VAR %}...{% endif %}`
2. Document in README.md Configuration Reference
3. Add example to pelicanconf.py comments if applicable

### Adding a new partial
1. Create `templates/partial/{name}.html`
2. Include in parent template: `{% include 'partial/{name}.html' %}`
3. Pass required context or use global variables

### Modifying CSS
1. Edit `static/stylesheet/style.css` directly
2. Use existing CSS custom properties where possible
3. Add new variables to `:root` if needed for theming
4. Test both light and dark modes

## Gotchas

- **Pagefind paths**: Use `basePath: "{{ SITEURL }}/pagefind/"` for correct search index location
- **Schema.org escaping**: Always escape content in JSON-LD: `{{ value|e|replace('"', '\\"') }}`
- **Dark mode CSS**: Both `@media (prefers-color-scheme: dark)` AND `[data-theme="dark"]` selectors needed
- **Feed URLs**: Must work with both www and non-www domains
- **Notebook articles**: Use `IPYNB_SKIP_CSS = True` in pelicanconf.py for unified syntax highlighting

## External Dependencies

- **Pagefind**: Static search (loaded from CDN or local build)
- **Font Awesome**: Icons (loaded from CDN)
- **MathJax**: Math rendering (optional, loaded when needed)
- **Google Fonts**: Source Sans Pro, Source Code Pro (optional)

## Related Documentation

- [README.md](README.md) - Full configuration reference
- [docs/](docs/) - Additional feature documentation
- [Pelican docs](https://docs.getpelican.com/) - Pelican static site generator
