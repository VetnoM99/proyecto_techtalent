import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Cambiar useHistory por useNavigate
import '../styles/ContactForm.css';

Modal.setAppElement('#root');

const Contacto: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const navigate = useNavigate(); // Usar useNavigate

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
        navigate('/'); // Redirigir al inicio
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Formulario de Contacto"
            className="contact-modal"
            overlayClassName="contact-modal-overlay"
        >
            <h2>Contáctanos</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="name" className={name ? 'active' : ''}>Nombre</label>
                </div>

                <div className="input-container">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder=" "
                    />
                    <label htmlFor="email" className={email ? 'active' : ''}>Email</label>
                </div>

                <div className="input-container">
                    <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        placeholder=" "
                    ></textarea>
                    <label htmlFor="message" className={message ? 'active' : ''}>Mensaje</label>
                </div>

                <div className="button-container">
                    <button type="submit">Enviar</button>
                    <button type="button" onClick={closeModal}>Cancelar</button>
                </div>
            </form>

            {statusMessage && <p>{statusMessage}</p>}

            <div className="footer">
                <p>© 2024 PortNet. Todos los derechos reservados.</p>
                <p>proyecto.techtalent@gmail.com</p>
            </div>
        </Modal>
    );
};

export default Contacto;
