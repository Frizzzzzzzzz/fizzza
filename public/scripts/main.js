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