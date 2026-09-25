// Case Study Slide-Out Drawer Controller
document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('case-study-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const closeBtn = document.getElementById('drawer-close-btn');
    const closeFooterBtn = document.getElementById('drawer-close-footer-btn');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerTag = document.getElementById('drawer-tag');
    const drawerBody = document.getElementById('drawer-body');
    const triggerCards = document.querySelectorAll('[data-case-study]');

    if (!drawer) return;

    const caseStudyData = {
        'containerization': {
            title: 'End to End Containerization for Modern Robots',
            tag: 'Automated Logistics & Hardware Handshake',
            hash: 'case-study-containerization',
            templateId: 'content-containerization'
        },
        'first-time-robotics': {
            title: 'The First-Time Approach to Robotics: Zero-to-One Automation',
            tag: 'Enterprise Automation Strategy & AMR Architecture',
            hash: 'case-study-first-time-robotics',
            templateId: 'content-first-time-robotics'
        },
        'software-strategy': {
            title: 'Software Strategy for Unlocking Hardware',
            tag: 'Distributed Orchestration & Real-Time Control',
            hash: 'case-study-software-strategy',
            templateId: 'content-software-strategy'
        },
        'pharma-manufacturing': {
            title: 'Pharmaceutical Manufacturing and Data Capturing',
            tag: 'Regulated Manufacturing & High-Fidelity Telemetry',
            hash: 'case-study-pharma-manufacturing',
            templateId: 'content-pharma-manufacturing'
        }
    };

    function openDrawer(caseKey, updateHash = true) {
        const data = caseStudyData[caseKey];
        if (!data) return;

        const template = document.getElementById(data.templateId);
        if (!template) return;

        drawerTitle.textContent = data.title;
        drawerTag.textContent = data.tag;
        drawerBody.innerHTML = template.innerHTML;

        drawer.classList.add('is-active');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('drawer-open');

        if (updateHash) {
            history.replaceState(null, '', `#${data.hash}`);
        }
    }

    function closeDrawer() {
        drawer.classList.remove('is-active');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('drawer-open');
        
        // Remove hash without scrolling
        if (window.location.hash.startsWith('#case-study-')) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
        }
    }

    // Attach trigger listeners
    triggerCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const caseKey = card.getAttribute('data-case-study');
            openDrawer(caseKey);
        });
    });

    // Close listeners
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (closeFooterBtn) closeFooterBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Escape key listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-active')) {
            closeDrawer();
        }
    });

    // Handle deep-linking via URL hash on load
    function checkHash() {
        const hash = window.location.hash.replace('#', '');
        for (const [key, val] of Object.entries(caseStudyData)) {
            if (val.hash === hash) {
                openDrawer(key, false);
                break;
            }
        }
    }

    checkHash();
    window.addEventListener('hashchange', checkHash);
});
