document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeKey = 'themePreference';

    // Emojis for the button
    const lightIcon = '🌙'; // Icon shown in light mode (to switch to dark)
    const darkIcon = '☀️';  // Icon shown in dark mode (to switch to light)

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = darkIcon;
            localStorage.setItem(themeKey, 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = lightIcon;
            localStorage.setItem(themeKey, 'light');
        }
    };

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem(themeKey);

    // Check system preference if no saved theme
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let currentTheme = 'light'; // Default to light
    if (savedTheme) {
        currentTheme = savedTheme;
    } else if (prefersDark) {
        currentTheme = 'dark'; // Use system preference if available and no user choice
    }

    // Apply the initial theme
    applyTheme(currentTheme);

    // Add event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Optional: Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only change if user hasn't specifically chosen a theme via the button yet
        if (!localStorage.getItem(themeKey)) {
            const systemTheme = e.matches ? 'dark' : 'light';
            applyTheme(systemTheme); // Apply system theme, but don't save it override
            localStorage.removeItem(themeKey); // Ensure we only use system if no choice is stored
        }
    });
});
