const MotorJuego = {
    puntos: 0,
    rango: "Recluta",

    inicializar() {
        this.puntos = parseInt(localStorage.getItem('puntos_estrada')) || 0;
        this.actualizarUI();
        console.log("Motor de formación activado según Módulos DCERN.");
    },

    sumarPuntos(puntos) {
        this.puntos += puntos;
        this.actualizarRango();
        localStorage.setItem('puntos_estrada', this.puntos);
        this.actualizarUI();
    },

    actualizarRango() {
        // Rangos inspirados en la jerarquía del Ejército de Nicaragua
        if(this.puntos >= 2000) this.rango = "General de División";
        else if(this.puntos >= 1000) this.rango = "Sargento de Septentrión";
        else if(this.puntos >= 500) this.rango = "Soldado de la Patria";
    },

    actualizarUI() {
        const displayRango = document.getElementById('user-rank');
        const displayPuntos = document.getElementById('user-score');
        if(displayRango) displayRango.innerText = `Rango: ${this.rango}`;
        if(displayPuntos) displayPuntos.innerText = `${this.puntos} pts`;
    }
};

document.addEventListener('DOMContentLoaded', () => MotorJuego.inicializar());