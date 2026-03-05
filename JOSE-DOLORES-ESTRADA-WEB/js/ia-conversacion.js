document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('ia-mensajes');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    const enviarMensaje = async () => {
        const texto = userInput.value.trim();
        if (!texto) return; // Si está vacío, no hace nada

        // 1. Dibuja el mensaje del USUARIO
        chatWindow.innerHTML += `
            <div class="message user-message">
                <div class="message-content">
                    <p>${texto}</p>
                </div>
            </div>
        `;
        
        // Limpiamos y bloqueamos el input
        userInput.value = '';
        userInput.disabled = true;
        sendBtn.disabled = true;
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // 2. Dibuja el indicador de "ESCRIBIENDO" de la IA
        const idTemporal = "typing-" + Date.now();
        chatWindow.innerHTML += `
            <div id="${idTemporal}" class="message ia-message">
                <div class="message-content" style="background-color: #e9ecef; color: #6c757d; font-style: italic; border-left: 4px solid #6c757d;">
                    <p>El General está redactando su respuesta...</p>
                </div>
            </div>
        `;
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // 3. Pide la respuesta al "Cerebro"
        const respuesta = await IACore.procesarMensaje(texto);

        // 4. Borra el indicador de "Escribiendo" y pone el texto REAL
        document.getElementById(idTemporal).remove();
        chatWindow.innerHTML += `
            <div class="message ia-message">
                <div class="message-content">
                    <strong>General Estrada:</strong>
                    <p>${respuesta}</p>
                </div>
            </div>
        `;
        
        // 5. Reproduce la voz y desbloquea todo
        if (typeof IAVoz !== 'undefined' && IAVoz.speak) {
            IAVoz.speak(respuesta);
        }
        
        userInput.disabled = false;
        sendBtn.disabled = false;
        userInput.focus();
        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    // Escuchar el clic en el botón Enviar
    sendBtn?.addEventListener('click', enviarMensaje);

    // Escuchar la tecla ENTER en el teclado
    userInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') enviarMensaje();
    });
});