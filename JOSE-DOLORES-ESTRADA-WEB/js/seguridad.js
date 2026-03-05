const Seguridad = {
    sanitizarHTML: (str) => {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },
    validarSesion: () => {
        return localStorage.getItem('token_estrada') !== null;
    }
};