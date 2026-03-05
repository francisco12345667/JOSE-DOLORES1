const IAVoz = {
    speak: (texto) => {
        // Limpiar el texto de etiquetas HTML (como el <strong>) antes de hablar
        const textoLimpio = texto.replace(/<[^>]*>?/gm, ''); 
        
        window.speechSynthesis.cancel(); // Detener si estaba hablando
        const utterance = new SpeechSynthesisUtterance(textoLimpio);
        
        // Buscar una voz en español
        const voces = window.speechSynthesis.getVoices();
        const vozEsp = voces.find(v => v.lang.includes('es-NI')) || 
                       voces.find(v => v.lang.includes('es-ES') || v.lang.includes('es-MX'));
        
        if (vozEsp) utterance.voice = vozEsp;
        utterance.rate = 0.9; // Tono ligeramente más lento para sonar solemne
        utterance.pitch = 0.8; 
        
        window.speechSynthesis.speak(utterance);
    }
};
// Cargar voces en Chrome
window.speechSynthesis.onvoiceschanged = () => {};