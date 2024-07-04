document.addEventListener('DOMContentLoaded', function () {
    // Listener para cargar usuarios al cargar la página
    listarUsuarios();

    // Formulario de creación de usuario
    const createUserForm = document.getElementById('create-user-form');
    createUserForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        const username = document.getElementById('username').value.trim();
        const userpassword = document.getElementById('userpassword').value.trim();
        const email = document.getElementById('email').value.trim();
        const imageUrl = document.getElementById('imageUrl').value.trim();

        if (username && userpassword && email && imageUrl) {
            crearUsuario(username, userpassword, email, imageUrl);
        } else {
            alert('Por favor completa todos los campos.');
        }
    });

    // Función para eliminar un usuario
    function eliminarUsuario(idUsuario) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            fetch(`http://localhost:8080/delete/${idUsuario}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            
                throw new Error('Ocurrió un problema al eliminar el usuario.');
            })
            .then(data => {
                console.log('Usuario eliminado exitosamente:', data);
                // Actualizar la lista de usuarios después de eliminar
                listarUsuarios();
            })
            .catch(error => {
                console.error('Error al eliminar usuario:', error);
                alert('Hubo un problema al eliminar el usuario.');
            });
        }
    }

    // Función para crear un nuevo usuario
    function crearUsuario(username, userpassword, email, imageUrl) {
        const newUser = {
            username: username,
            userpassword: userpassword,
            email: email,
            registro: {
                imageUrl: imageUrl
            }
        };

        fetch('http://localhost:8080/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un problema al crear el usuario.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Usuario creado exitosamente:', data);
            // Limpiar los campos del formulario después de crear el usuario
            document.getElementById('username').value = '';
            document.getElementById('userpassword').value = '';
            document.getElementById('email').value = '';
            document.getElementById('imageUrl').value = '';
            // Actualizar la lista de usuarios después de crear uno nuevo
            listarUsuarios();
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
            alert('Hubo un problema al crear el usuario.');
        });
    }

    // Función para listar los usuarios y sus imágenes
    function listarUsuarios() {
        fetch('http://localhost:8080/')
            .then(response => response.json())
            .then(data => {
                const userList = document.getElementById('user-list');
               // Limpiar la lista antes de actualizarla

                data.forEach(user => {
                    const userContainer = document.createElement('div');
                    userContainer.classList.add('user-container');

                    const usernameElement = document.createElement('h3');
                    usernameElement.textContent = user.username;
                    userContainer.appendChild(usernameElement);

                    const emailElement = document.createElement('p');
                    emailElement.textContent = user.email;
                    userContainer.appendChild(emailElement);

                    if (user.registro && user.registro.imageUrl) {
                        const imagenElement = document.createElement('img');
                        imagenElement.src = user.registro.imageUrl;
                        userContainer.appendChild(imagenElement);
                    }

                    // Botón de eliminar
                    const btnEliminar = document.createElement('button');
                    btnEliminar.textContent = 'Eliminar';
                    btnEliminar.addEventListener('click', () => eliminarUsuario(user.id));
                    userContainer.appendChild(btnEliminar);

                    userList.appendChild(userContainer);
                });
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
                alert('Hubo un problema al cargar los usuarios.');
            });
    }
});
