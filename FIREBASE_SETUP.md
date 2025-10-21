# Firebase Setup Instructions

## ⚠️ IMPORTANT SECURITY NOTE

The service account credentials you shared should **NEVER** be used in client-side code. Service account keys are meant for server-side applications only and contain full admin privileges.

For web applications, you need to use Firebase's **Web SDK configuration** which uses different credentials that are safe to expose publicly.

## How to Get Your Firebase Web Configuration

Follow these steps to get the correct configuration for your website:

### Step 1: Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **frames-photography-26453**

### Step 2: Add a Web App (if you haven't already)
1. Click on the **Settings** icon (⚙️) next to "Project Overview"
2. Select **Project settings**
3. Scroll down to "Your apps" section
4. Click on the **Web** icon (`</>`) to add a web app
5. Give it a nickname (e.g., "5 Frames Photography Website")
6. Check "Also set up Firebase Hosting" if you plan to use it
7. Click **Register app**

### Step 3: Copy Your Configuration
You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // Your actual API key
  authDomain: "frames-photography-26453.firebaseapp.com",
  projectId: "frames-photography-26453",
  storageBucket: "frames-photography-26453.appspot.com",
  messagingSenderId: "123456789...",
  appId: "1:123456789:web:..."
};
```

### Step 4: Update script.js
1. Open `script.js`
2. Find the Firebase configuration section (around line 129)
3. Replace the placeholder values with your actual values from the Firebase Console

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "frames-photography-26453.firebaseapp.com",
    projectId: "frames-photography-26453",
    storageBucket: "frames-photography-26453.appspot.com",
    messagingSenderId: "YOUR_ACTUAL_SENDER_ID",
    appId: "YOUR_ACTUAL_APP_ID"
};
```

## Setting Up Firestore Database

### Step 1: Enable Firestore
1. In Firebase Console, click on **Firestore Database** in the left menu
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **production mode**
4. Select your preferred location (choose one close to India, like `asia-south1`)
5. Click **Enable**

### Step 2: Set Up Security Rules (IMPORTANT!)

For **test mode** (development only - NOT for production):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

For **production** (recommended):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /inquiries/{inquiry} {
      // Anyone can create new inquiries
      allow create: if request.auth == null;
      // Only authenticated users can read/update/delete
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

### Step 3: The Collection Structure

Your form submissions will be saved to a collection called `inquiries` with this structure:

```
inquiries (collection)
  └── [auto-generated-id] (document)
      ├── name: "John Doe"
      ├── email: "john@example.com"
      ├── phone: "+91 9876543210"
      ├── shootType: "wedding"
      ├── location: "Hyderabad, December 2025"
      ├── details: "Looking for candid wedding photography..."
      ├── timestamp: [Firebase Timestamp]
      └── status: "new"
```

## Viewing Form Submissions

1. Go to Firebase Console
2. Click on **Firestore Database**
3. You'll see the `inquiries` collection with all submissions
4. Click on any document to view its details

## Testing the Integration

1. Update the Firebase config in `script.js` with your actual credentials
2. Open your website in a browser
3. Fill out the contact form
4. Submit the form
5. Check Firebase Console → Firestore Database → inquiries collection
6. You should see your test submission there!

## Additional Features You Can Add

### Email Notifications
You can set up Firebase Cloud Functions to send email notifications when a new inquiry is submitted:
- Use Firebase Functions with SendGrid or Nodemailer
- Trigger on new document creation in the `inquiries` collection

### Admin Dashboard
Create an admin page to view and manage inquiries:
- Use Firebase Authentication for admin login
- Create a simple dashboard to view, filter, and update inquiry status

## Security Best Practices

1. ✅ Use Firestore Security Rules to restrict access
2. ✅ Never expose service account keys in client-side code
3. ✅ Enable App Check to protect your resources from abuse
4. ✅ Set up billing alerts to monitor usage
5. ✅ Regularly review security rules and access logs

## Need Help?

If you need help with:
- Setting up Firebase Authentication for an admin panel
- Creating email notifications
- Advanced security rules
- Setting up Firebase Hosting

Just let me know!

---

## What's Already Implemented

✅ Firebase SDK included in HTML  
✅ Firestore integration in JavaScript  
✅ Form submission handler with error handling  
✅ Beautiful notification system for user feedback  
✅ Button state management (prevents double submission)  
✅ Form data validation  

## What You Need to Do

1. Get your Firebase Web configuration from Firebase Console
2. Update the config in `script.js` (lines 129-135)
3. Enable Firestore in Firebase Console
4. Set up security rules
5. Test the form submission!

