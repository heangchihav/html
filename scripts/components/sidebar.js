function handleSubpageClick(event) {
    if (event.target.tagName === 'A' && event.target.dataset.subpage) {
        event.preventDefault();
        const url = `pages/home/${event.target.dataset.subpage}.html`;
        loadSubpage(url);
    }
}

function loadSubpage(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('home-content').innerHTML = data;
        })
        .catch(error => {
            document.getElementById('home-content').innerHTML = `<p>Failed to load content: ${error.message}</p>`;
        });
}
