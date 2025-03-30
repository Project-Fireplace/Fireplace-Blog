document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const footer = document.getElementById('site-footer');
    const themeKey = 'themePreference'; // Key for localStorage

    // --- Theme Toggle Logic ---
    const lightIcon = '🌙';
    const darkIcon = '☀️';

    // Function to apply the chosen theme and save preference
    const applyTheme = (theme) => {
        // Remove existing theme classes to prevent conflicts
        body.classList.remove('dark-mode', 'light-mode'); // Remove both just in case

        if (theme === 'dark') {
            body.classList.add('dark-mode'); // Add dark mode class
            themeToggle.textContent = darkIcon; // Set button icon for dark mode
            localStorage.setItem(themeKey, 'dark'); // Save preference
            // console.log("Theme applied: dark"); // For debugging
        } else {
            // Default to light theme if 'theme' is not 'dark'
            // No specific class needed for light usually, absence of 'dark-mode' is enough
            body.classList.remove('dark-mode'); // Ensure dark mode is removed
            themeToggle.textContent = lightIcon; // Set button icon for light mode
            localStorage.setItem(themeKey, 'light'); // Save preference
            // console.log("Theme applied: light"); // For debugging
        }
    };

    // --- Initial Theme Load ---
    // 1. Check localStorage for a saved user preference
    const savedTheme = localStorage.getItem(themeKey);
    // 2. Check OS/browser preference if no user preference is saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    // 3. Determine the initial theme (saved > prefers > default light)
    let currentTheme = 'light'; // Default to light
    if (savedTheme) {
        currentTheme = savedTheme; // Use saved preference
        // console.log("Using saved theme:", currentTheme); // Debugging
    } else if (prefersDark) {
        currentTheme = 'dark'; // Use system preference
        // console.log("Using system preference: dark"); // Debugging
    } else {
        // console.log("Defaulting to light theme"); // Debugging
    }

    // Apply the determined theme when the page loads
    applyTheme(currentTheme);

    // --- Event Listeners ---
    // Toggle theme when the button is clicked
    themeToggle.addEventListener('click', () => {
        // Check current theme based on body class, then switch to the opposite
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Optional: Listen for changes in OS/browser theme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only update if the user hasn't explicitly set a theme via the button
        if (!localStorage.getItem(themeKey)) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme);
            // Do not save this system change to localStorage, respect explicit user choice
        }
    });


    // --- Footer Visibility Logic ---
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Show footer after scrolling down this many pixels

    const handleFooterVisibility = () => {
        if (!footer) return; // Safety check if footer element isn't found

        const currentScrollY = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;

        // Show footer if scrolled down more than threshold OR if near the bottom
        if (currentScrollY > scrollThreshold || (currentScrollY + viewportHeight >= pageHeight - 10)) { // Added check for near bottom
             footer.classList.add('footer-visible');
        } else {
             footer.classList.remove('footer-visible');
        }
        lastScrollY = currentScrollY;
    };

    // Check visibility on initial load and on scroll
    handleFooterVisibility();
    window.addEventListener('scroll', handleFooterVisibility, { passive: true });

}); // End DOMContentLoaded
