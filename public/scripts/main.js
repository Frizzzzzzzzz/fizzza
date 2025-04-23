
document.addEventListener('DOMContentLoaded', function() {
    const signInButton = document.querySelector('.sign-in-btn');
    const token = localStorage.getItem('authToken');
    if (token) {
        signInButton.textContent = '1';
        signInButton.onclick = function() {
            alert('Вы вошли в систему!');
        };
    }
});