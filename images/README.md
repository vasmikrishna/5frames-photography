# Images Folder

Place your images here for the website.

## Folder Structure

- `portfolio/` - Portfolio images
- `team/` - Team member photos
- `blogs/` - Blog post images
- `testimonials/` - Client photos (optional)

## How to Use

### Option 1: Local Images (Recommended)

1. Upload your images to the appropriate folder
2. In `website-content.json`, use relative paths:

```json
{
  "image": "images/portfolio/wedding-photo.jpg"
}
```

### Option 2: External URLs

Use full URLs from image hosting services:

```json
{
  "image": "https://images.unsplash.com/photo-12345..."
}
```

## Image Guidelines

- **Format:** JPG, PNG, WebP
- **Portfolio:** 600x400px minimum
- **Team:** 300x300px minimum (square)
- **Blogs:** 600x400px minimum
- **File size:** Under 500KB (compress before uploading)
- **Names:** Use lowercase, hyphens (e.g., `wedding-photo-1.jpg`)

## Quick Start

1. Add your images to the folders above
2. Open `content-editor.html` in admin panel
3. Update the image paths in the JSON
4. Save and download
5. Replace `website-content.json` with the downloaded file
6. Refresh your website!

---

**Note:** You can also use free stock images from:
- Unsplash (https://unsplash.com)
- Pexels (https://pexels.com)
- Pixabay (https://pixabay.com)
