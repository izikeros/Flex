# Flex [![Build Status](https://travis-ci.org/alexandrevicenzi/Flex.svg?branch=master)](https://travis-ci.org/alexandrevicenzi/Flex)

The minimalist [Pelican](http://blog.getpelican.com/) theme.

## My mods to the theme
- add new direct template for notes: "til" (things I learned) and related mods:
  - do not display notes on home (index) page - let the short notes do not clutter list of blog posts (loger articles)
  - do not display notes on archive page - for the same reason as above
- modified archives page with my custom groupping by year (inspied by elegant theme)
- support for new meta:
  - til_category
  - featured_image_alt
  - modified (?)
  - suggested_tags
  - ignore_tags - list - Do not add these tags to the suggested tags. When manually editing article with front matter you can review tags and move suggested tags to tags (or til_tags) and move unfortunate tags to `ignore_tags` to avoid have them suggested next time when automated tag suggention will be running.
  - citation_needed
  - til_tags
  - til_category
  - image for article featured image (not `cover` or `featured_image`)
  - changes in styling
  
Compare differences to in details: [compare this fork](https://github.com/alexandrevicenzi/Flex/compare/master...izikeros:master)
## Notes

- If you have questions open an issue
- The theme is not under huge development anymore, it's stable and has a lot of features already
- If you want a [Hugo](https://gohugo.io/) theme check out [Soho](https://github.com/alexandrevicenzi/soho)

## Features

- Mobile First
- Responsive
- Semantic
- SEO Best Practices
- Open Graph
- Rich Snippets (JSON-LD)
- Related Posts (via [plugin](https://github.com/getpelican/pelican-plugins/tree/master/related_posts) or AddThis)
- Minute read (via [plugin](https://github.com/getpelican/pelican-plugins/tree/master/post_stats))
- [Multiple Code Highlight Styles](https://github.com/alexandrevicenzi/Flex/wiki/Code-Highlight)
- [Translation Support](https://github.com/alexandrevicenzi/Flex/wiki/Translations)
- [Dark Mode](https://github.com/alexandrevicenzi/Flex/wiki/Dark-Mode)

## Integrations

- [AddThis](http://www.addthis.com/)
- [Disqus](https://disqus.com/)
- [Gauges Analytics](http://get.gaug.es/)
- [Google AdSense](https://www.google.com.br/adsense/start/)
- [Google Analytics](https://www.google.com/analytics/web/)
- [Google Tag Manager](https://www.google.com/tagmanager/)
- [Matomo Analytics (formerly Piwik)](https://matomo.org/)
- [StatusCake](https://www.statuscake.com/)
- [Isso](https://posativ.org/isso/)
- [Microsoft Clarity](https://clarity.microsoft.com)

## Plugins Support

- [Github Corners](https://github.com/tholman/github-corners)
- [I18N Sub-sites](https://github.com/getpelican/pelican-plugins/tree/master/i18n_subsites)
- [Minute read](https://github.com/getpelican/pelican-plugins/tree/master/post_stats)
- [Related Posts](https://github.com/getpelican/pelican-plugins/tree/master/related_posts)
- [Representative image](https://github.com/getpelican/pelican-plugins/tree/master/representative_image)
- [Neighbors](https://github.com/getpelican/pelican-plugins/tree/master/neighbors)
- [Tipue Search](https://github.com/getpelican/pelican-plugins/blob/master/tipue_search/)
- [SEO](https://github.com/pelican-plugins/seo)

## Install

The best way to install is over [pelican-themes](https://github.com/getpelican/pelican-themes).

The alternative way is to clone this repository. The `master` branch is stable and is safe to checkout, but I would recommend you to checkout a tag branch.

## Documentation

The documentation covers most of the settings available and how to use this theme.
If something is missing or broken you can open a PR or fix the documentation by yourself.

[Flex Wiki](https://github.com/alexandrevicenzi/Flex/wiki)

## Live example

You can see how this theme looks like at [http://flex.alxd.me/](http://flex.alxd.me/).

The code is available in this project under `docs` folder.

## Contributing

**ALWAYS** open an issue before sending a PR.
Discuss the problem/feature that you want to code.
After discussing, send a PR with your changes.

As always, if you want something that only makes sense to you, fork Flex and create a new theme.

## Translations

Translate this theme to new languages at [Transifex](https://www.transifex.com/alexandrevicenzi/flex-pelican/).

Read more about [Translation Support](https://github.com/alexandrevicenzi/Flex/wiki/Translations) in the Wiki.

## License

MIT