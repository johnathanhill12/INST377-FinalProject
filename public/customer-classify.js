//JS code for the customer page
async function createCustomer() {
    await fetch(`/customer`, {
        method: 'POST',
        body: JSON.stringify({
            firstName: `${document.getElementById('firstName').value}`,
            Age: `${document.getElementById('Age').value}`,
            favGenre: `${document.getElementById('favGenre').value}`,
        }),
        headers: {
            'content-type': 'application/json',
        },
    }).then((result) => result.json());

    await loadCustomerData();
}

async function loadCustomerData () {
    await fetch(`/customers`)
    .then((result) => result.json())
    .then((resultJson) => {
        const table = document.createElement('table');

        table.id = 'customerInfo';

        const tableRow = document.createElement('tr');

        const tHeadingFirstName = document.createElement('th');
        tHeadingFirstName.innerHTML = 'First Name';
        tableRow.appendChild(tHeadingFirstName);

        const tHeadingAge = document.createElement('th');
        tHeadingAge.innerHTML = 'Age';
        tableRow.appendChild(tHeadingAge);

        const tHeadingGenre = document.createElement('th');
        tHeadingGenre.innerHTML = 'Favorite Genre';
        tableRow.appendChild(tHeadingGenre);

        table.appendChild(tableRow);

        resultJson.forEach((customer) => {
            const customerTableRow = document.createElement('tr');
            const customerTableFirstName = document.createElement('td');
            const customerTableAge = document.createElement('td');
            const customerTableGenre = document.createElement('td');

            customerTableFirstName.innerHTML = customer.customer_first_name;
            customerTableAge.innerHTML = customer.customer_Age;
            customerTableGenre.innerHTML = customer.customer_favGenre;

            customerTableRow.appendChild(customerTableFirstName);
            customerTableRow.appendChild(customerTableAge);
            customerTableRow.appendChild(customerTableGenre);

            table.appendChild(customerTableRow);
        });
        const existingTable = document.getElementById('customerInfo');
        if(existingTable) {
            existingTable.remove();

        }
        document.body.appendChild(table);

    });
}
window.onload = loadCustomerData;