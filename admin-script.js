// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCm0NaPSeiBYoJNOV-Woz1Iae5YEc7D0gI",
    authDomain: "frames-photography-26453.firebaseapp.com",
    projectId: "frames-photography-26453",
    storageBucket: "frames-photography-26453.firebasestorage.app",
    messagingSenderId: "24673451515",
    appId: "1:24673451515:web:fbbbf05c67b7153ca2df5e",
    measurementId: "G-3TZ6HM3SH7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

let currentUser = null;

// Check authentication
auth.onAuthStateChanged(user => {
    if (!user) {
        // Not logged in, redirect to login page
        window.location.href = 'admin-login.html';
    } else {
        currentUser = user;
        document.getElementById('userName').textContent = user.displayName || 'Admin';
        document.getElementById('userEmail').textContent = user.email;
        
        // Load dashboard data
        loadDashboardStats();
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        auth.signOut().then(() => {
            window.location.href = 'admin-login.html';
        });
    }
});

// Navigation
document.querySelectorAll('.nav-item, .quick-action-btn, .card-link').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        if (section) {
            switchSection(section);
        }
    });
});

function switchSection(sectionName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.section === sectionName) {
            nav.classList.add('active');
        }
    });
    
    // Update active section
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${sectionName}`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        portfolio: 'Portfolio Management',
        team: 'Team Members',
        blogs: 'Blog Posts',
        testimonials: 'Testimonials',
        services: 'Services',
        inquiries: 'Contact Inquiries',
        settings: 'Website Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';
    
    // Load section data
    loadSectionData(sectionName);
}

// Menu toggle for mobile
document.getElementById('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('active');
});

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        const inquiries = await db.collection('inquiries').get();
        const portfolio = await db.collection('portfolio').get();
        const blogs = await db.collection('blogs').get();
        const team = await db.collection('team').get();
        
        document.getElementById('totalInquiries').textContent = inquiries.size;
        document.getElementById('totalPortfolio').textContent = portfolio.size;
        document.getElementById('totalBlogs').textContent = blogs.size;
        document.getElementById('totalTeam').textContent = team.size;
        
        // Load recent inquiries
        loadRecentInquiries();
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Recent Inquiries
async function loadRecentInquiries() {
    try {
        const snapshot = await db.collection('inquiries')
            .orderBy('timestamp', 'desc')
            .limit(5)
            .get();
        
        const container = document.getElementById('recentInquiries');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No inquiries yet</p>';
            return;
        }
        
        container.innerHTML = '<div class="list">' + snapshot.docs.map(doc => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate().toLocaleDateString() : 'N/A';
            return `
                <div class="list-item">
                    <div>
                        <strong>${data.name}</strong><br>
                        <small style="color: #999;">${data.email} • ${data.shootType}</small>
                    </div>
                    <small style="color: #999;">${date}</small>
                </div>
            `;
        }).join('') + '</div>';
    } catch (error) {
        console.error('Error loading inquiries:', error);
        document.getElementById('recentInquiries').innerHTML = '<p class="loading">Error loading inquiries</p>';
    }
}

// Load Section Data
function loadSectionData(section) {
    switch(section) {
        case 'portfolio':
            loadPortfolio();
            break;
        case 'team':
            loadTeam();
            break;
        case 'blogs':
            loadBlogs();
            break;
        case 'testimonials':
            loadTestimonials();
            break;
        case 'services':
            loadServices();
            break;
        case 'inquiries':
            loadInquiries();
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

// Portfolio Management
async function loadPortfolio() {
    try {
        const snapshot = await db.collection('portfolio').get();
        const container = document.getElementById('portfolioList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No portfolio items yet. Click "Add Portfolio Item" to get started.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            return `
                <div class="grid-item">
                    <img src="${data.imageUrl}" alt="${data.title}" class="grid-item-image">
                    <div class="grid-item-content">
                        <h3 class="grid-item-title">${data.title}</h3>
                        <p style="color: #999;">${data.category}</p>
                        <div class="grid-item-actions">
                            <button class="btn-icon btn-edit" onclick="editPortfolio('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn-icon btn-delete" onclick="deletePortfolio('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading portfolio:', error);
    }
}

document.getElementById('addPortfolioBtn').addEventListener('click', () => {
    showModal('Add Portfolio Item', `
        <form id="portfolioForm">
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" id="portfolioTitle" required>
            </div>
            <div class="form-group">
                <label>Category</label>
                <select class="form-control" id="portfolioCategory" required>
                    <option value="weddings">Weddings</option>
                    <option value="babies">Babies & Families</option>
                    <option value="fashion">Fashion & Editorial</option>
                    <option value="travel">Travel Stories</option>
                    <option value="corporate">Corporate Events</option>
                </select>
            </div>
            <div class="form-group">
                <label>Image</label>
                <input type="file" class="form-control" id="portfolioImage" accept="image/*" required>
            </div>
            <div class="form-group">
                <label>Description (optional)</label>
                <textarea class="form-control" id="portfolioDescription"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Add Portfolio Item</button>
        </form>
    `);
    
    document.getElementById('portfolioForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addPortfolioItem();
    });
});

