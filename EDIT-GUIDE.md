# 📝 Edit Website Content - Simple Guide

## 🎯 **How It Works:**

All website content is stored in **ONE file**: `website-data.json`

To edit your website:
1. Open `website-data.json`
2. Edit the data
3. Save
4. Refresh website

---

## 📂 **What's in website-data.json:**

```json
{
  "siteInfo": {          // Site name, contact info, social media
    "contact": {},       // Phone numbers, email, address
    "social": {}         // Instagram, Facebook, YouTube, etc.
  },
  "hero": {},            // Homepage hero section
  "portfolio": [],       // Portfolio images
  "team": [],            // Team members
  "testimonials": [],    // Client reviews
  "blogs": [],           // Blog posts
  "services": [],        // Services offered
  "about": {},           // About section
  "coverageAreas": {}    // Service locations
}
```

---

## ✏️ **How to Edit Each Section:**

### **1. Contact Information**

Open `website-data.json`, find `"siteInfo"` → `"contact"`:

```json
"contact": {
  "primaryPhone": "+91 9876543210",     ← Change this
  "secondaryPhone": "+91 9123456789",   ← Change this
  "email": "hello@5framesphotography.com",  ← Change this
  "bookingsEmail": "bookings@5framesphotography.com",
  "address": "Hyderabad, Telangana, India"
}
```

### **2. Social Media Links**

Find `"siteInfo"` → `"social"`:

```json
"social": {
  "instagram": "https://www.instagram.com/yourhandle",  ← Change this
  "facebook": "https://www.facebook.com/yourpage",
  "youtube": "https://www.youtube.com/@yourchannel"
}
```

### **3. Add Portfolio Item**

Find `"portfolio"` array, add new item:

```json
"portfolio": [
  {
    "title": "Beautiful Wedding",           ← Title
    "category": "weddings",                 ← weddings/babies/fashion/travel/corporate
    "image": "https://your-image-url.jpg"   ← Image URL
  },
  ...existing items...
]
```

### **4. Add Team Member**

Find `"team"` array, add new member:

```json
"team": [
  {
    "name": "Your Name",                    ← Name
    "role": "Photographer",                 ← Role
    "bio": "Your bio here",                 ← Bio
    "image": "https://your-photo-url.jpg"   ← Photo URL
  },
  ...existing members...
]
```

### **5. Add Testimonial**

Find `"testimonials"` array, add new review:

```json
"testimonials": [
  {
    "name": "Client Name",                  ← Name
    "role": "Bride, Location",              ← Role/Location
    "text": "Amazing service!",             ← Review text
    "rating": 5                             ← Rating (1-5)
  },
  ...existing reviews...
]
```

### **6. Add Blog Post**

Find `"blogs"` array, add new post:

```json
"blogs": [
  {
    "title": "Blog Title",                  ← Title
    "description": "Short description",     ← Description
    "image": "https://blog-image-url.jpg"   ← Image URL
  },
  ...existing posts...
]
```

### **7. Edit Services**

Find `"services"` array, edit service:

```json
"services": [
  {
    "icon": "fas fa-camera",                ← Font Awesome icon
    "title": "Service Name",                ← Service title
    "description": "Service description"    ← Description
  },
  ...existing services...
]
```

---

## 🎨 **JSON Syntax Rules:**

### **✅ DO:**
- Use double quotes `"` for all strings
- Add comma `,` between array items
- Keep proper brackets: `{` `}` `[` `]`
- Save and refresh website to see changes

### **❌ DON'T:**
- Don't use single quotes `'`
- Don't add comma after last item in array
- Don't forget closing brackets
- Don't break JSON structure

---

## 🚀 **Quick Edit Workflow:**

```
1. Open website-data.json
2. Find the section to edit
3. Change the values
4. Save file
5. Refresh website (Ctrl+Shift+R)
6. Done! ✅
```

---

## 📋 **Common Edits:**

### **Change Phone Number:**
1. Open `website-data.json`
2. Find: `"primaryPhone"`
3. Change to: `"+91 YOUR_NUMBER"`
4. Save

### **Update Instagram:**
1. Open `website-data.json`
2. Find: `"instagram"`
3. Change URL
4. Save

### **Add Portfolio Image:**
1. Open `website-data.json`
2. Find: `"portfolio"` array
3. Add new object (see example above)
4. Save

### **Edit About Text:**
1. Open `website-data.json`
2. Find: `"about"` → `"lead"`
3. Change text
4. Save

---

## 🖼️ **Working with Images:**

### **Option 1: Free Stock Images (Easy)**
Use URLs from:
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

Copy image URL and paste in JSON:
```json
"image": "https://images.unsplash.com/photo-123456..."
```

### **Option 2: Your Own Images**
1. Upload to image hosting (Imgur, Cloudinary, etc.)
2. Copy the direct image URL
3. Paste in JSON

---

## 🔍 **Example: Full Edit**

**Before:**
```json
"team": [
  {
    "name": "John Doe",
    "role": "Photographer",
    "bio": "Loves photography",
    "image": "https://old-image.jpg"
  }
]
```

**After:**
```json
"team": [
  {
    "name": "Your Name",
    "role": "Lead Photographer",
    "bio": "10 years of experience in wedding photography",
    "image": "https://new-image.jpg"
  }
]
```

---

## ✅ **Validation:**

After editing, check for errors:

1. **Online JSON Validator:**
   - Go to: https://jsonlint.com
   - Paste your JSON
   - Click "Validate JSON"
   - Fix any errors

2. **Browser Console:**
   - Open website
   - Press F12
   - Check Console tab
   - Look for "✅ Website data loaded successfully"

---

## 🆘 **Troubleshooting:**

### **"Error loading website data"**
- Check JSON syntax (missing comma, bracket, quote)
- Use jsonlint.com to validate
- Look at line number in error message

### **Changes not showing**
- Did you save the file?
- Hard refresh browser (Ctrl+Shift+R)
- Check browser console for errors

### **Images not loading**
- Check URL is correct
- Make sure URL starts with http:// or https://
- Test URL in browser address bar

---

## 📊 **Data Structure Reference:**

```json
{
  "siteInfo": {
    "name": "string",
    "contact": {
      "primaryPhone": "string",
      "email": "string"
    },
    "social": {
      "instagram": "url",
      "facebook": "url"
    }
  },
  "portfolio": [
    {
      "title": "string",
      "category": "string",
      "image": "url"
    }
  ],
  "team": [
    {
      "name": "string",
      "role": "string",
      "bio": "string",
      "image": "url"
    }
  ],
  "testimonials": [
    {
      "name": "string",
      "role": "string",
      "text": "string",
      "rating": number
    }
  ]
}
```

---

## 🎉 **Benefits:**

✅ **Single File** - All data in one place  
✅ **Easy to Edit** - Just text editing  
✅ **Fast Updates** - Edit and refresh  
✅ **Version Control** - Track changes in Git  
✅ **No Database** - Simple and portable  
✅ **Backup Friendly** - One file to backup  

---

## 📞 **Quick Reference:**

| What to Change | Where in JSON | Example |
|---------------|---------------|---------|
| Phone number | `siteInfo.contact.primaryPhone` | `"+91 9876543210"` |
| Email | `siteInfo.contact.email` | `"hello@example.com"` |
| Instagram | `siteInfo.social.instagram` | `"https://instagram.com/..."` |
| Add portfolio | `portfolio` array | Add new object |
| Add team member | `team` array | Add new object |
| Add testimonial | `testimonials` array | Add new object |

---

**That's it! Simple editing in one file!** ✏️📄

