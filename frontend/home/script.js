document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.getElementById('userMenu');
    const dropdown = document.getElementById('dropdown');
    const logoutButton = document.getElementById('logout');
    const editProfileButton = document.getElementById('editProfile');

    if (localStorage.getItem('authenticated') !== 'true') {
        window.location.href = '../auth/index.html';
    }

    const username = localStorage.getItem('username');
    userMenu.textContent = username;

    userMenu.addEventListener('click', function() {
        dropdown.classList.toggle('hidden');
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('authenticated');
        localStorage.removeItem('username');
        window.location.href = '../auth/index.html';
    });

    editProfileButton.addEventListener('click', function() {
        // Implement navigation to edit profile page
        window.location.href = '../profile/index.html';
    });
});

// CRUD
const dataTable = document.getElementById('dataTable');
const pagination = document.getElementById('pagination');
const searchField = document.getElementById('search');
const addDataButton = document.getElementById('addData');

const pageSize = 5;
let currentPage = 1;

function loadData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    renderTable(data);
    renderPagination(data.length);
}

function renderTable(data) {
    const filteredData = data.filter(item => item.name.toLowerCase().includes(searchField.value.toLowerCase()));
    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    
    dataTable.innerHTML = paginatedData.map(item => `
        <tr>
            <td class="border px-4 py-2">${item.id}</td>
            <td class="border px-4 py-2">${item.name}</td>
            <td class="border px-4 py-2">
                <button class="text-blue-600 hover:underline" onclick="editData(${item.id})">Edit</button>
                <button class="text-red-600 hover:underline" onclick="deleteData(${item.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    pagination.innerHTML = `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">Previous</button>
        ${Array.from({ length: totalPages }, (_, i) => `
            <button ${i + 1 === currentPage ? 'class="bg-blue-600 text-white"' : ''} onclick="changePage(${i + 1})">${i + 1}</button>
        `).join('')}
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">Next</button>
    `;
}

function changePage(page) {
    currentPage = page;
    loadData();
}

function addData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const id = data.length ? data[data.length - 1].id + 1 : 1;
    const name = prompt('Enter name:');
    if (name) {
        data.push({ id, name });
        localStorage.setItem('data', JSON.stringify(data));
        loadData();
    }
}

function editData(id) {
    const data = JSON.parse(localStorage.getItem('data'));
    const item = data.find(d => d.id === id);
    const newName = prompt('Enter new name:', item.name);
    if (newName) {
        item.name = newName;
        localStorage.setItem('data', JSON.stringify(data));
        loadData();
    }
}

function deleteData(id) {
    let data = JSON.parse(localStorage.getItem('data'));
    data = data.filter(d => d.id !== id);
    localStorage.setItem('data', JSON.stringify(data));
    loadData();
}

searchField.addEventListener('input', loadData);
addDataButton.addEventListener('click', addData);

loadData();
