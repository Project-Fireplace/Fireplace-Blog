document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const footer = document.getElementById('site-footer'); // Get footer element
    const themeKey = 'themePreference';

    // --- Theme Toggle Logic ---
    const lightIcon = '🌙';
    const darkIcon = '☀️';

    const applyTheme = (theme) => {
        // Clear existing classes first to be safe
        body.classList.remove('dark-mode', 'light-mode');

        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = darkIcon;
            localStorage.setItem(themeKey, 'dark');
            // console.log("Applied Dark Theme"); // For debugging
        } else {
            // Assuming 'light' is the default if not 'dark'
            body.classList.add('light-mode'); // Optional: add light-mode class if needed
            themeToggle.textContent = lightIcon;
            localStorage.setItem(themeKey, 'light');
            // console.log("Applied Light Theme"); // For debugging
        }
    };

    // Check storage -> system preference -> default light
    const savedTheme = localStorage.getItem(themeKey);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    let currentTheme = 'light'; // Default

    if (savedTheme) {
        currentTheme = savedTheme;
        // console.log("Found saved theme:", currentTheme); // Debugging
    } else if (prefersDark) {
        currentTheme = 'dark';
        // console.log("Using system preference: dark"); // Debugging
    } else {
        // console.log("Defaulting to light theme"); // Debugging
    }

    // Apply the initial theme ON LOAD
    applyTheme(currentTheme);

    // Theme toggle button click listener
    themeToggle.addEventListener('click', () => {
        // Determine the NEW theme based on the CURRENT class
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Optional: Listen for system preference changes ONLY if no user choice saved
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(themeKey)) { // Only act if user hasn't set preference
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            // Don't save this system change to localStorage, let user choose explicitly
        }
    });


    // --- Footer Visibility Logic ---
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Pixels to scroll down before showing footer

    const handleFooterVisibility = () => {
        const currentScrollY = window.scrollY;

        // Show footer if scrolled down beyond threshold
        if (currentScrollY > scrollThreshold) {
            footer.classList.add('footer-visible');
        } else {
            // Hide footer if near the top
            footer.classList.remove('footer-visible');
        }
        lastScrollY = currentScrollY; // Update last scroll position
    };

    // Initial check in case page loads already scrolled
    handleFooterVisibility();

    // Add scroll event listener
    window.addEventListener('scroll', handleFooterVisibility, { passive: true }); // Use passive listener for performance

}); // End DOMContentLoaded
