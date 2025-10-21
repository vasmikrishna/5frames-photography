// ============================================
// 5 Frames Photography - JavaScript
// ============================================

// ============================================
// NAVIGATION MENU TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// STICKY NAVIGATION
// ============================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PORTFOLIO FILTER
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                // Fade in animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
const animateOnScroll = document.querySelectorAll('.specialty-card, .portfolio-item, .testimonial-card, .team-member, .blog-card, .process-step');
animateOnScroll.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ============================================
// FIREBASE CONFIGURATION
// ============================================
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
let db;
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        console.log('Firebase initialized successfully');
    }
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// ============================================
// CONTACT FORM HANDLING WITH FIREBASE
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            shootType: document.getElementById('shootType').value,
            location: document.getElementById('location').value,
            details: document.getElementById('details').value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'new'
        };
        
        // Disable submit button to prevent double submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        
        try {
            // Save to Firebase Firestore
            if (db) {
                await db.collection('inquiries').add(formData);
                
                // Show success message
                showNotification('Thank you for your inquiry! We will get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error('Firebase not initialized');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showNotification('There was an error submitting your form. Please try again or contact us directly.', 'error');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => removeNotification(notification));
    
    // Auto remove after 5 seconds
    setTimeout(() => removeNotification(notification), 5000);
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 600);
    }
});

