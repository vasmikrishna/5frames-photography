# 📝 JSON-Based Content Management Guide

## 🎯 **Simple System Overview**

Your website now uses a **single JSON file** for all content management:

- ✅ **All data** in one place: `website-content.json`
- ✅ **Images** in `images/` folder
- ✅ **Easy editing** via `content-editor.html`
- ✅ **No database** required for content
- ✅ **Fast updates** - just edit and save!

---

## 🚀 **Quick Start**

### **Step 1: Access Content Editor**

Open: `http://localhost:5502/5frames-photography/content-editor.html`

Login with your admin credentials

### **Step 2: Edit Content**

The JSON editor shows all your website content:
- Site info (contact, social media)
- Portfolio items
- Team members
- Testimonials  
- Blog posts
- Services

### **Step 3: Save Changes**

1. Click **"Save Changes"** button
2. Download the updated `website-content.json`
3. Replace the old file with the new one
4. Refresh your website!

---

## 📁 **File Structure**

```
5frames-photography/
├── website-content.json    ← All website data
├── content-editor.html     ← Admin JSON editor
├── images/                 ← Your image files
│   ├── portfolio/
│   ├── team/
│   ├── blogs/
│   └── testimonials/
└── index.html              ← Main website
```

---

## 📝 **How to Edit Each Section**

### **1. Contact Information**

Location in JSON: `siteInfo.contact`

```json
"contact": {
  "primaryPhone": "+91 9876543210",
  "secondaryPhone": "+91 9123456789",
  "email": "hello@5framesphotography.com",
  "bookingsEmail": "bookings@5framesphotography.com",
  "address": "Hyderabad, Telangana, India"
}
```

**To Edit:**
1. Find the `"contact"` section
2. Update phone numbers and emails
3. Save

### **2. Social Media Links**

Location in JSON: `siteInfo.socialMedia`

```json
"socialMedia": {
  "instagram": "https://www.instagram.com/your_handle",
  "facebook": "https://www.facebook.com/your_page",
  "youtube": "https://www.youtube.com/@your_channel"
}
```

### **3. Add Portfolio Item**

Location in JSON: `portfolio`

```json
{
  "id": "port10",
  "title": "Beautiful Beach Wedding",
  "category": "weddings",
  "image": "images/portfolio/beach-wedding.jpg",
  "description": "Sunset beach wedding ceremony"
}
```

**To Add New Portfolio Item:**
1. Go to the `"portfolio"` array
2. Copy an existing item
3. Paste it before the closing `]`
4. Add a comma `,` after the previous item
5. Update the details
6. Save

### **4. Add Team Member**

Location in JSON: `team`

```json
{
  "id": "team5",
  "name": "Your Name",
  "role": "Photographer",
  "bio": "Your bio here",
  "image": "images/team/your-photo.jpg"
}
```

### **5. Add Testimonial**

Location in JSON: `testimonials`

```json
{
  "id": "test5",
  "name": "Client Name",
  "role": "Bride, Location",
  "text": "Amazing photography service!",
  "rating": 5
}
```

### **6. Add Blog Post**

Location in JSON: `blogs`

```json
{
  "id": "blog6",
  "title": "Your Blog Title",
  "description": "Short description",
  "image": "images/blogs/blog-image.jpg",
  "date": "2025-10-21",
  "content": "Full blog content here..."
}
```

### **7. Update Services**

Location in JSON: `services`

```json
{
  "id": "service5",
  "title": "Pre-Wedding Shoots",
  "icon": "fas fa-camera",
  "description": "Romantic pre-wedding photography sessions"
}
```

---

## 🖼️ **Managing Images**

### **Option 1: Local Images (Recommended)**

**Step 1:** Upload image to appropriate folder
```
images/portfolio/my-image.jpg
```

**Step 2:** Reference in JSON
```json
"image": "images/portfolio/my-image.jpg"
```

### **Option 2: External URLs**

Use image hosting services:

```json
"image": "https://images.unsplash.com/photo-123456..."
```

**Free Image Sources:**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com  
- Pixabay: https://pixabay.com

---

## ✏️ **Content Editor Features**

### **Quick Jump**
Click the buttons to jump to specific sections:
- Portfolio
- Team  
- Testimonials
- Blogs
- Services
- Contact

### **Format JSON**
Click **"Format JSON"** to auto-indent and beautify the JSON

### **Validate JSON**
Click **"Validate JSON"** to check for errors before saving

### **Reset Changes**
Click **"Reset to Last Saved"** to undo all changes

