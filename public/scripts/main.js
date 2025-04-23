document.addEventListener('DOMContentLoaded', function() {
    const signInButton = document.querySelector('.sign-in-btn');
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            
            if (payload.name && payload.surname) {
                signInButton.textContent = `${payload.name} ${payload.surname}`;
                
                signInButton.onclick = function() {
                    alert(`Вы вошли как: ${payload.name} ${payload.surname}`);
                };
            } else {
                signInButton.textContent = payload.email || 'Профиль';
            }
        } catch (e) {
            console.error('Ошибка при разборе токена:', e);
            signInButton.textContent = 'Профиль';
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const reviews = document.querySelectorAll('.reviews > .review-block-1');
    const backButton = document.querySelector('.arrow-review-back');
    const forwardButton = document.querySelector('.arrow-review-forward');
    let currentReviewIndex = 0;

    function updateReviews() {
        const isNarrowScreen = window.innerWidth < 600;
        reviews.forEach((review, index) => {
            if (isNarrowScreen) {
                review.style.display = (index === currentReviewIndex) ? 'block' : 'none';
            } else {
                review.style.display = (index === currentReviewIndex || index === (currentReviewIndex + 1) % reviews.length) ? 'block' : 'none';
            }
        });
    }

    backButton.addEventListener('click', function() {
        currentReviewIndex = (currentReviewIndex > 0) ? currentReviewIndex - 1 : reviews.length - 1;
        updateReviews();
    });

    forwardButton.addEventListener('click', function() {
        const isNarrowScreen = window.innerWidth < 600;
        currentReviewIndex = (currentReviewIndex < reviews.length - (isNarrowScreen ? 1 : 2)) ? currentReviewIndex + 1 : 0;
        updateReviews();
    });

    window.addEventListener('resize', updateReviews);

    updateReviews();
});