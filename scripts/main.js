document.addEventListener('DOMContentLoaded', () => {
    const contentContainer = document.getElementById('content');

    function loadPage(url, isSubpage = false) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                if (isSubpage) {
                    document.getElementById('home-content').innerHTML = data;
                } else {
                    contentContainer.innerHTML = data;

                    // If it's the home page, load the sidebar
                    if (url.includes('home.html')) {
                        fetch('/components/sidebar.html')
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.text();
                            })
                            .then(sidebarData => {
                                const sidebarContainer = document.createElement('div');
                                sidebarContainer.id = 'sidebar';
                                sidebarContainer.innerHTML = sidebarData;
                                contentContainer.appendChild(sidebarContainer);
                                document.getElementById('sidebar').addEventListener('click', handleSubpageClick);
                            });
                    }
                }
            })
            .catch(error => {
                contentContainer.innerHTML = `<p>Failed to load content: ${error.message}</p>`;
            });
    }

    // Load the default page
    loadPage('pages/home.html');

    // Set up navigation for navbar
    document.getElementById('navbar').addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const url = event.target.getAttribute('href');
            loadPage(url);
        }
    });
});
