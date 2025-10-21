# 5 Frames Photography - Quick Reference Guide

## 🎨 Color Palette

```
Primary Gold: #d4af37
Dark Gold: #b8941f
Light Gold: #e8d084
Dark Blue: #2c3e50
Accent: #c9a227
Text Dark: #1a1a1a
Text Light: #f5f5f5
Background: #ffffff
Section BG: #fafafa
```

## 📐 Design Specifications

- **Max Container Width**: 1200px
- **Section Padding**: 100px vertical
- **Border Radius**: 8px (cards), 50px (buttons)
- **Transition Speed**: 0.3s ease

## 🎯 Quick Navigation Links

All sections are accessible via anchor links:
- `#home` - Hero Section
- `#about` - About Us
- `#specialties` - Services
- `#portfolio` - Portfolio Gallery
- `#testimonials` - Client Reviews
- `#team` - Team Members
- `#process` - How It Works
- `#blogs` - Blog Articles
- `#reels` - Video Content
- `#contact` - Contact Form

## 🔧 Key JavaScript Functions

### Portfolio Filtering
```javascript
// Filters portfolio items by category
// Categories: all, weddings, babies, fashion, travel, corporate
```

### Form Validation
```javascript
// Validates: name, email, phone, shoot type, location, details
// Shows success alert on submission
```

### Smooth Scroll
```javascript
// Automatically handles all anchor links
// Accounts for sticky navbar height
```

### Scroll Animations
```javascript
// IntersectionObserver for fade-in effects
// Applied to cards, portfolio items, testimonials
```

## 📱 Responsive Breakpoints

```
Desktop:      1200px+
Laptop:       992px - 1199px
Tablet:       768px - 991px
Mobile:       480px - 767px
Small Mobile: <480px
```

## 🖼️ Image Placeholders to Replace

1. **Hero Background** - Line 36 in HTML
2. **About Section Image** - Line 87
3. **Portfolio Items** - Lines 156-255
4. **Team Photos** - Lines 327-371
5. **Blog Thumbnails** - Lines 409-469
6. **Video Thumbnails** - Lines 484-522

## 🌐 Social Media Links to Update

Update these in the HTML:
- Instagram: Line 557, 604
- YouTube: Line 558, 605
- Pinterest: Line 559, 606
- LinkedIn: Line 560, 607

## 📧 Contact Information to Update

**Current Placeholders:**
- Phone: +91 9XXXXXXXXX (Line 543)
- Email: hello@5framesphotography.com (Line 549)
- Locations: Bangalore / Hyderabad / Mumbai (Line 537)

## 🎬 JavaScript Event Listeners

1. **Navigation Toggle** - Mobile menu
2. **Smooth Scroll** - All anchor links
3. **Portfolio Filter** - Category buttons
4. **Form Submit** - Contact form
5. **Scroll Animations** - Fade-in effects
6. **Active Nav Link** - Highlights current section
7. **Portfolio Click** - Opens alert (to be replaced with modal)
8. **Reel Click** - Opens alert (to be replaced with video player)

## 🚀 Launch Checklist

- [ ] Replace all image placeholders
- [ ] Update contact information
- [ ] Add social media links
- [ ] Test form submission backend
- [ ] Add real portfolio images
- [ ] Add team photos
- [ ] Add blog content
- [ ] Add video content
- [ ] Test on all devices
- [ ] SEO optimization
- [ ] Performance testing
- [ ] Analytics integration

## 💡 Customization Tips

### Change Logo
Edit lines 19-21 in index.html and update .logo styles in CSS

### Change Fonts
1. Update Google Fonts link in HTML head
2. Modify CSS variables: `--font-primary` and `--font-heading`

### Add New Section
1. Copy existing section HTML structure
2. Add navigation link in navbar
3. Style using existing CSS patterns
4. Add smooth scroll support (automatic)

### Change Colors
Modify CSS custom properties in `:root` (lines 14-24 in styles.css)

---

**Need Help?** All code is well-commented. Check the README.md for detailed documentation.


