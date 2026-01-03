# Newsletter Integration

The theme supports newsletter subscription forms from various providers. The newsletter box appears at the end of each article, before related posts.

## Configuration

Add these settings to your `pelicanconf.py`:

### Basic Setup

```python
NEWSLETTER_ENABLED = True
NEWSLETTER_TITLE = "Stay Updated"  # Optional, defaults to "Stay Updated"
NEWSLETTER_DESCRIPTION = "Get notified when I publish new articles."  # Optional
```

### Provider-Specific Configuration

#### Mailchimp

```python
NEWSLETTER_PROVIDER = 'mailchimp'
NEWSLETTER_ACTION_URL = 'https://YOUR-DC.list-manage.com/subscribe/post?u=XXXX&id=XXXX'
```

#### Buttondown

```python
NEWSLETTER_PROVIDER = 'buttondown'
NEWSLETTER_USERNAME = 'your-buttondown-username'
```

#### ConvertKit

```python
NEWSLETTER_PROVIDER = 'convertkit'
NEWSLETTER_FORM_ID = '1234567'  # Your ConvertKit form ID
```

#### Substack

```python
NEWSLETTER_PROVIDER = 'substack'
NEWSLETTER_PUBLICATION = 'your-publication-name'  # e.g., 'safjan' for safjan.substack.com
```

#### Custom Provider

```python
NEWSLETTER_PROVIDER = 'custom'
NEWSLETTER_ACTION_URL = 'https://your-provider.com/subscribe'
NEWSLETTER_METHOD = 'post'  # or 'get'
NEWSLETTER_EMAIL_FIELD = 'email'  # name of the email input field
```

#### Simple Link (No Form)

If you just want a button linking to your newsletter page:

```python
NEWSLETTER_ENABLED = True
# Don't set NEWSLETTER_PROVIDER
NEWSLETTER_LINK = 'https://your-newsletter-page.com'
NEWSLETTER_CTA = 'Subscribe to Newsletter'  # Button text
```

## Customization

The newsletter box uses CSS custom properties for theming and automatically adapts to light/dark mode. You can customize the appearance by overriding these CSS classes in your custom stylesheet:

- `.newsletter-box` - Container
- `.newsletter-title` - Title
- `.newsletter-description` - Description text
- `.newsletter-form` - Form container
- `.newsletter-input` - Email input field
- `.newsletter-btn` - Submit button

## Disabling

To disable the newsletter:

```python
NEWSLETTER_ENABLED = False
```

Or simply don't set `NEWSLETTER_ENABLED` at all.
