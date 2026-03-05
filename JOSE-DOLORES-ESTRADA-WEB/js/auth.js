const Auth = {
    login: (user, pass) => {
        if(user && pass) {
            localStorage.setItem('user_estrada', JSON.stringify({nombre: user, rango: "Soldado"}));
            localStorage.setItem('token_estrada', 'hero-1856');
            return true;
        }
        return false;
    },
    logout: () => {
        localStorage.clear();
        window.location.href = 'login.html';
    }
};