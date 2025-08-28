// Common functionality for FPFC application

// Authentication state management
let isAuthenticated = false;
let currentUser = null;

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem('fpfc_token');
    if (token) {
        isAuthenticated = true;
        currentUser = JSON.parse(localStorage.getItem('fpfc_user') || '{}');
        return true;
    }
    return false;
}

// Login function
function login(username, password) {
    // Simple authentication - in real app this would call an API
    if (password === '12345678') {
        const user = {
            id: 1,
            username: username,
            name: 'Sofía Rodríguez',
            role: 'Administrador',
            email: username
        };
        
        localStorage.setItem('fpfc_token', 'mock_token_' + Date.now());
        localStorage.setItem('fpfc_user', JSON.stringify(user));
        
        isAuthenticated = true;
        currentUser = user;
        
        return true;
    }
    return false;
}

// Logout function
function logout() {
    localStorage.removeItem('fpfc_token');
    localStorage.removeItem('fpfc_user');
    isAuthenticated = false;
    currentUser = null;
    window.location.href = './pages/index.html';
}

// Profile dropdown functionality
function initializeProfileDropdown() {
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function() {
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }
}

// Search functionality for inventory
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            performSearch();
        });
    }
}

// Filter functionality for inventory
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectFilter(this, this.dataset.filter);
        });
    });
}

// User management functions
function addUser(userData) {
    // In a real app, this would send data to a server
    const users = JSON.parse(localStorage.getItem('fpfc_users') || '[]');
    const newUser = {
        id: users.length + 1,
        ...userData,
        createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('fpfc_users', JSON.stringify(users));
    return newUser;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('fpfc_users') || '[]');
}

// Report generation
function generateReport(fields, options) {
    // In a real app, this would generate and download a file
    const reportData = {
        fields: fields,
        options: options,
        generatedAt: new Date().toISOString(),
        data: getInventoryData() // Mock data
    };
    
    // Simulate file download
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `reporte_${Date.now()}.json`;
    link.click();
    
    return true;
}

// Mock inventory data
function getInventoryData() {
    return [
        {
            id: 1,
            nombre: "El Eco Silencioso",
            año: "1968",
            material: "Nitrato de Celulosa",
            autor: "Elías Thorne",
            estado: "Necesita Restauración",
            fecha: "2023-08-15",
            notas: "Frágil, manipular con cuidado"
        },
        // Add more mock data as needed
    ];
}

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function confirmAction(message) {
    return confirm(message);
}

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuthStatus();
    
    // Initialize profile dropdown
    initializeProfileDropdown();
    
    // Initialize search if on inventory page
    initializeSearch();
    
    // Initialize filters if on inventory page
    initializeFilters();
    
    // Add logout functionality to all logout buttons
    document.querySelectorAll('[onclick*="logout"]').forEach(button => {
        button.onclick = logout;
    });
});

// Export functions for use in other scripts
window.FPFC = {
    login,
    logout,
    checkAuthStatus,
    addUser,
    getUsers,
    generateReport,
    showNotification,
    confirmAction,
    isAuthenticated: () => isAuthenticated,
    currentUser: () => currentUser
};
