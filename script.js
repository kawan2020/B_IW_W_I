document.addEventListener("DOMContentLoaded", () => {
    // Fetch the text data file directly from the repository
    fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not find data.json file");
            }
            return response.json();
        })
        .then(data => {
            // Map text dynamically into our layout positions
            document.getElementById('banner-title').innerHTML = data.bannerTitle.replace(/\n/g, '<br>');
            document.getElementById('header-1').innerHTML = data.header1.replace(/\n/g, '<br>');
            document.getElementById('description-1').innerHTML = data.description1.replace(/\n/g, '<br>');
            document.getElementById('header-2').innerHTML = data.header2.replace(/\n/g, '<br>');
            document.getElementById('description-2').innerHTML = data.description2.replace(/\n/g, '<br>');
            document.getElementById('header-3').innerHTML = data.header3.replace(/\n/g, '<br>');
        })
        .catch(error => {
            console.error("Error rendering text fields:", error);
            // Fallback display message
            ['banner-title', 'header-1', 'description-1', 'header-2', 'description-2', 'header-3'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = "Error displaying content";
            });
        });
});
