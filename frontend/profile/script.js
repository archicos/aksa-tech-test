document.addEventListener('DOMContentLoaded', function() {
    const editProfileForm = document.getElementById('editProfileForm');
    const newNameField = document.getElementById('newName');

    const currentUsername = localStorage.getItem('username');
    newNameField.value = currentUsername;

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newName = newNameField.value;
        localStorage.setItem('username', newName);
        document.getElementById('userMenu').textContent = newName;
        window.location.href = '../home/index.html';
    });
});
