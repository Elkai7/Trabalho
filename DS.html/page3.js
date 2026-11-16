
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Menu responsivo para telas menores.
menuToggle.addEventListener('click', () => {

    const opened = navLinks.classList.toggle('open');

    menuToggle.setAttribute(
        'aria-expanded',
        String(opened)
    );

    menuToggle.setAttribute(
        'aria-label',
        opened ? 'Fechar menu' : 'Abrir menu'
    );

});

// Fecha o menu depois que o usuário escolhe uma seção.
navLinks.querySelectorAll('a').forEach((link) => {

    link.addEventListener('click', () => {

        navLinks.classList.remove('open');

        menuToggle.setAttribute(
            'aria-expanded',
            'false'
        );

        menuToggle.setAttribute(
            'aria-label',
            'Abrir menu'
        );

    });

});
