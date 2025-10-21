# 🌆 5 Frames Photography - Landing Page

A beautiful, modern, and fully responsive landing page for **5 Frames Photography** — a creative photography studio specializing in weddings, baby shoots, portraits, fashion, and lifestyle photography.

## ✨ Features

- **Fully Responsive Design** — Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** — Clean, elegant design with smooth animations and transitions
- **Interactive Portfolio** — Filterable gallery with category-based sorting
- **Contact Form** — Easy-to-use inquiry form with validation
- **Smooth Scrolling** — Seamless navigation between sections
- **Sticky Navigation** — Dynamic navbar that adapts on scroll
- **Testimonials Section** — Showcase client reviews with star ratings
- **Team Showcase** — Meet the talented photographers and team members
- **Blog Preview** — Latest photography tips and inspiration
- **Video Reels Section** — Behind-the-scenes content showcase
- **Social Media Integration** — Connected to Instagram, YouTube, Pinterest, and LinkedIn

## 🚀 Quick Start

### 1. Clone or Download

Clone this repository or download the files to your local machine.

```bash
cd 5frames-photography
```

### 2. Open in Browser

Simply open the `index.html` file in your web browser:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

### 3. Development

For local development with live reload, you can use a simple HTTP server:

**Using Python 3:**
```bash
python3 -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then visit: `http://localhost:8000`

## 📁 Project Structure

```
5frames-photography/
│
├── index.html          # Main HTML file with all sections
├── styles.css          # Complete stylesheet with responsive design
├── script.js           # JavaScript for interactivity and animations
└── README.md           # Project documentation
```

## 🎨 Sections Overview

### 1. **Hero Section**
- Eye-catching headline with call-to-action buttons
- Scroll indicator animation
- Gradient overlay with fade-in animations

### 2. **About Us**
- Company introduction and story
- Mission statement
- Core values showcase

### 3. **Our Specialties**
- Wedding Photography
- Baby & Maternity Shoots
- Portrait & Fashion Photography
- Events & Lifestyle

### 4. **Portfolio**
- Interactive filterable gallery
- Categories: Weddings, Babies, Fashion, Travel, Corporate
- Hover effects with overlay information

### 5. **Testimonials**
- Client reviews with star ratings
- Grid layout showcasing different services

### 6. **Team Section**
- Meet the creative team
- Individual profiles with roles and bios

### 7. **Our Process**
- 5-step workflow visualization
- From consultation to delivery

### 8. **Blog**
- Latest articles and guides
- Photography tips and inspiration

### 9. **Video Reels**
- Behind-the-scenes content
- Showcase of creative process

### 10. **Contact Form**
- Easy inquiry submission
- Form validation
- Contact information display

### 11. **Footer**
- Quick links
- Social media connections
- Copyright information

## 🎨 Customization

### Colors

The color scheme is defined in CSS custom properties (`:root` in `styles.css`):

```css
--primary-color: #d4af37;      /* Gold */
--primary-dark: #b8941f;       /* Dark Gold */
--secondary-color: #2c3e50;    /* Dark Blue */
--text-dark: #1a1a1a;          /* Almost Black */
--text-light: #f5f5f5;         /* Off White */
```

Feel free to modify these to match your brand colors!

### Typography

The website uses two Google Fonts:
- **Playfair Display** — For headings (elegant serif)
- **Poppins** — For body text (clean sans-serif)

Change fonts in the HTML `<head>` and update the CSS variables.

### Images

Replace the placeholder elements with actual images:

1. **Hero Background**: Update `.hero-background` in CSS or add inline style
2. **Portfolio Items**: Replace `.image-placeholder` divs with `<img>` tags
3. **Team Photos**: Add team member photos
4. **Blog Thumbnails**: Add blog post images

Example:
```html
<!-- Replace this -->
<div class="image-placeholder">
    <i class="fas fa-camera"></i>
</div>

<!-- With this -->
<img src="images/your-photo.jpg" alt="Description">
```

## 📱 Responsive Breakpoints

The website is fully responsive with breakpoints at:

- **Desktop**: 1200px and above
- **Laptop**: 992px - 1199px
- **Tablet**: 768px - 991px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🛠 Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with Grid, Flexbox, and animations
- **JavaScript (Vanilla)** — No frameworks, pure JS for interactivity
- **Font Awesome 6** — Icon library
- **Google Fonts** — Typography

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## 📋 Features to Add (Future Enhancements)

- [ ] Lightbox/Modal for portfolio images
- [ ] Video player integration for reels
- [ ] Backend integration for contact form
- [ ] Blog CMS integration
- [ ] Image lazy loading
- [ ] SEO optimization with meta tags
- [ ] Performance optimization
- [ ] Analytics integration (Google Analytics)
- [ ] Cookie consent banner
- [ ] Multilingual support
- [ ] Dark mode toggle
- [ ] Booking calendar integration
- [ ] Payment gateway integration

## 🚀 Deployment

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select the main branch
4. Your site will be live at: `https://yourusername.github.io/5frames-photography`

### Deploy to Netlify

1. Create a Netlify account
2. Drag and drop the project folder
3. Your site will be live instantly!

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## 📞 Contact Information

Update the contact details in `index.html`:

- **Phone**: +91 9XXXXXXXXX
- **Email**: hello@5framesphotography.com
- **Locations**: Bangalore / Hyderabad / Mumbai

## 📄 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Developer Notes

- All JavaScript is written in vanilla JS for maximum compatibility
- CSS uses custom properties for easy theming
- No build process required — just open and run
- Code is well-commented for easy understanding
- Mobile-first responsive approach
- Accessibility considerations included

## 🎯 Credits

**Design & Development**: Created for 5 Frames Photography
**Fonts**: Google Fonts (Playfair Display, Poppins)
**Icons**: Font Awesome 6

---

**5 Frames Photography** — *Every moment deserves five perfect frames.* 📸

For questions or support, please contact: hello@5framesphotography.com


