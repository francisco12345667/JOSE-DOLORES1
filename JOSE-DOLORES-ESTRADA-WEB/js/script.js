document.addEventListener('DOMContentLoaded', () => {
    // Animaciones al hacer scroll (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('anim-heroica');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, section, article').forEach(el => {
        observer.observe(el);
    });

    console.log("Sistema Estrada-Web: Operativo para la formación patriótica.");
});