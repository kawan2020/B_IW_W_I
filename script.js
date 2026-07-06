document.addEventListener("DOMContentLoaded", () => {
    fetch('data/data.json')
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.json();
        })
        .then(data => {
            // This reads the raw values securely without crashing over case mismatches
            const getVal = (val) => val ? String(val).replace(/\n/g, '<br>') : '';

            document.getElementById('banner-title').innerHTML = getVal(data.bannerTitle || data.bannertitle);
            document.getElementById('header-1').innerHTML = getVal(data.header1);
            document.getElementById('description-1').innerHTML = getVal(data.description1);
            document.getElementById('header-2').innerHTML = getVal(data.header2);
            document.getElementById('description-2').innerHTML = getVal(data.description2);
            document.getElementById('header-3').innerHTML = getVal(data.header3);
        })
        .catch(error => {
            console.error("Text injection error:", error);
            ['banner-title', 'header-1', 'description-1', 'header-2', 'description-2', 'header-3'].forEach(id => {
                const element = document.getElementById(id);
                if (element) element.textContent = "Data connection error";
            });
        });
});
