// login-admin.js
document.addEventListener('DOMContentLoaded', function() {
    // Wrap the form in a container
    const form = document.querySelector('form');
    const container = document.createElement('div');
    container.className = 'login-container';
    form.parentNode.insertBefore(container, form);
    container.appendChild(form);

    // Add validation for the form
    form.addEventListener('submit', function(event) {
        const usernameInput = document.querySelector('input[name="username"]');
        const passwordInput = document.querySelector('input[name="password"]');
        let isValid = true;
        
        // Reset any previous error styles
        usernameInput.style.borderColor = '';
        passwordInput.style.borderColor = '';
        
        // Username validation
        if (usernameInput.value.trim() === '') {
            usernameInput.style.borderColor = '#6b7280';
            isValid = false;
        }
        
        // Password validation
        if (passwordInput.value.trim() === '') {
            passwordInput.style.borderColor = '#6b7280';
            isValid = false;
        }
        
        // If not valid, prevent form submission
        if (!isValid) {
            event.preventDefault();
            
            // Display a general error message if one doesn't exist
            let errorElement = document.querySelector('p.error-message');
            if (!errorElement) {
                errorElement = document.createElement('p');
                errorElement.className = 'error-message';
                errorElement.style.color = '#4a5568';
                errorElement.textContent = 'Please fill in all required fields.';
                form.appendChild(errorElement);
            }
        }
    });

    // Add input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        // Focus effect
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = '#2c5282';
        });
        
        // Blur effect
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
            
            // Additional validation on blur
            if (this.value.trim() === '') {
                this.style.borderColor = '#6b7280';
            } else {
                this.style.borderColor = '';
            }
        });
    });

    // Security feature - prevent browser password autofill until user interacts
    const passwordField = document.querySelector('input[type="password"]');
    passwordField.autocomplete = 'new-password';
    
    // Add visual feedback when attempting to log in
    form.addEventListener('submit', function() {
        const button = this.querySelector('button[type="submit"]');
        button.textContent = 'Authenticating...';
        button.disabled = true;
        button.style.backgroundColor = '#4a5568';
    });

    // Function to show a login attempt notification
    function showLoginAttemptNotification() {
        // Check if there's an error message in the URL (from failed login redirect)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('failed')) {
            const notification = document.createElement('div');
            notification.className = 'login-notification';
            notification.textContent = 'Invalid login attempt recorded.';
            notification.style.backgroundColor = '#e2e8f0';
            notification.style.color = '#4a5568';
            notification.style.padding = '10px';
            notification.style.borderRadius = '4px';
            notification.style.marginBottom = '15px';
            notification.style.fontSize = '0.9rem';
            notification.style.textAlign = 'center';
            notification.style.fontWeight = '500';
            
            // Insert before the form
            container.insertBefore(notification, form);
            
            // Remove the parameter from URL without reloading
            window.history.replaceState({}, document.title, window.location.pathname);
            
            // Fade out notification after 5 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 1s';
                setTimeout(() => {
                    notification.remove();
                }, 1000);
            }, 5000);
        }
    }
    
    // Call the notification function
    showLoginAttemptNotification();
});