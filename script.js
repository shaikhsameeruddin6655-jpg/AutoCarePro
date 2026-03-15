// Services Data (Indian Pricing in ₹)
const services = [
    {
        id: 1,
        name: "Engine Repair",
        description: "Complete engine diagnostics and repair services for all makes and models",
        price: 3500,
        icon: "fa-cogs"
    },
    {
        id: 2,
        name: "Brake Service",
        description: "Brake inspection, pad replacement, and system maintenance",
        price: 1800,
        icon: "fa-compact-disc"
    },
    {
        id: 3,
        name: "Oil Change",
        description: "Regular oil change with premium quality oil and filter replacement",
        price: 800,
        icon: "fa-oil-can"
    },
    {
        id: 4,
        name: "Wheel Alignment",
        description: "Precision wheel alignment for better handling and tire longevity",
        price: 1200,
        icon: "fa-circle-notch"
    },
    {
        id: 5,
        name: "AC Repair",
        description: "Air conditioning system repair and refrigerant recharge",
        price: 2500,
        icon: "fa-snowflake"
    },
    {
        id: 6,
        name: "Battery Replacement",
        description: "Battery testing and replacement with warranty coverage",
        price: 4500,
        icon: "fa-battery-full"
    }
];

// Mechanics Data
const mechanics = [
    {
        id: 1,
        name: "Rajesh Kumar",
        experience: 12,
        specialization: "engine",
        specializationLabel: "Engine Specialist",
        certification: "ASE Master Technician",
        photo: "fa-user-tie"
    },
    {
        id: 2,
        name: "Amit Sharma",
        experience: 8,
        specialization: "transmission",
        specializationLabel: "Transmission Expert",
        certification: "ASE Certified",
        photo: "fa-user"
    },
    {
        id: 3,
        name: "Vikram Singh",
        experience: 15,
        specialization: "electrical",
        specializationLabel: "Electrical Systems",
        certification: "ASE Master Technician",
        photo: "fa-user-graduate"
    },
    {
        id: 4,
        name: "Sanjay Patel",
        experience: 10,
        specialization: "brakes",
        specializationLabel: "Brake Specialist",
        certification: "ASE Certified",
        photo: "fa-user"
    },
    {
        id: 5,
        name: "Mohammed Ali",
        experience: 6,
        specialization: "engine",
        specializationLabel: "Engine Specialist",
        certification: "ASE Certified",
        photo: "fa-user-tie"
    },
    {
        id: 6,
        name: "Prakash Reddy",
        experience: 20,
        specialization: "diagnostics",
        specializationLabel: "Diagnostics Expert",
        certification: "ASE Master Technician",
        photo: "fa-user-graduate"
    }
];

// Gallery Data
const galleryImages = [
    {
        id: 1,
        category: "workshop",
        title: "Modern Workshop Facility",
        description: "Our state-of-the-art workshop equipped with latest tools",
        icon: "fa-warehouse"
    },
    {
        id: 2,
        category: "workshop",
        title: "Service Bay",
        description: "Clean and organized service bays for efficient work",
        icon: "fa-garage"
    },
    {
        id: 3,
        category: "services",
        title: "Engine Service",
        description: "Professional engine repair and maintenance",
        icon: "fa-cogs"
    },
    {
        id: 4,
        category: "services",
        title: "Brake Inspection",
        description: "Thorough brake system inspection",
        icon: "fa-compact-disc"
    },
    {
        id: 5,
        category: "before-after",
        title: "Before: Dirty Engine",
        description: "Engine before our cleaning service",
        icon: "fa-exclamation-triangle"
    },
    {
        id: 6,
        category: "before-after",
        title: "After: Clean Engine",
        description: "Engine after professional cleaning",
        icon: "fa-check-circle"
    },
    {
        id: 7,
        category: "workshop",
        title: "Diagnostic Equipment",
        description: "Advanced diagnostic machines for accurate detection",
        icon: "fa-microscope"
    },
    {
        id: 8,
        category: "services",
        title: "Wheel Alignment",
        description: "Precision wheel alignment in progress",
        icon: "fa-circle-notch"
    }
];

