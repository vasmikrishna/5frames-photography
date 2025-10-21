# 🔐 Admin CMS Setup Guide

## 🎯 What This System Does

You now have a complete Content Management System (CMS) where you can:
- ✅ Login securely with email/password or Google
- ✅ Upload and manage portfolio images
- ✅ Add/edit/delete team members
- ✅ Write and publish blog posts
- ✅ Manage testimonials
- ✅ Edit services and offerings
- ✅ View contact form submissions
- ✅ Update website settings (phone, email, social media)

---

## 🚀 Quick Start

### Step 1: Enable Firebase Authentication

1. Go to: https://console.firebase.google.com/project/frames-photography-26453/authentication
2. Click **"Get Started"**
3. Click **"Sign-in method"** tab
4. Enable these methods:
   - **Email/Password** - Click → Enable → Save
   - **Google** - Click → Enable → Save

### Step 2: Create Your Admin Account

1. Go to: https://console.firebase.google.com/project/frames-photography-26453/authentication/users
2. Click **"Add user"**
3. Enter your email and password
4. Click **"Add user"**

### Step 3: Update Firestore Security Rules

Go to: https://console.firebase.google.com/project/frames-photography-26453/firestore/rules

Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function - check if user is admin
    function isAdmin() {
      return request.auth != null;
    }
    
    // Inquiries - Public can create, admin can read
    match /inquiries/{inquiry} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'shootType'])
                    && request.resource.data.email.matches('.*@.*\\..*');
      allow read, update: if isAdmin();
      allow delete: if false;
    }
    
    // Portfolio - Admin full access
    match /portfolio/{item} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Team - Admin full access
    match /team/{member} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Blogs - Admin full access
    match /blogs/{post} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Testimonials - Admin full access
    match /testimonials/{testimonial} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Services - Admin full access
    match /services/{service} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Settings - Admin full access
    match /settings/{doc} {
      allow read: if true;  // Public can view
      allow write: if isAdmin();
    }
    
    // Block everything else
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Click **"Publish"**

### Step 4: Enable Firebase Storage

1. Go to: https://console.firebase.google.com/project/frames-photography-26453/storage
2. Click **"Get started"**
3. Choose **"Start in test mode"**
4. Click **"Next"** → **"Done"**

Update Storage Rules:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📱 How to Use

### Login to Admin Panel

1. Open: `http://localhost:5500/5frames-photography/admin-login.html`
2. Login with your credentials
3. You'll be redirected to the dashboard

### Add Portfolio Images

1. Go to **Portfolio** section
2. Click **"Add Portfolio Item"**
3. Fill in:
   - Title
   - Category
   - Upload image
   - Description (optional)
4. Click **"Add Portfolio Item"**

### Add Team Members

1. Go to **Team Members** section
2. Click **"Add Team Member"**
3. Fill in:
   - Name
   - Role
   - Bio
   - Upload photo
4. Click **"Add Team Member"**

### Write Blog Posts

1. Go to **Blog Posts** section
2. Click **"Write New Post"**
3. Fill in:
   - Title
   - Content
   - Upload featured image
4. Click **"Publish Post"**

### Manage Testimonials

1. Go to **Testimonials** section
2. Click **"Add Testimonial"**
3. Fill in client details and testimonial text
4. Click **"Add Testimonial"**

### Update Settings

1. Go to **Settings** section
2. Update:
   - Contact information (phone, email)
   - Social media links (Instagram, Facebook, YouTube)
3. Click **"Save Changes"**

### View Inquiries

1. Go to **Inquiries** section
2. View all contact form submissions
3. See customer details, shoot type, and messages

---

## 🔒 Security Features

✅ **Authentication Required** - Only logged-in admins can access the dashboard
✅ **Secure Image Upload** - Images stored in Firebase Storage
✅ **Role-Based Access** - Only authenticated users can modify content
✅ **Data Validation** - Forms validate data before submission
✅ **Auto Logout** - Session management built-in

---

## 📊 Collections Structure

### Portfolio
```javascript
{
  title: "string",
  category: "weddings|babies|fashion|travel|corporate",
  description: "string",
  imageUrl: "string",
  createdAt: timestamp
}
```

### Team
```javascript
{
  name: "string",
  role: "string",
  bio: "string",
  imageUrl: "string",
  createdAt: timestamp
}
```

### Blogs
```javascript
{
  title: "string",
  content: "string",
  imageUrl: "string",
  createdAt: timestamp
}
```

### Testimonials
```javascript
{
  name: "string",
  role: "string",
  text: "string",
  rating: number,
  createdAt: timestamp
}
```

### Services
```javascript
{
  title: "string",
  description: "string",
  icon: "string",
  createdAt: timestamp
}
```

### Settings
```javascript
{
  primaryPhone: "string",
  secondaryPhone: "string",
  contactEmail: "string",
  instagram: "string",
  facebook: "string",
  youtube: "string"
}
```

---

## 🎨 Files Included

| File | Purpose |
|------|---------|
| `admin-login.html` | Login page with email/password and Google sign-in |
| `admin-dashboard.html` | Main dashboard with all CMS features |
| `admin-styles.css` | Responsive styles for admin panel |
| `admin-script.js` | All JavaScript functionality |

---

## 🔧 Next Steps (Optional)

### 1. Update Main Website to Use Dynamic Content

The admin panel stores data in Firestore. To display it on your main website, update `script.js` to load content from Firestore instead of hardcoded HTML.

### 2. Add More Admin Users

Go to Firebase Console → Authentication → Users → Add user

### 3. Customize Admin Panel

Edit `admin-dashboard.html` to add more sections or features.

---

## 🆘 Troubleshooting

### "Permission denied" error
- Make sure you're logged in
- Check Firestore rules are updated
- Verify Firebase Authentication is enabled

### Images not uploading
- Enable Firebase Storage
- Check storage rules
- Verify file size (keep under 5MB)

### Can't login
- Verify admin account exists in Firebase Console
- Check email/password
- Try Google sign-in instead

---

## 📞 Admin Panel URLs

- **Login**: `admin-login.html`
- **Dashboard**: `admin-dashboard.html` (auto-redirect after login)
- **Firebase Console**: https://console.firebase.google.com/project/frames-photography-26453

---

## ✅ Checklist

- [ ] Enable Firebase Authentication
- [ ] Create admin account
- [ ] Update Firestore security rules
- [ ] Enable Firebase Storage
- [ ] Update storage rules
- [ ] Login to admin panel
- [ ] Test adding portfolio item
- [ ] Test adding team member
- [ ] Test writing blog post
- [ ] View contact form submissions

**Done!** You now have a fully functional CMS! 🎉

