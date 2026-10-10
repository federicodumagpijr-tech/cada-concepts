document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic with ARIA Accessibility Sync
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            toggleBtn.setAttribute('aria-expanded', !isHidden);
        });
    }

    // 2. Portfolio Category Filtering Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active tab states & ARIA selection
                filterBtns.forEach(b => {
                    b.classList.remove('active', 'border-cada-dark', 'text-cada-dark');
                    b.classList.add('border-transparent', 'text-cada-charcoal/60');
                    b.setAttribute('aria-selected', 'false');
                });

                btn.classList.add('active', 'border-cada-dark', 'text-cada-dark');
                btn.classList.remove('border-transparent', 'text-cada-charcoal/60');
                btn.setAttribute('aria-selected', 'true');

                // Filter gallery cards
                const filter = btn.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});

// 3. Portfolio Modal Lightbox Global Helper Functions
window.openModal = function (imgSrc, title, category) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');

    if (!modal) return;

    if (modalImg) {
        modalImg.src = imgSrc;
        modalImg.alt = `${title} - ${category}`;
    }
    if (modalTitle) {
        modalTitle.textContent = title;
    }
    if (modalCategory) {
        modalCategory.textContent = category;
    }

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
};

window.closeModal = function () {
    const modal = document.getElementById('image-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
    }
};

// Keyboard listener to close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closeModal();
    }
});
