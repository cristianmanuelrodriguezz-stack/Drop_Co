/**
 * destacados.js
 * Módulo independiente para cargar y renderizar productos destacados aleatorios.
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductosDestacados();
});

/**
 * Función principal para obtener y mostrar productos destacados de forma aleatoria
 * @param {number} cantidad - Número de productos a mostrar en el destacados (por defecto 4)
 */
function inicializarProductosDestacados(cantidad = 4) {
    const contenedorDestacados = document.getElementById('grid-destacados');
    if (!contenedorDestacados) return;

    // Obtener todas las tarjetas de productos presentes en las secciones/tiendas de la página
    const tarjetasTodas = Array.from(document.querySelectorAll('.tienda-contenido .producto-card'));
    
    // Filtrar únicamente aquellos productos que están disponibles (data-disponible="true")
    const disponibles = tarjetasTodas.filter(card => card.getAttribute('data-disponible') === 'true');

    if (disponibles.length === 0) {
        contenedorDestacados.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b;">No hay productos destacados disponibles en este momento.</p>';
        return;
    }

    // Mezclar la lista de productos disponibles (Algoritmo Fisher-Yates)
    const seleccionados = mezclarArreglo([...disponibles]).slice(0, cantidad);

    // Limpiar el contenedor de destacados
    contenedorDestacados.innerHTML = '';

    // Clonar e insertar los productos seleccionados en el contenedor de destacados
    seleccionados.forEach(cardOriginal => {
        const clonCard = cardOriginal.cloneNode(true);

        // Si la tarjeta clonada es un medicamento, aseguramos que su evento click abra el prospecto o acción correspondiente
        if (clonCard.classList.contains('card-medicamento')) {
            const idMedicamento = clonCard.getAttribute('data-id');
            if (idMedicamento) {
                clonCard.onclick = () => {
                    if (typeof abrirProspecto === 'function') {
                        abrirProspecto(idMedicamento);
                    }
                };
            }
        }

        contenedorDestacados.appendChild(clonCard);
    });
}

/**
 * Función auxiliar para mezclar un array de forma aleatoria
 */
function mezclarArreglo(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}