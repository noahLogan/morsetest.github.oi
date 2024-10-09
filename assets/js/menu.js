function toggleMenu() {
    const menuIcon = document.getElementById('menu-icon');
    const menu = document.getElementById('menu');
    
    // Cambia entre la clase "change" para el ícono y "open" para el menú
    menuIcon.classList.toggle('change');
    menu.classList.toggle('open');
  }