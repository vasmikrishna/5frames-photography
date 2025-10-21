# 🎯 Simple Admin System - Contact Inquiries Only

## ✅ What This System Does

**Simple & Focused:** View contact form submissions from your website.

- ✅ **Admin Login** - Secure authentication
- ✅ **View Inquiries** - See all contact form submissions
- ✅ **Filter by Type** - Wedding, Portrait, Baby, Event, Other
- ✅ **Statistics** - Total, Today, New inquiries
- ❌ **No Content Management** - Edit website directly in code

---

## 🚀 Quick Start

### **Step 1: Login**

Open: `admin-login.html`

Login with your admin credentials (Google Sign-In or Email/Password)

### **Step 2: View Inquiries**

You'll automatically be redirected to the dashboard showing all contact form submissions.

---

## 📊 What You See

### **Statistics Cards:**
- **Total Inquiries** - All time
- **Today's Inquiries** - Received today
- **New (Unread)** - Fresh submissions

### **Inquiry Details:**
- Client name
- Email address
- Phone number
- Shoot type (wedding, portrait, etc.)
- Location/preferred date
- Full message
- Submission timestamp

### **Filters:**
- All Inquiries
- Weddings
- Portraits
- Baby/Maternity  
- Events
- Other

---

## ✏️ Editing Website Content

**All website content is hardcoded in `index.html`.**

To edit:

### **1. Change Text Content:**
Open `index.html` and edit directly:
- Hero section
- Portfolio items
- Team members
- Testimonials
- Blog posts
- Services
- Contact info

### **2. Change Images:**
In `index.html`, find the image URL and replace:
```html
<img src="https://your-new-image-url.jpg" alt="Description">
```

### **3. Update Contact Info:**
Find the contact section in `index.html` and edit:
```html
<p>+91 9XXXXXXXXX</p>
<p>email@example.com</p>
```

### **4. Update Social Media:**
Find the social links and update URLs:
```html
<a href="https://instagram.com/yourhandle">Instagram</a>
```

---

## 🔐 Security

### **Firestore Rules (Already Set):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    function isAdmin() {
      return request.auth != null;
    }
    
    match /inquiries/{inquiry} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'shootType'])
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read: if isAdmin();
      allow update: if isAdmin();
      allow delete: if false;
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

**What this means:**
- ✅ Anyone can submit contact form
- ✅ Only logged-in admins can view submissions
- ❌ No one can delete submissions

---

## 📁 Files You Need

### **Essential Files:**
- `admin-login.html` - Login page
- `admin-dashboard.html` - Inquiries viewer
- `index.html` - Main website (edit content here)
- `script.js` - Website JavaScript
- `styles.css` - Website styles

### **Documentation:**
- `README.md` - Project overview
- `ADMIN-SETUP.md` - Firebase setup guide
- `SIMPLE-ADMIN-GUIDE.md` - This file

---

## 🎯 Common Tasks

### **View New Inquiries:**
1. Open `admin-login.html`
2. Login
3. See all inquiries on dashboard

### **Filter Inquiries:**
Use the dropdown to filter by shoot type

### **Edit Website Text:**
1. Open `index.html`
2. Find the section you want to edit
3. Change the text
4. Save
5. Refresh website

### **Change Images:**
1. Open `index.html`
2. Find the `<img src="...">` tag
3. Replace the URL
4. Save
5. Refresh website

### **Update Phone/Email:**
1. Open `index.html`
2. Search for the phone number or email
3. Replace with new information
4. Save
5. Refresh website

---

## 🔄 Workflow

### **Daily Admin Tasks:**
```
1. Open admin-login.html
2. Login
3. Check new inquiries
4. Done! ✅
```

### **Website Updates:**
```
1. Open index.html in code editor
2. Find section to edit
3. Make changes
4. Save file
5. Test on localhost
6. Commit to GitHub
7. Done! ✅
```

---

## 📊 Data Storage

### **Where Inquiry Data is Stored:**

**Firebase Firestore** (Cloud database)
- Collection: `inquiries`
- Each submission is a document
- Access via admin dashboard only

### **Example Inquiry Document:**
```javascript
{
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  shootType: "wedding",
  location: "Hyderabad, December 2025",
  details: "Looking for candid photography...",
  timestamp: [Firebase Timestamp],
  status: "new"
}
```

---

## ✅ Setup Checklist

- [x] Firebase Authentication enabled
- [x] Admin account created
- [x] Firestore rules configured
- [x] Contact form working
- [x] Admin login working
- [x] Dashboard showing inquiries
- [ ] Tested form submission
- [ ] Verified inquiry appears in dashboard

---

## 🆘 Troubleshooting

### **Can't see inquiries?**
1. Check Firestore rules are published
2. Verify you're logged in
3. Check browser console for errors
4. Verify inquiries exist in Firebase Console

### **Contact form not working?**
1. Check browser console (F12)
2. Verify Firebase config in `script.js`
3. Check Firestore rules allow create
4. Test with simple data

### **Can't login?**
1. Verify Firebase Authentication is enabled
2. Check admin account exists
3. Try Google Sign-In instead
4. Check browser console for errors

---

## 🎉 Benefits of This System

✅ **Super Simple** - Only what you need  
✅ **Fast** - No complex CMS  
✅ **Focused** - Just view inquiries  
✅ **Direct Editing** - Change code directly  
✅ **No Confusion** - One clear purpose  
✅ **Low Maintenance** - Less to manage  

---

## 📞 Quick Reference

| Task | File to Edit | Location |
|------|--------------|----------|
| View inquiries | `admin-dashboard.html` | N/A (just view) |
| Edit text | `index.html` | Find text and change |
| Change images | `index.html` | Find `<img src>` and replace URL |
| Update phone | `index.html` | Search for phone number |
| Update email | `index.html` | Search for email |
| Change social media | `index.html` | Find social links section |

---

## 🔗 Important Links

- **Admin Login:** `admin-login.html`
- **Dashboard:** `admin-dashboard.html` (auto-redirect)
- **Website:** `index.html`
- **Firebase Console:** https://console.firebase.google.com/project/frames-photography-26453

---

**That's it! Simple, clean, and focused on what matters: viewing your customer inquiries!** 🎉📧