// Global State
let selectedServices = [];
let currentFilter = 'all';
let currentGalleryFilter = 'all';

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeServices();
    initializeMechanics();
    initializeGallery();
    initializeBooking();
    initializeContact();
    loadSelectedServices();
});

// Navigation
function initializeNavigation() {
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Services Page Functions
function initializeServices() {
    const servicesGrid = document.getElementById('services-grid');
    const clearSelectionBtn = document.getElementById('clear-selection');
    const proceedBookingBtn = document.getElementById('proceed-booking');

    if (servicesGrid) {
        renderServices();
    }

    if (clearSelectionBtn) {
        clearSelectionBtn.addEventListener('click', clearServiceSelection);
    }

    if (proceedBookingBtn) {
        proceedBookingBtn.addEventListener('click', () => {
            localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
            window.location.href = 'booking.html';
        });
    }
}

function renderServices() {
    const servicesGrid = document.getElementById('services-grid');
    if (!servicesGrid) return;

    servicesGrid.innerHTML = services.map(service => `
        <div class="service-card ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}" data-service-id="${service.id}">
            <i class="fas ${service.icon}" style="font-size: 2rem; color: #e74c3c; margin-bottom: 15px;"></i>
            <h3>${service.name}</h3>
            <p>${service.description}</p>
            <div class="service-price">₹${service.price.toLocaleString('en-IN')}</div>
            <div class="service-checkbox">
                <input type="checkbox" id="service-${service.id}" ${selectedServices.find(s => s.id === service.id) ? 'checked' : ''}>
                <label for="service-${service.id}">Select Service</label>
            </div>
        </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.type !== 'checkbox') {
                const checkbox = this.querySelector('input[type="checkbox"]');
                checkbox.checked = !checkbox.checked;
                toggleService(parseInt(this.dataset.serviceId));
            }
        });
    });

    document.querySelectorAll('.service-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            toggleService(parseInt(this.id.replace('service-', '')));
        });
    });

    updateServiceSummary();
}

function toggleService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    const index = selectedServices.findIndex(s => s.id === serviceId);

    if (index > -1) {
        selectedServices.splice(index, 1);
    } else {
        selectedServices.push(service);
    }

    updateServiceSummary();
    renderServices();
}

function updateServiceSummary() {
    const selectedServicesDiv = document.getElementById('selected-services');
    const totalAmountSpan = document.getElementById('total-amount');
    const proceedBookingBtn = document.getElementById('proceed-booking');

    if (!selectedServicesDiv) return;

    if (selectedServices.length === 0) {
        selectedServicesDiv.innerHTML = '<p>No services selected</p>';
        if (totalAmountSpan) totalAmountSpan.textContent = '₹0';
        if (proceedBookingBtn) proceedBookingBtn.style.display = 'none';
    } else {
        selectedServicesDiv.innerHTML = selectedServices.map(service => `
            <div class="selected-service-item">
                <span>${service.name}</span>
                <span>₹${service.price.toLocaleString('en-IN')}</span>
            </div>
        `).join('');

        const total = selectedServices.reduce((sum, service) => sum + service.price, 0);
        if (totalAmountSpan) totalAmountSpan.textContent = `₹${total.toLocaleString('en-IN')}`;
        if (proceedBookingBtn) proceedBookingBtn.style.display = 'inline-block';
    }

    // Save to localStorage
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
}

function clearServiceSelection() {
    selectedServices = [];
    updateServiceSummary();
    renderServices();
}

function loadSelectedServices() {
    const saved = localStorage.getItem('selectedServices');
    if (saved) {
        selectedServices = JSON.parse(saved);
    }
}

// Mechanics Page Functions
function initializeMechanics() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.specialization;
            renderMechanics();
        });
    });

    renderMechanics();
}

function renderMechanics() {
    const mechanicsGrid = document.getElementById('mechanics-grid');
    if (!mechanicsGrid) return;

    const filteredMechanics = currentFilter === 'all' 
        ? mechanics 
        : mechanics.filter(m => m.specialization === currentFilter);

    mechanicsGrid.innerHTML = filteredMechanics.map(mechanic => `
        <div class="mechanic-card">
            <div class="mechanic-photo">
                <i class="fas ${mechanic.photo}"></i>
            </div>
            <div class="mechanic-info">
                <div class="mechanic-name">${mechanic.name}</div>
                <div class="mechanic-specialization">${mechanic.specializationLabel}</div>
                <div class="mechanic-experience">${mechanic.experience} years of experience</div>
                <div class="certification-badge">${mechanic.certification}</div>
            </div>
        </div>
    `).join('');
}

// Gallery Page Functions
function initializeGallery() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentGalleryFilter = this.dataset.category;
            renderGallery();
        });
    });

    renderGallery();
    initializeModal();
}

function renderGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    if (!galleryGrid) return;

    const filteredImages = currentGalleryFilter === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === currentGalleryFilter);

    galleryGrid.innerHTML = filteredImages.map(image => `
        <div class="gallery-item" data-image-id="${image.id}">
            <i class="fas ${image.icon}"></i>
        </div>
    `).join('');

    // Add click event listeners
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imageId = parseInt(this.dataset.imageId);
            const image = galleryImages.find(img => img.id === imageId);
            openModal(image);
        });
    });
}

function initializeModal() {
    const modal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

function openModal(image) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    if (modal && modalTitle && modalDescription) {
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description;
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Booking Page Functions
function initializeBooking() {
    const bookingForm = document.getElementById('service-booking-form');
    const serviceTypeSelect = document.getElementById('service-type');
    const preferredDateInput = document.getElementById('preferred-date');

    // Set minimum date to today
    if (preferredDateInput) {
        const today = new Date().toISOString().split('T')[0];
        preferredDateInput.min = today;
    }

    // Load selected services
    loadBookingServices();

    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', updateBookingSummary);
    }

    // Add input event listeners for real-time validation
    const inputs = bookingForm?.querySelectorAll('input, select, textarea');
    if (inputs) {
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateField(input);
                updateBookingSummary();
            });
            input.addEventListener('blur', () => validateField(input));
        });
    }
}

function loadBookingServices() {
    const selectedServicesList = document.getElementById('selected-services-list');
    if (!selectedServicesList) return;

    if (selectedServices.length === 0) {
        selectedServicesList.innerHTML = '<p>No services selected. <a href="services.html">Select services here</a></p>';
    } else {
        selectedServicesList.innerHTML = selectedServices.map(service => `
            <div class="selected-service-item">
                <span>${service.name}</span>
                <span>₹${service.price.toLocaleString('en-IN')}</span>
            </div>
        `).join('');
    }
}

function updateBookingSummary() {
    const summaryContent = document.getElementById('booking-summary-content');
    const costBreakdown = document.getElementById('cost-breakdown');
    const serviceCostSpan = document.getElementById('service-cost');
    const surchargeSpan = document.getElementById('surcharge');
    const totalCostSpan = document.getElementById('total-cost');

    if (!summaryContent) return;

    const customerName = document.getElementById('customer-name')?.value;
    const email = document.getElementById('email')?.value;
    const phone = document.getElementById('phone')?.value;
    const carBrand = document.getElementById('car-brand')?.value;
    const carModel = document.getElementById('car-model')?.value;
    const preferredDate = document.getElementById('preferred-date')?.value;
    const serviceType = document.getElementById('service-type')?.value;

    if (customerName || email || phone || carBrand || carModel || preferredDate || serviceType) {
        let summaryHTML = '<h4>Booking Details</h4>';
        if (customerName) summaryHTML += `<p><strong>Name:</strong> ${customerName}</p>`;
        if (email) summaryHTML += `<p><strong>Email:</strong> ${email}</p>`;
        if (phone) summaryHTML += `<p><strong>Phone:</strong> ${phone}</p>`;
        if (carBrand && carModel) summaryHTML += `<p><strong>Vehicle:</strong> ${carBrand} ${carModel}</p>`;
        if (preferredDate) summaryHTML += `<p><strong>Date:</strong> ${preferredDate}</p>`;
        if (serviceType) summaryHTML += `<p><strong>Service Type:</strong> ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</p>`;
        
        summaryContent.innerHTML = summaryHTML;

        // Calculate costs
        if (selectedServices.length > 0 && serviceType) {
            const serviceCost = selectedServices.reduce((sum, service) => sum + service.price, 0);
            const surcharge = serviceType === 'express' ? serviceCost * 0.2 : 0;
            const subtotal = serviceCost + surcharge;
            const gst = subtotal * 0.18; // 18% GST
            const totalCost = subtotal + gst;

            if (serviceCostSpan) serviceCostSpan.textContent = `₹${serviceCost.toLocaleString('en-IN')}`;
            if (surchargeSpan) surchargeSpan.textContent = `₹${surcharge.toLocaleString('en-IN')}`;
            if (document.getElementById('gst')) {
                document.getElementById('gst').textContent = `₹${gst.toLocaleString('en-IN')}`;
            }
            if (totalCostSpan) totalCostSpan.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
            
            if (costBreakdown) costBreakdown.style.display = 'block';
        }
    } else {
        summaryContent.innerHTML = '<p>Please fill in the form to see your booking summary.</p>';
        if (costBreakdown) costBreakdown.style.display = 'none';
    }

    checkFormValidity();
}

function validateField(field) {
    const errorMessage = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let message = '';

    // Remove previous error state
    field.classList.remove('error');
    if (errorMessage) errorMessage.textContent = '';

    // Check if field is required and empty
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        message = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }

    // Phone validation (Indian format)
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = field.value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length !== 10) {
            isValid = false;
            message = 'Please enter a valid 10-digit Indian mobile number';
        }
    }

    // Date validation
    if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            message = 'Please select a future date';
        }
    }

    if (!isValid) {
        field.classList.add('error');
        if (errorMessage) errorMessage.textContent = message;
    }

    return isValid;
}

function checkFormValidity() {
    const form = document.getElementById('service-booking-form');
    const submitBtn = document.getElementById('submit-booking');
    if (!form || !submitBtn) return;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    submitBtn.disabled = !isValid;
}

function handleBookingSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Show success modal
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.style.display = 'block';
    }

    // Reset form
    form.reset();
    selectedServices = [];
    localStorage.removeItem('selectedServices');
    updateBookingSummary();
}

function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    if (successModal) {
        successModal.style.display = 'none';
    }
}

// Contact Page Functions
function initializeContact() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Add input event listeners for real-time validation
    const inputs = contactForm?.querySelectorAll('input, select, textarea');
    if (inputs) {
        inputs.forEach(input => {
            input.addEventListener('input', () => validateField(input));
            input.addEventListener('blur', () => validateField(input));
        });
    }

    checkContactFormValidity();
}

function checkContactFormValidity() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-contact');
    if (!form || !submitBtn) return;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    submitBtn.disabled = !isValid;
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const form = e.target;
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    if (!isValid) {
        return;
    }

    // Show success modal
    const successModal = document.getElementById('contact-success-modal');
    if (successModal) {
        successModal.style.display = 'block';
    }

    // Reset form
    form.reset();
}

function closeContactSuccessModal() {
    const successModal = document.getElementById('contact-success-modal');
    if (successModal) {
        successModal.style.display = 'none';
    }
}

// Utility Functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Close modals on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        closeSuccessModal();
        closeContactSuccessModal();
    }
});
