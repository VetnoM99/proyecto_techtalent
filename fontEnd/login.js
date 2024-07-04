document.addEventListener('DOMContentLoaded', () => {
    const createUserForm = document.getElementById('create-user-form');
    const usersList = document.getElementById('users');

    // Fetch users and display them
    fetch('http://localhost:8080/')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const li = document.createElement('li');
                li.textContent = `${user.username} (${user.email})`;
                usersList.appendChild(li);
            });
        });

    // Handle form submission for creating a user
    createUserForm.addEventListener('submit', event => {
        event.preventDefault();

        const formData = new FormData(createUserForm);
        const data = {
            username: formData.get('username'),
            userpassword: formData.get('password'),
            email: formData.get('email')
        };

        fetch('http://localhost:8080/crear/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} (${user.email})`;
            usersList.appendChild(li);
            createUserForm.reset();
        })
        .catch(error => console.error('Error:', error));
    });
 
});

