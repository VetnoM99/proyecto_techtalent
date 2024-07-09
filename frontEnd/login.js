document.addEventListener('DOMContentLoaded', function () {
    // Listener para cargar usuarios al cargar la página
    // listarUsuarios();

    // Formulario de creación de usuario
    const createUserForm = document.getElementById('add-user-form');
    createUserForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
        const username = document.getElementById('username').value.trim();
        const userpassword = document.getElementById('userpassword').value.trim();
        const email = document.getElementById('email').value.trim();
        // const imageUrl = document.getElementById('imageUrl').value.trim();

        if (username && userpassword && email ) {
            crearUsuario(username, userpassword, email);
        } else {
            alert('Por favor completa todos los campos.');
        }
    });

    function deleteUser(userId) {
        fetch(`http://localhost:8080/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            console.log('User deleted successfully');
            // Aquí podrías refrescar la lista de usuarios o hacer cualquier otra acción
        })
        .catch(error => {
            console.error('There was a problem with the delete operation:', error);
        });
    }
    

    // Función para crear un nuevo usuario
    function crearUsuario(username, userpassword, email,) {
        const newUser = {
            username: username,
            userpassword: userpassword,
            email: email,
        };

        fetch('http://localhost:8080/users/crear', {
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
            // document.getElementById('imageUrl').value = '';
            // Actualizar la lista de usuarios después de crear uno nuevo
            // listarUsuarios();
        })
        .catch(error => {
            console.error('Error al crear usuario:', error);
            alert('Hubo un problema al crear el usuario.');
        });
    }

    // // Función para listar los usuarios y sus imágenes
    // function listarUsuarios() {
    //     fetch('http://localhost:8080/users')
    //         .then(response => response.json())
    //         .then(data => {
    //             const userList = document.getElementById('user-list');
    //            // Limpiar la lista antes de actualizarla

    //             data.forEach(user => {
    //                 const userContainer = document.createElement('div');
    //                 userContainer.classList.add('user-container');

    //                 const usernameElement = document.createElement('h3');
    //                 usernameElement.textContent = user.username;
    //                 userContainer.appendChild(usernameElement);

    //                 const emailElement = document.createElement('p');
    //                 emailElement.textContent = user.email;
    //                 userContainer.appendChild(emailElement);

    //                 if (user.registro && user.registro.imageUrl) {
    //                     const imagenElement = document.createElement('img');
    //                     imagenElement.src = user.registro.imageUrl;
    //                     userContainer.appendChild(imagenElement);
    //                 }

    //                 // Botón de eliminar
    //                 const btnEliminar = document.createElement('button');
    //                 btnEliminar.textContent = 'Eliminar';
    //                 btnEliminar.addEventListener('click', () => deleteUser(user.id));
    //                 userContainer.appendChild(btnEliminar);

    //                 userList.appendChild(userContainer);
    //             });
    //         })
    //         .catch(error => {
    //             console.error('Error al obtener usuarios:', error);
    //             alert('Hubo un problema al cargar los usuarios.');
    //         });
    // }
  // Obtener referencia al formulario y los campos de entrada

    var containerLogin = document.querySelector('.container-login');
    var backgroundImg = document.querySelector('.background-image');

    containerLogin.addEventListener('mouseover', function() {
        backgroundImg.style.filter = 'blur(2px)';
    });

    containerLogin.addEventListener('mouseout', function() {
        backgroundImg.style.filter = 'blur(0px)';
    });
});

