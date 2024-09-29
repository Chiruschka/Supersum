        // Fetch the skills and categories from the JSON file
        fetch('skills.json')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('skills-table-body');
                
                // Prepare arrays for each category to align skills in columns
                const categories = {
                    "Mental Resistances": [],
                    "Mental Fortitude": [],
                    "Mental Strengthening": [],
                    "Mental Recovery": [],
                    "Mental Manipulation (General, Non-Magical Mind Attacks)": []
                };

                // Populate the categories with skills from the JSON file
                let currentCategory = null;
                data.forEach(item => {
                    if (item.main_name) {
                        currentCategory = item.main_name;
                    } else if (item.name && categories[currentCategory]) {
                        categories[currentCategory].push(item.name);
                    }
                });

                // Calculate the maximum number of rows needed for the table
                const maxRows = Math.max(...Object.values(categories).map(arr => arr.length));

                // Generate the table rows
                for (let i = 0; i < maxRows; i++) {
                    const row = document.createElement('tr');
                    Object.keys(categories).forEach(category => {
                        const cell = document.createElement('td');
                        cell.textContent = categories[category][i] || '';  // Fill the empty cell if no skill exists
                        row.appendChild(cell);
                    });
                    tableBody.appendChild(row);
                }
            })
            .catch(error => console.error('Error fetching skills:', error));