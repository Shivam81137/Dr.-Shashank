const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
const currentYear = document.querySelector('#current-year');
const portrait = document.querySelector('[data-portrait]');
const portraitImage = document.querySelector('[data-portrait-image]');
const themeToggles = document.querySelectorAll('[data-theme-toggle]');
const root = document.documentElement;
const revealTargets = document.querySelectorAll('.page-hero, .section, .hero-card, .info-card, .service-card, .location-card');

const currentPage = document.body.dataset.page;

const THEME_KEY = 'dr-shashank-theme';

const getPreferredTheme = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return mediaQuery.matches ? 'dark' : 'light';
};

const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    themeToggles.forEach((toggle) => {
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggle.textContent = isDark ? '☀' : '◐';
    });
};

const initTheme = () => {
    let storedTheme = null;

    try {
        storedTheme = window.localStorage.getItem(THEME_KEY);
    } catch (error) {
        storedTheme = null;
    }

    const theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : getPreferredTheme();
    applyTheme(theme);
};

initTheme();

if (themeToggles.length > 0) {
    themeToggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || getPreferredTheme();
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            applyTheme(nextTheme);

            try {
                window.localStorage.setItem(THEME_KEY, nextTheme);
            } catch (error) {
                // Ignore storage errors and still keep in-session theme switching.
            }
        });
    });
}

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (currentPage && siteNav) {
    const activeLink = siteNav.querySelector(`[data-nav="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('is-active');
        activeLink.setAttribute('aria-current', 'page');
    }
}

if (portrait && portraitImage) {
    const fallbackSources = ['./IMAGES/images.jpg', './IMAGES/download%20(4).jfif'];
    let fallbackIndex = 0;

    const showPortrait = () => {
        portrait.classList.add('has-image');
    };

    const tryNextPortraitSource = () => {
        while (fallbackIndex < fallbackSources.length) {
            const nextSrc = fallbackSources[fallbackIndex++];
            if (portraitImage.getAttribute('src') !== nextSrc) {
                portraitImage.setAttribute('src', nextSrc);
                break;
            }
        }
    };

    portraitImage.addEventListener('load', showPortrait);
    portraitImage.addEventListener('error', tryNextPortraitSource);

    if (portraitImage.complete && portraitImage.naturalWidth > 0) {
        showPortrait();
    }
}

if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        siteNav.classList.toggle('is-open');
    });

    siteNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            siteNav.classList.remove('is-open');
        });
    });
}

if (revealTargets.length > 0) {
    const isBelowFold = (element) => element.getBoundingClientRect().top > window.innerHeight * 0.9;

    revealTargets.forEach((target, index) => {
        target.classList.add('reveal');
        target.classList.add(`reveal-delay-${Math.min(index % 3, 3)}`);

        if (isBelowFold(target)) {
            target.classList.add('is-pending');
        } else {
            target.classList.add('in-view');
        }
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove('is-pending');
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
        );

        revealTargets.forEach((target) => {
            if (target.classList.contains('is-pending')) {
                observer.observe(target);
            }
        });
    } else {
        revealTargets.forEach((target) => {
            target.classList.remove('is-pending');
            target.classList.add('in-view');
        });
    }
}
