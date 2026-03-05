const IACore = {
    // La memoria ahora guardará los patrones matemáticos ya procesados
    baseConocimiento: [],
    entrenado: false, // Escudo de seguridad por si falla la lectura

    // 1. FUNCIÓN DE APRENDIZAJE OPTIMIZADO
    async entrenarIA() {
        try {
            console.log("🧠 IA iniciando... Estableciendo enlace con referencias.html...");
            
            const respuesta = await fetch('referencias.html');
            if (!respuesta.ok) throw new Error("No se pudo contactar al servidor de referencias.");
            
            const html = await respuesta.text();
            const parser = new DOMParser();
            const docVirtual = parser.parseFromString(html, 'text/html');
            
            const datosEncontrados = docVirtual.querySelectorAll('.dato-ia');
            
            if (datosEncontrados.length === 0) {
                console.warn("⚠️ Advertencia: No se encontraron datos con la clase '.dato-ia'.");
            }

            // Limpiamos memoria
            this.baseConocimiento = [];

            datosEncontrados.forEach(dato => {
                // OPTIMIZACIÓN 1: Limpieza profunda de las claves desde el inicio
                const palabrasClave = dato.getAttribute('data-claves')
                                          .split(',')
                                          .map(clave => clave.trim().toLowerCase()) // Quita espacios accidentales
                                          .filter(clave => clave.length > 0); // Evita claves vacías
                
                const textoRespuesta = dato.innerText.trim();
                
                // OPTIMIZACIÓN 2: Precompilación de la Regex
                // Armamos la regla matemática UNA sola vez aquí, no cada vez que el usuario pregunta
                if (palabrasClave.length > 0) {
                    const patronCompilado = new RegExp('\\b(' + palabrasClave.join('|') + ')\\b', 'i');
                    
                    this.baseConocimiento.push({
                        patron: patronCompilado,
                        respuesta: textoRespuesta
                    });
                }
            });

            this.entrenado = true;
            console.log(`✅ IA Entrenada Ultrarrápida. ${this.baseConocimiento.length} conceptos en caché.`);
        } catch (error) {
            console.error("❌ Error Crítico: La IA no pudo leer la base de datos histórica.", error);
            this.entrenado = false;
        }
    },

    // 2. MOTOR DE PROCESAMIENTO DE ALTO RENDIMIENTO
    async procesarMensaje(mensaje) {
        // Escudo: Si falló el entrenamiento, avisa elegantemente
        if (!this.entrenado) {
            return "Mis disculpas, patriota. Mis registros históricos están inaccesibles. Verifique la conexión con el Cuartel General.";
        }

        // Limpieza de texto (borra tildes y signos)
        let m = mensaje.toLowerCase()
                       .normalize("NFD")
                       .replace(/[\u0300-\u036f]/g, "")
                       .replace(/[^a-z0-9\s]/g, "")
                       .trim();
                       
        console.log("🗣️ Analizando intención: ->", m);

        let respuestaFinal = "Interesante pregunta, compatriota. Te sugiero revisar las referencias oficiales, o puedes preguntarme sobre San Jacinto o Andrés Castro.";

        // Búsqueda a la velocidad de la luz (usa los patrones ya precompilados)
        for (let regla of this.baseConocimiento) {
            if (regla.patron.test(m)) {
                respuestaFinal = regla.respuesta;
                break; // Disparo certero, detenemos la búsqueda
            }
        }

        // OPTIMIZACIÓN 3: Límite de tiempo
        // Tarda 15ms por letra, pero NUNCA más de 3.5 segundos en total.
        let tiempoEscritura = Math.min(Math.max(1000, respuestaFinal.length * 15), 3500);

        return new Promise((resolve) => {
            setTimeout(() => { resolve(respuestaFinal); }, tiempoEscritura); 
        });
    }
};

// ¡Ordenamos a la IA que lea el libro apenas cargue la página!
document.addEventListener('DOMContentLoaded', () => {
    IACore.entrenarIA();
});