---

## 🎯 **Common Tasks**

### **Change Phone Number**

1. Open `content-editor.html`
2. Find: `"primaryPhone"`
3. Change to: `"+91 YOUR_NUMBER"`
4. Save and download
5. Replace `website-content.json`

### **Add New Portfolio Image**

1. Upload image to `images/portfolio/`
2. Open `content-editor.html`
3. Find `"portfolio"` array
4. Add new item (see example above)
5. Save and download
6. Replace `website-content.json`

### **Update Social Media**

1. Open `content-editor.html`
2. Find: `"socialMedia"`
3. Update URLs
4. Save and download
5. Replace `website-content.json`

### **Add Team Member**

1. Upload photo to `images/team/`
2. Open `content-editor.html`
3. Find `"team"` array
4. Add new member (see example above)
5. Save and download
6. Replace `website-content.json`

---

## ⚠️ **Important Tips**

### **JSON Syntax Rules**

✅ **DO:**
- Use double quotes `"` for strings
- Add commas `,` between items in arrays
- Keep proper brackets: `{` `}` `[` `]`
- Use **"Validate JSON"** before saving

❌ **DON'T:**
- Don't use single quotes `'`
- Don't add comma after last item in array
- Don't forget closing brackets
- Don't break the JSON structure

### **Image Best Practices**

- ✅ Compress images before uploading (under 500KB)
- ✅ Use descriptive names: `beach-wedding-sunset.jpg`
- ✅ Use lowercase and hyphens
- ❌ Avoid spaces in filenames
- ❌ Don't use special characters

---

## 🔄 **Workflow**

### **Daily Workflow:**

```
1. Open content-editor.html
2. Login with admin credentials
3. Edit the JSON
4. Click "Validate JSON"
5. Click "Save Changes"
6. Download file
7. Replace website-content.json
8. Done! ✅
```

### **Adding Images:**

```
1. Prepare your image (compress if needed)
2. Upload to images/ folder
3. Copy the path
4. Open content-editor.html
5. Add the image path in JSON
6. Save changes
7. Done! ✅
```

---

## 📊 **JSON Structure Overview**

```json
{
  "siteInfo": {              // Basic site information
    "contact": {},           // Phone, email, address
    "socialMedia": {}        // Social media links
  },
  "hero": {},                // Homepage hero section
  "portfolio": [],           // Portfolio items array
  "team": [],                // Team members array
  "testimonials": [],        // Client testimonials array
  "blogs": [],               // Blog posts array
  "services": [],            // Services offered array
  "about": {},               // About section
  "coverageAreas": {}        // Service locations
}
```

---

## 🆘 **Troubleshooting**

### **"Invalid JSON" Error**

**Problem:** Syntax error in JSON

**Solution:**
1. Click "Reset to Last Saved"
2. Or use online JSON validator
3. Check for:
   - Missing commas
   - Missing quotes
   - Extra commas
   - Unclosed brackets

### **Image Not Showing**

**Problem:** Wrong image path

**Solution:**
1. Check file name matches exactly
2. Check folder path is correct
3. Check file actually exists in folder
4. Use browser console (F12) to see error

### **Changes Not Reflecting**

**Problem:** Old JSON file still in use

**Solution:**
1. Make sure you replaced `website-content.json`
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache

---

## ✅ **Checklist**

- [ ] Can access content-editor.html
- [ ] Can login with admin credentials
- [ ] Can edit JSON content
- [ ] Can validate JSON (no errors)
- [ ] Can save and download file
- [ ] Can replace website-content.json
- [ ] Changes reflect on website
- [ ] Images load correctly

---

## 🎉 **Benefits of This System**

✅ **Simple** - Just edit one JSON file  
✅ **Fast** - No database queries  
✅ **Portable** - Easy to backup  
✅ **Version Control** - Git-friendly  
✅ **No Billing** - No external services  
✅ **Direct Control** - You own all the data  

---

## 📞 **Quick Reference**

| Task | Location in JSON | Action |
|------|-----------------|--------|
| Update phone | `siteInfo.contact.primaryPhone` | Edit value |
| Update email | `siteInfo.contact.email` | Edit value |
| Add portfolio | `portfolio` array | Add new object |
| Add team member | `team` array | Add new object |
| Add testimonial | `testimonials` array | Add new object |
| Update social media | `siteInfo.socialMedia` | Edit URLs |

---

**That's it! Simple, fast, and under your complete control!** 🚀📸

