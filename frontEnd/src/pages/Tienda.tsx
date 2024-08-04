import React, { useState } from 'react';
import descuento1 from '../assets/TIENDA_DESCUENTO1.jpg';
import descuento2 from '../assets/TIENDA_DESCUENTO2.jpg';
import descuento3 from '../assets/TIENDA_DESCUENTO3.jpg';
import descuento4 from '../assets/TIENDA_DESCUENTO4.jpg';
import descuento5 from '../assets/TIENDA_DESCUENTO5.jpg';
import "../styles/Tienda.css"

const Tienda: React.FC = () => {
    // Lista de productos con imágenes y descuentos
    const productos = [
        { src: descuento5, descripcion: 'Doble de puntos canjeables en tu próximo ticket', probabilidad: 0.05 },
        { src: descuento3, descripcion: 'Descuento del 15% en tu próximo ticket', probabilidad: 0.15 },
        { src: descuento4, descripcion: 'Descuento del 20% en tu próximo ticket', probabilidad: 0.1 },
        { src: descuento2, descripcion: 'Descuento del 10% en tu próximo ticket', probabilidad: 0.3 },
        { src: descuento1, descripcion: 'Descuento del 5% en tu próximo ticket', probabilidad: 0.4 },
    ];

    const [selectedProducto, setSelectedProducto] = useState<string | null>(null);
    const [codigoDescuento, setCodigoDescuento] = useState<string | null>(null);

    // Función para seleccionar un producto basado en el índice
    const seleccionarProducto = (indice: number) => {
        const producto = productos[indice];
        setSelectedProducto(producto.descripcion);
        setCodigoDescuento(generarCodigoDescuento());
    };

    // Función para generar un código de descuento aleatorio
    const generarCodigoDescuento = (): string => {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = 'PORTNET';
        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * caracteres.length);
            codigo += caracteres[randomIndex];
        }
        return codigo;
    };

    return (
        <div className="tienda">
            <h1>Canjea tus puntos en nuestra tienda</h1>

            <div className="frases">
                <p>⭐Gracias a tu colaboración, podrás canjear tus puntos acumulados de los tickets📑.</p>
                <p>Juega al azar y obtén fantásticos descuentos para tus próximos tickets. O canjea tus puntos por descuentos en restaurantes.</p>
            </div>

            <div className="container">
                {productos.map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.src} alt={producto.descripcion} />
                    </div>
                ))}
            </div>

            <div className="botones-verticales">
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(0)}
                >
                    Canjear 10 Puntos por Jugar
                </button>
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(4)}
                >
                    Canjear 15 Puntos por 5%
                </button>
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(3)}
                >
                    Canjear 20 Puntos por 10%
                </button>
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(2)}
                >
                    Canjear 25 Puntos por 15%
                </button>
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(1)}
                >
                    Canjear 30 Puntos por 20%
                </button>
                <button
                    className="boton-sorteo"
                    onClick={() => seleccionarProducto(0)}
                >
                    Canjear 40 Puntos por x2
                </button>
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
