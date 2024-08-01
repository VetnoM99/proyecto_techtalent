import React, { useState } from 'react';
import '../styles/Tienda.css'; // Asegúrate de tener un archivo CSS para los estilos

// Importa las imágenes directamente
import descuento1 from '../assets/TIENDA_DESCUENTO1.jpg';
import descuento2 from '../assets/TIENDA_DESCUENTO2.jpg';
import descuento3 from '../assets/TIENDA_DESCUENTO3.jpg';
import descuento4 from '../assets/TIENDA_DESCUENTO4.jpg';
import descuento5 from '../assets/TIENDA_DESCUENTO5.jpg';

const Tienda: React.FC = () => {
    const productos = [
        { src: descuento5, descripcion: 'Doble de puntos canjeables en tu próximo ticket', probabilidad: 0.05 },
        { src: descuento3, descripcion: 'Descuento del 15% en tu próximo ticket', probabilidad: 0.15 },
        { src: descuento4, descripcion: 'Descuento del 20% en tu próximo ticket', probabilidad: 0.1 },
        { src: descuento2, descripcion: 'Descuento del 10% en tu próximo ticket', probabilidad: 0.3 },
        { src: descuento1, descripcion: 'Descuento del 5% en tu próximo ticket', probabilidad: 0.4 },
    ];

    const [selectedProducto, setSelectedProducto] = useState<string | null>(null);
    const [codigoDescuento, setCodigoDescuento] = useState<string | null>(null);

    const seleccionarProductoAlAzar = () => {
        const random = Math.random();
        let acumulado = 0;
        for (const producto of productos) {
            acumulado += producto.probabilidad;
            if (random < acumulado) {
                setSelectedProducto(producto.descripcion);
                setCodigoDescuento(generarCodigoDescuento());
                break;
            }
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

    return (
        <div className="tienda">
            <h1>Canjea tus puntos en nuestra tienda</h1>

            <div className="frases">
                <p>⭐Gracias a tu colaboración, podrás canjear tus puntos acumulados de los tickets📑.</p>
                <p>Dale a la ruleta y obtén fantásticos descuentos para tus próximos tickets.</p>
            </div>

            <div className="container">
                {productos.map((producto, index) => (
                    <div key={index} className="producto">
                        <img src={producto.src} alt={producto.descripcion} />
                    </div>
                ))}
            </div>

            <button className="boton-sorteo" onClick={seleccionarProductoAlAzar}>Jugar por 10 puntos</button>
            {selectedProducto && <p className="resultado-sorteo">Has ganado: {selectedProducto}</p>}
            {codigoDescuento && <div className="codigo-descuento">{codigoDescuento}</div>}
        </div>
    );
};

export default Tienda;