async function addPortfolioItem() {
    const title = document.getElementById('portfolioTitle').value;
    const category = document.getElementById('portfolioCategory').value;
    const description = document.getElementById('portfolioDescription').value;
    const imageFile = document.getElementById('portfolioImage').files[0];
    
    if (!imageFile) {
        showNotification('Please select an image', 'error');
        return;
    }
    
    try {
        showNotification('Uploading image...', 'info');
        
        // Upload image to Firebase Storage
        const storageRef = storage.ref(`portfolio/${Date.now()}_${imageFile.name}`);
        await storageRef.put(imageFile);
        const imageUrl = await storageRef.getDownloadURL();
        
        // Save to Firestore
        await db.collection('portfolio').add({
            title,
            category,
            description,
            imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('Portfolio item added successfully!', 'success');
        closeModal();
        loadPortfolio();
    } catch (error) {
        console.error('Error adding portfolio:', error);
        showNotification('Error adding portfolio item', 'error');
    }
}

async function deletePortfolio(id) {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return;
    
    try {
        await db.collection('portfolio').doc(id).delete();
        showNotification('Portfolio item deleted', 'success');
        loadPortfolio();
    } catch (error) {
        console.error('Error deleting portfolio:', error);
        showNotification('Error deleting item', 'error');
    }
}

// Team Management
async function loadTeam() {
    try {
        const snapshot = await db.collection('team').get();
        const container = document.getElementById('teamList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No team members yet.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            return `
                <div class="grid-item">
                    <img src="${data.imageUrl}" alt="${data.name}" class="grid-item-image">
                    <div class="grid-item-content">
                        <h3 class="grid-item-title">${data.name}</h3>
                        <p style="color: #667eea; font-weight: 600;">${data.role}</p>
                        <p style="color: #999; font-size: 0.9rem;">${data.bio || ''}</p>
                        <div class="grid-item-actions">
                            <button class="btn-icon btn-edit" onclick="editTeam('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteTeam('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading team:', error);
    }
}

document.getElementById('addTeamBtn').addEventListener('click', () => {
    showModal('Add Team Member', `
        <form id="teamForm">
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" id="teamName" required>
            </div>
            <div class="form-group">
                <label>Role</label>
                <input type="text" class="form-control" id="teamRole" required>
            </div>
            <div class="form-group">
                <label>Bio</label>
                <textarea class="form-control" id="teamBio"></textarea>
            </div>
            <div class="form-group">
                <label>Photo</label>
                <input type="file" class="form-control" id="teamImage" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-primary">Add Team Member</button>
        </form>
    `);
    
    document.getElementById('teamForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addTeamMember();
    });
});

async function addTeamMember() {
    const name = document.getElementById('teamName').value;
    const role = document.getElementById('teamRole').value;
    const bio = document.getElementById('teamBio').value;
    const imageFile = document.getElementById('teamImage').files[0];
    
    if (!imageFile) {
        showNotification('Please select a photo', 'error');
        return;
    }
    
    try {
        showNotification('Uploading photo...', 'info');
        
        const storageRef = storage.ref(`team/${Date.now()}_${imageFile.name}`);
        await storageRef.put(imageFile);
        const imageUrl = await storageRef.getDownloadURL();
        
        await db.collection('team').add({
            name,
            role,
            bio,
            imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('Team member added successfully!', 'success');
        closeModal();
        loadTeam();
    } catch (error) {
        console.error('Error adding team member:', error);
        showNotification('Error adding team member', 'error');
    }
}

async function deleteTeam(id) {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
        await db.collection('team').doc(id).delete();
        showNotification('Team member deleted', 'success');
        loadTeam();
    } catch (error) {
        console.error('Error deleting team member:', error);
        showNotification('Error deleting team member', 'error');
    }
}

// Blog Management
async function loadBlogs() {
    try {
        const snapshot = await db.collection('blogs').orderBy('createdAt', 'desc').get();
        const container = document.getElementById('blogList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No blog posts yet.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            const date = data.createdAt ? data.createdAt.toDate().toLocaleDateString() : 'N/A';
            return `
                <div class="list-item">
                    <div>
                        <h3>${data.title}</h3>
                        <p style="color: #999; font-size: 0.9rem;">${date}</p>
                    </div>
                    <div class="grid-item-actions">
                        <button class="btn-icon btn-edit" onclick="editBlog('${doc.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn-icon btn-delete" onclick="deleteBlog('${doc.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading blogs:', error);
    }
}

document.getElementById('addBlogBtn').addEventListener('click', () => {
    showModal('Write New Blog Post', `
        <form id="blogForm">
            <div class="form-group">
                <label>Title</label>
                <input type="text" class="form-control" id="blogTitle" required>
            </div>
            <div class="form-group">
                <label>Content</label>
                <textarea class="form-control" id="blogContent" rows="10" required></textarea>
            </div>
            <div class="form-group">
                <label>Featured Image</label>
                <input type="file" class="form-control" id="blogImage" accept="image/*" required>
            </div>
            <button type="submit" class="btn btn-primary">Publish Post</button>
        </form>
    `);
    
    document.getElementById('blogForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addBlogPost();
    });
});

async function addBlogPost() {
    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const imageFile = document.getElementById('blogImage').files[0];
    
    if (!imageFile) {
        showNotification('Please select an image', 'error');
        return;
    }
    
    try {
        showNotification('Publishing post...', 'info');
        
        const storageRef = storage.ref(`blogs/${Date.now()}_${imageFile.name}`);
        await storageRef.put(imageFile);
        const imageUrl = await storageRef.getDownloadURL();
        
        await db.collection('blogs').add({
            title,
            content,
            imageUrl,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('Blog post published!', 'success');
        closeModal();
        loadBlogs();
    } catch (error) {
        console.error('Error adding blog:', error);
        showNotification('Error publishing post', 'error');
    }
}

async function deleteBlog(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
        await db.collection('blogs').doc(id).delete();
        showNotification('Blog post deleted', 'success');
        loadBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('Error deleting post', 'error');
    }
}

// Testimonials Management
async function loadTestimonials() {
    try {
        const snapshot = await db.collection('testimonials').get();
        const container = document.getElementById('testimonialList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No testimonials yet.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            return `
                <div class="grid-item">
                    <div class="grid-item-content">
                        <p style="font-style: italic; color: #666; margin-bottom: 15px;">"${data.text}"</p>
                        <h4>${data.name}</h4>
                        <p style="color: #999; font-size: 0.9rem;">${data.role}</p>
                        <div class="grid-item-actions">
                            <button class="btn-icon btn-edit" onclick="editTestimonial('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteTestimonial('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading testimonials:', error);
    }
}

document.getElementById('addTestimonialBtn').addEventListener('click', () => {
    showModal('Add Testimonial', `
        <form id="testimonialForm">
            <div class="form-group">
                <label>Client Name</label>
                <input type="text" class="form-control" id="testimonialName" required>
            </div>
            <div class="form-group">
                <label>Client Role/Location</label>
                <input type="text" class="form-control" id="testimonialRole" required>
            </div>
            <div class="form-group">
                <label>Testimonial Text</label>
                <textarea class="form-control" id="testimonialText" rows="5" required></textarea>
            </div>
            <div class="form-group">
                <label>Rating</label>
                <select class="form-control" id="testimonialRating">
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Add Testimonial</button>
        </form>
    `);
    
    document.getElementById('testimonialForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addTestimonial();
    });
});

async function addTestimonial() {
    const name = document.getElementById('testimonialName').value;
    const role = document.getElementById('testimonialRole').value;
    const text = document.getElementById('testimonialText').value;
    const rating = document.getElementById('testimonialRating').value;
    
    try {
        await db.collection('testimonials').add({
            name,
            role,
            text,
            rating: parseInt(rating),
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('Testimonial added successfully!', 'success');
        closeModal();
        loadTestimonials();
    } catch (error) {
        console.error('Error adding testimonial:', error);
        showNotification('Error adding testimonial', 'error');
    }
}

async function deleteTestimonial(id) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
        await db.collection('testimonials').doc(id).delete();
        showNotification('Testimonial deleted', 'success');
        loadTestimonials();
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        showNotification('Error deleting testimonial', 'error');
    }
}

// Services Management
async function loadServices() {
    try {
        const snapshot = await db.collection('services').get();
        const container = document.getElementById('serviceList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No services yet.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            return `
                <div class="grid-item">
                    <div class="grid-item-content">
                        <h3 class="grid-item-title">${data.title}</h3>
                        <p style="color: #999; margin: 10px 0;">${data.description}</p>
                        <div class="grid-item-actions">
                            <button class="btn-icon btn-edit" onclick="editService('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn-icon btn-delete" onclick="deleteService('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

document.getElementById('addServiceBtn').addEventListener('click', () => {
    showModal('Add Service', `
        <form id="serviceForm">
            <div class="form-group">
                <label>Service Title</label>
                <input type="text" class="form-control" id="serviceTitle" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" id="serviceDescription" rows="5" required></textarea>
            </div>
            <div class="form-group">
                <label>Icon (Font Awesome class)</label>
                <input type="text" class="form-control" id="serviceIcon" placeholder="e.g., fas fa-camera">
            </div>
            <button type="submit" class="btn btn-primary">Add Service</button>
        </form>
    `);
    
    document.getElementById('serviceForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await addService();
    });
});

async function addService() {
    const title = document.getElementById('serviceTitle').value;
    const description = document.getElementById('serviceDescription').value;
    const icon = document.getElementById('serviceIcon').value;
    
    try {
        await db.collection('services').add({
            title,
            description,
            icon,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('Service added successfully!', 'success');
        closeModal();
        loadServices();
    } catch (error) {
        console.error('Error adding service:', error);
        showNotification('Error adding service', 'error');
    }
}

async function deleteService(id) {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
        await db.collection('services').doc(id).delete();
        showNotification('Service deleted', 'success');
        loadServices();
    } catch (error) {
        console.error('Error deleting service:', error);
        showNotification('Error deleting service', 'error');
    }
}

// Inquiries Management
async function loadInquiries() {
    try {
        const snapshot = await db.collection('inquiries').orderBy('timestamp', 'desc').get();
        const container = document.getElementById('inquiryList');
        
        if (snapshot.empty) {
            container.innerHTML = '<p class="loading">No inquiries yet.</p>';
            return;
        }
        
        container.innerHTML = snapshot.docs.map(doc => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate().toLocaleString() : 'N/A';
            return `
                <div class="list-item" style="flex-direction: column; align-items: flex-start;">
                    <div style="width: 100%; display: flex; justify-content: space-between; margin-bottom: 10px;">
                        <div>
                            <h4>${data.name}</h4>
                            <p style="color: #999; font-size: 0.9rem;">${data.email} | ${data.phone || 'No phone'}</p>
                        </div>
                        <span style="padding: 5px 15px; background: #d4edda; color: #155724; border-radius: 20px; font-size: 0.85rem;">${data.status || 'new'}</span>
                    </div>
                    <p><strong>Type:</strong> ${data.shootType} | <strong>Location:</strong> ${data.location || 'N/A'}</p>
                    <p style="color: #666; margin: 10px 0;">${data.details || 'No details provided'}</p>
                    <small style="color: #999;">Received: ${date}</small>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading inquiries:', error);
    }
}

// Settings Management
async function loadSettings() {
    try {
        const doc = await db.collection('settings').doc('website').get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('primaryPhone').value = data.primaryPhone || '';
            document.getElementById('secondaryPhone').value = data.secondaryPhone || '';
            document.getElementById('contactEmail').value = data.contactEmail || '';
            document.getElementById('instagram').value = data.instagram || '';
            document.getElementById('facebook').value = data.facebook || '';
            document.getElementById('youtube').value = data.youtube || '';
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

document.getElementById('contactInfoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        await db.collection('settings').doc('website').set({
            primaryPhone: document.getElementById('primaryPhone').value,
            secondaryPhone: document.getElementById('secondaryPhone').value,
            contactEmail: document.getElementById('contactEmail').value
        }, { merge: true });
        
        showNotification('Contact information saved!', 'success');
    } catch (error) {
        console.error('Error saving contact info:', error);
        showNotification('Error saving changes', 'error');
    }
});

document.getElementById('socialLinksForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        await db.collection('settings').doc('website').set({
            instagram: document.getElementById('instagram').value,
            facebook: document.getElementById('facebook').value,
            youtube: document.getElementById('youtube').value
        }, { merge: true });
        
        showNotification('Social links saved!', 'success');
    } catch (error) {
        console.error('Error saving social links:', error);
        showNotification('Error saving changes', 'error');
    }
});

// Modal Functions
function showModal(title, content) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').innerHTML = content;
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

document.getElementById('modalClose').addEventListener('click', closeModal);

// Notification Function
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#667eea'
    };
    
    notification.style.borderLeft = `4px solid ${colors[type]}`;
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Make functions globally available
window.editPortfolio = editPortfolio;
window.deletePortfolio = deletePortfolio;
window.editTeam = editTeam;
window.deleteTeam = deleteTeam;
window.editBlog = editBlog;
window.deleteBlog = deleteBlog;
window.editTestimonial = editTestimonial;
window.deleteTestimonial = deleteTestimonial;
window.editService = editService;
window.deleteService = deleteService;

// Placeholder edit functions (you can implement these)
function editPortfolio(id) {
    showNotification('Edit feature coming soon!', 'info');
}

function editTeam(id) {
    showNotification('Edit feature coming soon!', 'info');
}

function editBlog(id) {
    showNotification('Edit feature coming soon!', 'info');
}

function editTestimonial(id) {
    showNotification('Edit feature coming soon!', 'info');
}

function editService(id) {
    showNotification('Edit feature coming soon!', 'info');
}

