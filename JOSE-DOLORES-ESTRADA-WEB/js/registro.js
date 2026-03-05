// login.js
document.getElementById('login-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = e.target[0].value;
    if(Auth.login(user, '****')) window.location.href = 'perfil.html';
});