document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.reg-signin-btn').addEventListener('click', async () => {
        const email = document.querySelector('.reg-mail-textarea').value;
        const password = document.querySelector('.reg-password-textarea').value;
      
        if (!email || !password) {
            alert('Заполните все поля!');
            return;
        }
      
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
          
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Ошибка регистрации');
            }
            
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                alert('Регистрация и вход выполнены успешно!');
                window.location.href = '/main.html';
            } else {
                throw new Error('Токен не получен');
            }
            
        } catch (error) {
            console.error('Ошибка:', error);
            alert(error.message);
        }
    });
});