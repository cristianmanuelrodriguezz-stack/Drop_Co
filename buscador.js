document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.getElementById('input-busqueda');
    const btnBuscar = document.getElementById('btn-buscar');
    const sugerenciasBox = document.getElementById('sugerencias-box');

    function realizarBusqueda() {
        const query = inputBusqueda ? inputBusqueda.value.toLowerCase().trim() : '';
        if (!query) {
            if (sugerenciasBox) sugerenciasBox.style.display = 'none';
            return;
        }

        const tarjetas = document.querySelectorAll('#tiendas .producto-card');
        let coincidencias = [];

        tarjetas.forEach(card => {
            const nombre = (card.getAttribute('data-nombre') || '').toLowerCase();
            const tags = (card.getAttribute('data-tags') || '').toLowerCase();
            const categoria = card.getAttribute('data-categoria') || '';
            const precio = card.querySelector('.producto-precio')?.innerText || '';

            if (nombre.includes(query) || tags.includes(query)) {
                coincidencias.push({ card, nombre: card.getAttribute('data-nombre'), categoria, precio });
            }
        });

        if (sugerenciasBox) {
            sugerenciasBox.innerHTML = '';
            if (coincidencias.length > 0) {
                coincidencias.slice(0, 6).forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'sugerencia-item';
                    div.innerHTML = `
                        <div class="sugerencia-info">
                            <span class="sugerencia-titulo">${item.nombre}</span>
                            <span class="sugerencia-cat">${item.categoria}</span>
                        </div>
                        <span class="sugerencia-precio">${item.precio}</span>
                    `;
                    div.addEventListener('click', () => {
                        sugerenciasBox.style.display = 'none';

                        // Activar la pestaña de la tienda correspondiente
                        const tiendaContenedor = item.card.closest('.tienda-contenido');
                        if (tiendaContenedor) {
                            const idTienda = tiendaContenedor.id;
                            const tabBtn = document.querySelector(`button[onclick*="${idTienda}"]`);
                            if (tabBtn) tabBtn.click();
                        }

                        // Desplazar suavemente hasta el producto e iluminarlo
                        item.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        item.card.style.transition = 'box-shadow 0.3s, border 0.3s';
                        item.card.style.borderColor = '#2563eb';
                        item.card.style.boxShadow = '0 0 15px rgba(37, 99, 235, 0.4)';
                        setTimeout(() => {
                            item.card.style.borderColor = '#e2e8f0';
                            item.card.style.boxShadow = 'none';
                        }, 2500);
                    });
                    sugerenciasBox.appendChild(div);
                });
                sugerenciasBox.style.display = 'block';
            } else {
                sugerenciasBox.innerHTML = '<div style="padding:1rem; text-align:center; color:#64748b;">No se encontraron productos coincidentes.</div>';
                sugerenciasBox.style.display = 'block';
            }
        }
    }

    if (inputBusqueda) inputBusqueda.addEventListener('input', realizarBusqueda);
    if (btnBuscar) btnBuscar.addEventListener('click', realizarBusqueda);

    document.addEventListener('click', (e) => {
        if (sugerenciasBox && !e.target.closest('.buscador-container')) {
            sugerenciasBox.style.display = 'none';
        }
    });
});