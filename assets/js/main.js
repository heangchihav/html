document.addEventListener('DOMContentLoaded', () => {
    // Load header and sidebar
    loadComponent('header');
    loadComponent('sidebar');

    // Set up default content
    loadPage('home');

    // Set up event listeners for navigation
    document.addEventListener('click', (event) => {
        if (event.target.matches('[data-nav]')) {
            const page = event.target.getAttribute('data-nav');
            loadPage(page);
        }
    });
});

function loadComponent(name) {
    fetch(`components/${name}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById(name).innerHTML = html;
        })
        .catch(err => console.error(`Error loading ${name}:`, err));
}

function loadPage(page) {
    fetch(`pages/${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(err => console.error('Error loading page:', err));
}
