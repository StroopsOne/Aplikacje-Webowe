// Pobranie danych
async function fetchData() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products.slice(0, 30);
}


function renderTable(data) {
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = "";

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    thead.innerHTML = `
        <tr>
            <th>Zdjęcie</th>
            <th>Tytuł</th>
            <th>Opis</th>
        </tr>
    `;


    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${item.thumbnail}" alt="Product Image"></td>
            <td>${item.title}</td>
            <td>${item.description}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);
}

//filtrowanie
function filterData(data, query) {
    return data.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
}

//sortowanie
function sortData(data, order) {
    if (order === "asc") {
        return data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "desc") {
        return data.sort((a, b) => b.title.localeCompare(a.title));
    }
    return data;
}


async function start() {
    let products = await fetchData();

    renderTable(products);

    const filterInput = document.getElementById('filterInput');
    const sortSelect = document.getElementById('sortSelect');

    filterInput.addEventListener('input', () => {
        const filteredData = filterData(products, filterInput.value);
        const sortedData = sortData(filteredData, sortSelect.value);
        renderTable(sortedData);
    });

    sortSelect.addEventListener('change', () => {
        const filteredData = filterData(products, filterInput.value);
        const sortedData = sortData(filteredData, sortSelect.value);
        renderTable(sortedData);
    });
}

start();
