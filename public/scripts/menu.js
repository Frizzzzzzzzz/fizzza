document.addEventListener('DOMContentLoaded', function() {
    const signInButton = document.querySelector('.sign-in-btn');
    const token = localStorage.getItem('authToken');
    
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            const payload = JSON.parse(atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')));
            
            let displayText = 'Профиль';
            if (payload.name && payload.surname) {
                displayText = `${payload.name} ${payload.surname}`;
            } else if (payload.email) {
                displayText = payload.email;
            }
            
            signInButton.textContent = displayText;
            signInButton.onclick = function() {
                alert(`Вы вошли как: ${displayText}`);
            };
        } catch (e) {
            console.error('Ошибка при разборе токена:', e);
            signInButton.textContent = 'Профиль';
            signInButton.onclick = function() {
                window.location.href = '/log.html';
            };
        }
    } else {
        signInButton.textContent = 'Войти';
        signInButton.onclick = function() {
            window.location.href = '/log.html';
        };
    }
});