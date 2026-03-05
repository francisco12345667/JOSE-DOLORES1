/**
 * Motor del Juego - San Jacinto Challenge
 */
const JuegoMotor = {
    puntos: 0,
    nivelActual: 0,
    datos: null,

    async init() {
        // Cargar datos de la carpeta /juego/
        const resNiveles = await fetch('juego/niveles.json');
        const resPreguntas = await fetch('juego/preguntas.json');
        this.datos = {
            niveles: (await resNiveles.json()).niveles,
            preguntas: (await resPreguntas.json()).banco_preguntas
        };
        this.renderMenu();
    },

    renderMenu() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = `
            <h3>Selecciona tu Misión</h3>
            <div class="niveles-grid">
                ${this.datos.niveles.map(n => `
                    <button onclick="JuegoMotor.cargarNivel(${n.id})" class="btn-nivel">
                        ${n.titulo}
                    </button>
                `).join('')}
            </div>
        `;
    },

    cargarNivel(id) {
        const nivel = this.datos.niveles.find(n => n.id === id);
        const pregunta = this.datos.preguntas[id - 1]; // Simplificado por ID
        
        document.getElementById('game-status').innerText = `Misión: ${nivel.titulo}`;
        const container = document.getElementById('quiz-container');
        
        container.innerHTML = `
            <div class="pregunta-box anim-heroica">
                <p>${pregunta.pregunta}</p>
                <div class="opciones-grid">
                    ${pregunta.opciones.map((opt, i) => `
                        <button onclick="JuegoMotor.verificar(${i}, ${pregunta.correcta})" class="opt-btn">
                            ${opt}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    },

    verificar(seleccion, correcta) {
        if(seleccion === correcta) {
            this.puntos += 500;
            alert("¡Victoria Táctica! El General Estrada está orgulloso.");
            this.renderMenu();
        } else {
            alert("Estrategia fallida. Revisa la sección de Biografía y Referencias.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => JuegoMotor.init());