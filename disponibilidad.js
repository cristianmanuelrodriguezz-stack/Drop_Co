/**
 * Script para gestionar la visibilidad y marcado de disponibilidad de productos.
 * Lee el atributo `data-disponible` ("true" o "false") de cada tarjeta (.producto-card)
 * e inserta dinámicamente la etiqueta (badge) correspondiente.
 */
document.addEventListener('DOMContentLoaded', () => {
    const productos = document.querySelectorAll('.producto-card');

    productos.forEach(card => {
        // Evalúa si el producto está disponible
        const esDisponible = card.getAttribute('data-disponible') === 'true';
        
        // Crea el elemento visual del badge
        const badge = document.createElement('span');
        badge.className = `badge-disponibilidad ${esDisponible ? 'badge-disponible' : 'badge-nodisponible'}`;
        badge.innerText = esDisponible ? 'Disponible' : 'No disponible';

        // Inserta el badge en el contenedor de la imagen
        const imgWrapper = card.querySelector('.producto-img-wrapper');
        if (imgWrapper) {
            imgWrapper.appendChild(badge);
        }
    });
});