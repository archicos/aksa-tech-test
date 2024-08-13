document.addEventListener('DOMContentLoaded', function() {
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const loginForm = document.getElementById('loginForm');

    const validUsername = 'admin';
    const validPassword = 'admin';

    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = '../home/index.html';
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameField.value;
        const password = passwordField.value;

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('username', username);
            window.location.href = '../home/index.html';
        } else {
            alert('Invalid credentials');
        }
    });
});