// ============================================
// PORTFOLIO GALLERY DATA
// ============================================
const galleryData = {
    weddings: [
        { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop', title: 'The Golden Hour Wedding', caption: 'Beautiful outdoor ceremony at sunset' },
        { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=800&fit=crop', title: 'Love in Every Ritual', caption: 'Traditional wedding celebration' },
        { src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&h=800&fit=crop', title: 'First Look Moment', caption: 'Emotional first look before ceremony' },
        { src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&h=800&fit=crop', title: 'Wedding Celebration', caption: 'Reception and celebration moments' },
        { src: 'https://images.unsplash.com/photo-1594587460956-ae6c90a0c45c?w=1200&h=800&fit=crop', title: 'Romantic Portraits', caption: 'Couple portraits in nature' }
    ],
    babies: [
        { src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1200&h=800&fit=crop', title: 'Playful Beginnings', caption: 'Newborn lifestyle photography' },
        { src: 'https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=1200&h=800&fit=crop', title: 'First Smiles', caption: 'Precious baby moments' },
        { src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=1200&h=800&fit=crop', title: 'Sweet Dreams', caption: 'Peaceful sleeping baby' },
        { src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1200&h=800&fit=crop', title: 'Family Love', caption: 'Parents with newborn' },
        { src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=1200&h=800&fit=crop', title: 'Tiny Hands', caption: 'Detail shots of baby features' }
    ],
    fashion: [
        { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=800&fit=crop', title: 'Style In Frame', caption: 'Editorial fashion photography' },
        { src: 'https://images.unsplash.com/photo-1490725263030-1f0521cec8ec?w=1200&h=800&fit=crop', title: 'Bold & Beautiful', caption: 'High fashion modeling shoot' },
        { src: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=800&fit=crop', title: 'Urban Fashion', caption: 'Street style photography' },
        { src: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=800&fit=crop', title: 'Elegant Poses', caption: 'Studio fashion portraits' },
        { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop', title: 'Fashion Details', caption: 'Close-up styling shots' }
    ],
    travel: [
        { src: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&h=800&fit=crop', title: 'Wanderlust Trails', caption: 'Adventure travel photography' },
        { src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop', title: 'Journey Captured', caption: 'Destination portraits' },
        { src: 'https://images.unsplash.com/photo-1530991808291-2f5d6c7c6d67?w=1200&h=800&fit=crop', title: 'Beach Memories', caption: 'Coastal photography' },
        { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=800&fit=crop', title: 'Mountain Views', caption: 'Landscape and travel' },
        { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop', title: 'Ocean Dreams', caption: 'Seaside adventures' }
    ],
    corporate: [
        { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop', title: 'Corporate Excellence', caption: 'Professional business events' },
        { src: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=800&fit=crop', title: 'Team Success', caption: 'Corporate team photography' },
        { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop', title: 'Conference Coverage', caption: 'Event documentation' },
        { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop', title: 'Business Portraits', caption: 'Professional headshots' },
        { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&h=800&fit=crop', title: 'Office Life', caption: 'Workplace photography' }
    ]
};

let currentGallery = [];
let currentImageIndex = 0;

// ============================================
// PORTFOLIO ITEM CLICK - OPEN GALLERY
// ============================================
portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const title = this.querySelector('.portfolio-overlay h3').textContent;
        
        // Get the gallery images for this category
        currentGallery = galleryData[category] || [];
        currentImageIndex = 0;
        
        // Open the gallery modal
        openGallery(title, category);
    });
});

// ============================================
// GALLERY MODAL FUNCTIONS
// ============================================
function openGallery(title, category) {
    if (currentGallery.length === 0) return;
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('galleryModal');
    if (!modal) {
        modal = createGalleryModal();
    }
    
    // Update modal content
    document.getElementById('galleryTitle').textContent = title;
    document.getElementById('galleryCategory').textContent = category;
    document.getElementById('imageCounter').textContent = `1 / ${currentGallery.length}`;
    
    // Show the modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Load first image
    showGalleryImage(0);
}

function createGalleryModal() {
    const modal = document.createElement('div');
    modal.id = 'galleryModal';
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <div class="gallery-header">
                <div class="gallery-info">
                    <h2 id="galleryTitle"></h2>
                    <p id="galleryCategory"></p>
                </div>
                <button class="gallery-close" id="closeGallery">&times;</button>
            </div>
            <div class="gallery-body">
                <button class="gallery-nav gallery-prev" id="prevImage">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="gallery-image-container">
                    <img id="galleryImage" src="" alt="">
                    <p id="galleryCaption"></p>
                </div>
                <button class="gallery-nav gallery-next" id="nextImage">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="gallery-footer">
                <p id="imageCounter"></p>
                <div class="gallery-thumbnails" id="galleryThumbnails"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add event listeners
    document.getElementById('closeGallery').addEventListener('click', closeGallery);
    document.getElementById('prevImage').addEventListener('click', () => navigateGallery(-1));
    document.getElementById('nextImage').addEventListener('click', () => navigateGallery(1));
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeGallery();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    return modal;
}

function showGalleryImage(index) {
    if (index < 0 || index >= currentGallery.length) return;
    
    currentImageIndex = index;
    const image = currentGallery[index];
    
    const imgElement = document.getElementById('galleryImage');
    const caption = document.getElementById('galleryCaption');
    const counter = document.getElementById('imageCounter');
    
    // Fade out effect
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        imgElement.src = image.src;
        imgElement.alt = image.title;
        caption.textContent = image.caption;
        counter.textContent = `${index + 1} / ${currentGallery.length}`;
        
        // Fade in effect
        imgElement.style.opacity = '1';
    }, 200);
    
    // Update thumbnails
    updateThumbnails();
}

function navigateGallery(direction) {
    let newIndex = currentImageIndex + direction;
    
    // Loop around
    if (newIndex < 0) {
        newIndex = currentGallery.length - 1;
    } else if (newIndex >= currentGallery.length) {
        newIndex = 0;
    }
    
    showGalleryImage(newIndex);
}

function updateThumbnails() {
    const container = document.getElementById('galleryThumbnails');
    container.innerHTML = '';
    
    currentGallery.forEach((image, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'gallery-thumbnail' + (index === currentImageIndex ? ' active' : '');
        thumb.style.backgroundImage = `url(${image.src})`;
        thumb.addEventListener('click', () => showGalleryImage(index));
        container.appendChild(thumb);
    });
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function handleKeyPress(e) {
    const modal = document.getElementById('galleryModal');
    if (!modal || modal.style.display !== 'flex') return;
    
    switch(e.key) {
        case 'ArrowLeft':
            navigateGallery(-1);
            break;
        case 'ArrowRight':
            navigateGallery(1);
            break;
        case 'Escape':
            closeGallery();
            break;
    }
}

// ============================================
// REEL CARD CLICK
// ============================================
const reelCards = document.querySelectorAll('.reel-card');
reelCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3').textContent;
        
        // Here you could open a video modal or navigate to video
        console.log(`Clicked on reel: ${title}`);
        alert(`${title}\n\nVideo player would open here.`);
    });
});

// ============================================
// COUNTER ANIMATION (FOR STATS IF ADDED)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger any initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});

// ============================================
// UTILITY: THROTTLE FUNCTION
// ============================================
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttle to scroll events for better performance
const throttledScroll = throttle(() => {
    activateNavLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ============================================
// RESPONSIVE MENU HANDLING
// ============================================
function handleResize() {
    if (window.innerWidth > 992) {
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', throttle(handleResize, 250));

// ============================================
// ADD TO FORM VALIDATION
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#e74c3c';
        } else if (this.type === 'email' && this.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value)) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#27ae60';
            }
        } else if (this.value) {
            this.style.borderColor = '#27ae60';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = '#d4af37';
    });
});

// ============================================
// BLOG CARD HOVER EFFECT
// ============================================
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

console.log('5 Frames Photography - Website Loaded Successfully! 📸');

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
const cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    // Create sparkle effect on special elements
    const target = e.target;
    if (target.classList.contains('btn') || target.classList.contains('logo-number')) {
        createSparkle(e.clientX, e.clientY);
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// ============================================
// PARALLAX SCROLL EFFECT FOR SECTIONS
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        const speed = 0.5 + (index % 3) * 0.2;
        const yPos = -(scrolled * speed / 100);
        item.style.transform = `translateY(${yPos}px)`;
    });
    
    // Parallax for team members
    document.querySelectorAll('.team-member').forEach((member, index) => {
        const speed = 0.3 + (index % 2) * 0.15;
        const yPos = -(scrolled * speed / 100);
        member.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// ANIMATED COUNTER FOR STATS (IF ADDED)
// ============================================
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// TILT EFFECT ON CARDS
// ============================================
document.querySelectorAll('.specialty-card, .testimonial-card, .blog-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ============================================
// GLITCH EFFECT ON HOVER FOR TITLES
// ============================================
document.querySelectorAll('.section-title').forEach(title => {
    title.addEventListener('mouseenter', () => {
        const originalText = title.textContent;
        let iterations = 0;
        const maxIterations = 10;
        
        const glitchInterval = setInterval(() => {
            title.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return String.fromCharCode(33 + Math.floor(Math.random() * 94));
                })
                .join('');
            
            iterations += 1;
            
            if (iterations > maxIterations) {
                clearInterval(glitchInterval);
                title.textContent = originalText;
            }
        }, 50);
    });
});

// ============================================
// MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = '';
    });
});

// ============================================
// SMOOTH REVEAL ON SCROLL WITH STAGGER
// ============================================
const revealElements = document.querySelectorAll('.values-list li');
revealElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(-50px)';
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ============================================
// TEXT TYPING EFFECT FOR HERO
// ============================================
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const originalText = heroTagline.textContent;
    heroTagline.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTagline.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 2000);
}

// ============================================
// ADD SPARKLE CSS DYNAMICALLY
// ============================================
const sparkleStyles = document.createElement('style');
sparkleStyles.textContent = `
    .sparkle {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: sparkleAnimation 1s ease-out forwards;
    }
    
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(2) rotate(180deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyles);

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: var(--accent-color);
    width: 0%;
    z-index: 10001;
    transition: width 0.1s ease;
    box-shadow: 0 0 10px var(--accent-color);
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
});

