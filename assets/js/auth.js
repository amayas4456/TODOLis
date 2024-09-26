// Gestion de la connexion/inscription avec LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    let users = JSON.parse(localStorage.getItem('users')) || [];

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            alert('Connexion réussie!');
            window.location.href = 'tasks.html'; // Redirige vers la page des tâches
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    });

    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        if (username && password) {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Inscription réussie!');
        } else {
            alert('Veuillez remplir tous les champs.');
        }
    });
});
