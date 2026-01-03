# Giscus Comments Integration Guide

[Giscus](https://giscus.app/) is a comments system powered by GitHub Discussions. It's free, open-source, and requires no database - comments are stored in your GitHub repository's Discussions.

## Prerequisites

- A **public** GitHub repository
- GitHub account for commenters (required to post comments)

## Which Repository to Use?

### Recommended: Use Your Blog Repository

If you have a repository that stores your blog code and markdown articles, **use that same repo** for Giscus comments.

**Advantages:**
- **Everything in one place** - articles, code, and discussions together
- **Context** - commenters can easily reference the article's source
- **Simpler setup** - no additional repo to manage
- **Natural fit** - GitHub Discussions is designed as a per-repo community feature

**How it works:**
- Giscus creates a Discussion thread for each article (mapped by pathname)
- Comments appear under the Discussion category you choose (e.g., "Comments" or "Blog Comments")
- Your existing repo structure is unchanged - Discussions are a separate GitHub feature
- The Discussions tab will show all comment threads, organized by article pathname

### When to Use a Separate Repository

Consider a dedicated comments repository only if:
- Your blog repo is **private** (Giscus requires a public repo)
- You want to keep code commits separate from comment notifications
- You have multiple sites/blogs sharing one comment system
- You want to avoid mixing code-related discussions with blog comments

## Step 1: Enable GitHub Discussions

1. Go to your GitHub repository
2. Click **Settings** → **General**
3. Scroll down to **Features**
4. Check **Discussions**
5. Click **Save**

## Step 2: Install Giscus App

1. Go to [https://github.com/apps/giscus](https://github.com/apps/giscus)
2. Click **Install**
3. Select your repository (or all repositories)
4. Click **Install**

## Step 3: Configure Giscus

1. Go to [https://giscus.app/](https://giscus.app/)
2. Fill in the configuration:
   - **Repository**: `username/repo-name` (e.g., `izikeros/blog`)
   - **Page ↔ Discussions Mapping**: Choose `pathname` (recommended)
   - **Discussion Category**: Select or create a category (e.g., "Comments" or "Announcements")
   - **Features**: Enable/disable reactions, emit metadata, etc.
   - **Theme**: Select `preferred_color_scheme` for automatic dark/light mode

3. Copy the generated configuration values:
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`

## Step 4: Add Giscus Partial Template

Create `templates/partial/giscus.html` in the Flex theme:

```html
{% if GISCUS_REPO %}
<div class="giscus-comments">
    <script src="https://giscus.app/client.js"
        data-repo="{{ GISCUS_REPO }}"
        data-repo-id="{{ GISCUS_REPO_ID }}"
        data-category="{{ GISCUS_CATEGORY }}"
        data-category-id="{{ GISCUS_CATEGORY_ID }}"
        data-mapping="{{ GISCUS_MAPPING|default('pathname') }}"
        data-strict="{{ GISCUS_STRICT|default('0') }}"
        data-reactions-enabled="{{ GISCUS_REACTIONS|default('1') }}"
        data-emit-metadata="{{ GISCUS_EMIT_METADATA|default('0') }}"
        data-input-position="{{ GISCUS_INPUT_POSITION|default('bottom') }}"
        data-theme="preferred_color_scheme"
        data-lang="{{ DEFAULT_LANG|default('en') }}"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
    </script>
</div>
{% endif %}
```

## Step 5: Include in Article Template

Edit `templates/article.html` and add before the closing `</article>` tag:

```html
{% include "partial/giscus.html" %}
```

## Step 6: Configure Pelican

Add these settings to your `pelicanconf.py`:

```python
# Giscus Comments
# Get these values from https://giscus.app/ after configuration
GISCUS_REPO = "username/repo-name"           # e.g., "izikeros/blog"
GISCUS_REPO_ID = "R_xxxxxxxxxx"              # From giscus.app
GISCUS_CATEGORY = "Comments"                  # Discussion category name
GISCUS_CATEGORY_ID = "DIC_xxxxxxxxxx"        # From giscus.app

# Optional settings (defaults shown)
GISCUS_MAPPING = "pathname"                   # or "url", "title", "og:title"
GISCUS_STRICT = "0"                          # "1" for strict title matching
GISCUS_REACTIONS = "1"                       # "0" to disable reactions
GISCUS_EMIT_METADATA = "0"                   # "1" to emit discussion metadata
GISCUS_INPUT_POSITION = "bottom"             # or "top"
```

## Step 7: Optional CSS Styling

Add to your custom CSS or `style.css`:

```css
/* Giscus Comments Container */
.giscus-comments {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--nav-border-color);
}

/* Giscus iframe styling */
.giscus-frame {
    width: 100%;
}
```

## Configuration Options

| Setting | Description | Default |
|---------|-------------|---------|
| `GISCUS_REPO` | GitHub repo in `owner/name` format | Required |
| `GISCUS_REPO_ID` | Repository ID from giscus.app | Required |
| `GISCUS_CATEGORY` | Discussion category name | Required |
| `GISCUS_CATEGORY_ID` | Category ID from giscus.app | Required |
| `GISCUS_MAPPING` | How to map pages to discussions | `pathname` |
| `GISCUS_STRICT` | Strict title matching | `0` |
| `GISCUS_REACTIONS` | Enable reactions | `1` |
| `GISCUS_EMIT_METADATA` | Emit discussion metadata | `0` |
| `GISCUS_INPUT_POSITION` | Comment input position | `bottom` |

## Mapping Options

- **`pathname`** (recommended): Uses the page's pathname (e.g., `/my-article/`)
- **`url`**: Uses the full URL
- **`title`**: Uses the page's `<title>`
- **`og:title`**: Uses the Open Graph title meta tag

## Dark Mode Support

The template uses `data-theme="preferred_color_scheme"` which automatically matches the user's system preference. This works seamlessly with the Flex theme's dark mode implementation.

## Troubleshooting

### Comments not showing

1. Verify the repository is **public**
2. Check that GitHub Discussions is enabled
3. Verify the Giscus app is installed on the repository
4. Check browser console for errors
5. Ensure all `GISCUS_*` settings are correctly copied from giscus.app

### Wrong discussion created

- If using `pathname` mapping, ensure your URLs are consistent
- Consider using `GISCUS_STRICT = "1"` for exact matching

### Theme mismatch

- The template uses `preferred_color_scheme` for automatic theme detection
- For manual control, you can change `data-theme` to `light`, `dark`, or a custom theme URL

## Migration from Disqus

If migrating from Disqus:

1. Export your Disqus comments (Disqus Admin → Community → Export)
2. Unfortunately, there's no direct import to GitHub Discussions
3. Consider using [disqus-to-github-discussions](https://github.com/nickytonline/disqus-to-github-discussions) tool
4. Or start fresh with Giscus

## Benefits of Giscus

- ✅ Free and open-source
- ✅ No tracking or ads
- ✅ Comments stored in your GitHub repo
- ✅ Markdown support
- ✅ Reactions support
- ✅ Automatic dark/light theme
- ✅ Lazy loading
- ✅ No database required

## Resources

- [Giscus Website](https://giscus.app/)
- [Giscus GitHub](https://github.com/giscus/giscus)
- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
