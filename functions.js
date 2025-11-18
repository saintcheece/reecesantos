// make it global so onclick="sendContactEmail(event)" can call it
window.sendContactEmail = function (e) {
    e = e || window.event;
    // If called from a submit button's onclick, we still want to prevent form submit
    if (e.preventDefault) e.preventDefault();

    const textarea = document.getElementById('contact-email-body');
    const message = textarea ? textarea.value || '' : '';

    if (message.trim().length === 0) {
        textarea.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-8px)' },
            { transform: 'translateX(8px)' },
            { transform: 'translateX(-6px)' },
            { transform: 'translateX(6px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 500,
            easing: 'ease-in-out'
        });
        textarea.focus();
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=reecesantos33@gmail.com&su=[WEB PORTFOLIO] Inquiry from Portfolio Website&body=${encodedMessage}`;
    window.open(mailtoLink, '_blank');
};

window.jumpToSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// state for the to-top button so it persists between calls
let __toTopState = {
    isVisible: false,
    hideTimeoutId: null,
    suppressShow: false
};

window.handleScrollToTop = function () {
    const toTopButton = document.querySelector('.to-top');
    if (!toTopButton) return;

    const viewportHeight = window.innerHeight;
    const threshold = viewportHeight * 0.2;

    // ensure we only attach one listener
    if (window.__toTopListenerAttached) return;
    window.__toTopListenerAttached = true;

    window.addEventListener('scroll', () => {
        const shouldBeVisible = window.scrollY > threshold;

        // while scroll-to-top programmatically running, allow hides but prevent shows
        if (shouldBeVisible && !__toTopState.isVisible && !__toTopState.suppressShow) {
            // cancel any scheduled hide
            if (__toTopState.hideTimeoutId) {
                clearTimeout(__toTopState.hideTimeoutId);
                __toTopState.hideTimeoutId = null;
            }

            __toTopState.isVisible = true;

            // set initial visual state to avoid a flash before the animation starts
            toTopButton.style.display = 'block';
            toTopButton.style.opacity = '0';
            toTopButton.style.transform = 'translateY(20px)';

            // allow the browser to apply the initial styles, then run the animation
            requestAnimationFrame(() => {
                toTopButton.animate([
                    { transform: 'translateY(20px)', opacity: 0 },
                    { transform: 'translateY(0)', opacity: 1 }
                ], {
                    duration: 300,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
                // also set final inline styles so it stays put after animation
                toTopButton.style.opacity = '1';
                toTopButton.style.transform = 'translateY(0)';
            });
        } else if (!shouldBeVisible && __toTopState.isVisible) {
            __toTopState.isVisible = false;

            // animate out
            const anim = toTopButton.animate([
                { transform: 'translateY(0)', opacity: 1 },
                { transform: 'translateY(20px)', opacity: 0 }
            ], {
                duration: 300,
                easing: 'ease-in',
                fill: 'forwards'
            });

            // ensure we remove display after animation completes; track timeout so it can be canceled if needed
            if (__toTopState.hideTimeoutId) clearTimeout(__toTopState.hideTimeoutId);
            __toTopState.hideTimeoutId = setTimeout(() => {
                toTopButton.style.display = 'none';
                // reset inline styles that might interfere later
                toTopButton.style.opacity = '';
                toTopButton.style.transform = '';
                __toTopState.hideTimeoutId = null;
            }, 300);
        }
    });
};

window.scrollToTop = function () {
    // while we auto-scroll, suppress showing the button to avoid the mid-scroll flash
    __toTopState.suppressShow = true;

    // run a little visual "click" animation on the button itself if present
    const toTopButton = document.querySelector('.to-top');
    if (toTopButton) {
        toTopButton.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(10px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: 100,
            easing: 'ease-in-out'
        });
    }

    // perform the smooth scroll
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // re-enable show behavior after a short delay (give smooth scroll time to finish)
    // 700ms is a reasonable default; adjust if your smooth-scrolling takes longer
    setTimeout(() => {
        __toTopState.suppressShow = false;
        // trigger one manual scroll-check in case state changed during suppression
        const evt = new Event('scroll');
        window.dispatchEvent(evt);
    }, 700);
};