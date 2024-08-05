import React, { useState } from 'react';
import axios from 'axios';
import descuento1 from '../assets/TIENDA_DESCUENTO1.jpg';
import descuento2 from '../assets/TIENDA_DESCUENTO2.jpg';
import descuento3 from '../assets/TIENDA_DESCUENTO3.jpg';
import descuento4 from '../assets/TIENDA_DESCUENTO4.jpg';
import descuento5 from '../assets/TIENDA_DESCUENTO5.jpg';
import "../styles/Tienda.css";
import { useUser } from "../context/UserProvider";

const Tienda: React.FC = () => {
    const { user, setUser } = useUser();
    const [selectedProducto, setSelectedProducto] = useState<string | null>(null);
    const [codigoDescuento, setCodigoDescuento] = useState<string | null>(null);

    const productos = [
        { src: descuento5, descripcion: 'Doble de puntos canjeables en tu próximo ticket', probabilidad: 0.05, puntos: 40 },
        { src: descuento3, descripcion: 'Descuento del 15% en tu próximo ticket', probabilidad: 0.15, puntos: 25 },
        { src: descuento4, descripcion: 'Descuento del 20% en tu próximo ticket', probabilidad: 0.1, puntos: 30 },
        { src: descuento2, descripcion: 'Descuento del 10% en tu próximo ticket', probabilidad: 0.3, puntos: 20 },
        { src: descuento1, descripcion: 'Descuento del 5% en tu próximo ticket', probabilidad: 0.4, puntos: 15 },
    ];

    const seleccionarProducto = async (indice: number) => {
        const producto = productos[indice];
        if (user && user.saldo !== undefined && user.saldo >= producto.puntos) {
            setSelectedProducto(producto.descripcion);
            setCodigoDescuento(generarCodigoDescuento());
            const nuevoSaldo = user.saldo - producto.puntos;
            await actualizarSaldoUsuario(nuevoSaldo);
        } else {
            alert("No tienes suficientes puntos para canjear este descuento.");
        }
    };

    const generarCodigoDescuento = (): string => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = 'PORTNET';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[randomIndex];
        }
        return codigo;
    };

    const actualizarSaldoUsuario = async (nuevoSaldo: number) => {
        try {
            if (user) {
                const response = await axios.put(`http://localhost:8080/users/${user.id}/saldo2`, { newSaldo: nuevoSaldo }, {
                    headers: { "Content-Type": "application/json" },
                });
                if (response.status === 200) {
                    setUser((prevUser) => prevUser ? { ...prevUser, saldo: nuevoSaldo } : null);
                    localStorage.setItem('userSaldo', nuevoSaldo.toString());
                } else {
                    console.error("Error al actualizar el saldo del usuario:", response.statusText);
                }
            }
        } catch (error) {
            console.error("Error al actualizar el saldo del usuario:", error);
        }
    };

    return (
        <div className="tienda">
            <h1>Canjea tus puntos en nuestra tienda</h1>

            <div className="frases">
                <p>⭐Gracias a tu colaboración, podrás canjear tus puntos acumulados de los tickets📑.</p>
                <p>Juega al azar y obtén fantásticos descuentos para tus próximos tickets. O canjea tus puntos por descuentos en restaurantes.</p>
            </div>

            <div className="container-porcentaje">
                {productos.map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.src} alt={producto.descripcion} />
                    </div>
                ))}
            </div>

            <div className="botones-verticales">
                {productos.map((producto, index) => (
                    <button
                        key={index}
                        className="boton-sorteo"
                        onClick={() => seleccionarProducto(index)}
                    >
                        Canjear {producto.puntos} Puntos por {producto.descripcion}
                    </button>
                ))}
            </div>

            {selectedProducto && <p className="resultado-sorteo">Has ganado: {selectedProducto}</p>}
            {codigoDescuento && <div className="codigo-descuento">{codigoDescuento}</div>}
            
            {selectedProducto && (
                <p className="texto-adicional">
                    Cada vez que visitas nuestros restaurantes, un pequeño porcentaje de tu cuenta se destina a una ONG. Además, te otorgamos puntos en nuestra web que podrás canjear por descuentos en futuras visitas. ¡Disfruta de tu comida, ayuda a una buena causa y ahorra en tus próximas salidas!
                </p>
            )}
        </div>
    );
};

export default Tienda;
