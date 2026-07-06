document.addEventListener("DOMContentLoaded", () => {
    // Exact path to wording document inside data folder
    const excelFilePath = 'data/wording.xlsx';

    fetch(excelFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load Excel file: ${response.statusText}`);
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
            
            // Access target worksheet (assumes the primary first worksheet)
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // List of target elements mapped directly to your requested cell addresses
            const elementsToPopulate = [
                { id: 'banner-title', cell: 'B4' },
                { id: 'header-1', cell: 'B6' },
                { id: 'description-1', cell: 'B8' },
                { id: 'header-2', cell: 'B10' },
                { id: 'description-2', cell: 'B12' },
                { id: 'header-3', cell: 'B14' }
            ];

            // Dynamically query workbook data and update inner html content
            elementsToPopulate.forEach(item => {
                const targetElement = document.getElementById(item.id);
                if (targetElement && worksheet[item.cell]) {
                    // .v extracts raw value, replacing newline characters with html breaks for presentation
                    const cellValue = worksheet[item.cell].v;
                    targetElement.innerHTML = String(cellValue).replace(/\n/g, '<br>');
                } else if (targetElement) {
                    targetElement.textContent = ""; // Clear fallback if cell is blank
                }
            });
        })
        .catch(error => {
            console.error("Error parsing spreadsheet file content:", error);
            // Fallback strategy if parsing environment encounters a localized block
            document.querySelectorAll('[data-cell]').forEach(el => {
                el.textContent = "Error loading content";
            });
        });
});
