import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../styles/ContactForm.css';

Modal.setAppElement('#root'); // Asegúrate de que este selector apunta al elemento raíz de tu aplicación

const Contacto: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = { name, email, message };

        try {
            await axios.post('http://localhost:8080/sendEmail', formData);
            setStatusMessage('Correo enviado exitosamente.');
        } catch (error) {
            setStatusMessage('Error al enviar el correo.');
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setStatusMessage('');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Formulario de Contacto"
            className="contact-modal"
            overlayClassName="contact-modal-overlay"
        >
            
                <h2>Contacto</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="message">Mensaje:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>

                    <button type="submit">Enviar</button>
                </form>

                {statusMessage && <p>{statusMessage}</p>}
                <button onClick={closeModal}>Cancelar</button>
            
        </Modal>
    );
};

export default Contacto;

