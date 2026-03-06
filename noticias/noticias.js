document.addEventListener('DOMContentLoaded', () => {
    
    const menu = document.getElementById('menu-noticias');
    const btnAbrir = document.getElementById('abrir-noticias');
    const btnCerrar = document.getElementById('cerrar-noticias');

    
    if (btnAbrir) {
        btnAbrir.addEventListener('click', () => {
            menu.style.display = 'block'; 
        });
    }

  
    if (btnCerrar) {
        btnCerrar.addEventListener('click', () => {
            menu.style.display = 'none';
        });
    }
});
